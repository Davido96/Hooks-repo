"use client";

import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import { Match, RawApiUser } from "@/types";
import { useSocialStore } from "@/stores/socialStore";
import { useProfileStore } from "@/stores/profileStore";
import { useAuthStore } from "@/stores/authStore";

// --- Component Imports ---

import ProfileCard from "@/components/ProfileCard";
import { LikeSuccessToast } from "@/components/fans/LikeSuccessToast";
import { MatchModal } from "@/components/fans/MatchModal";
import SendKeysModal from "@/components/modals/SendKeysModal";
import ProfileModalSubscribed from "@/components/modals/ProfileModalSubscribed";
import ProfileModalNotSubscribed from "@/components/modals/ProfileModalNotSubscribed";
import WalletManagementModal from "@/components/modals/WalletManagementModal";
import EditProfileModal from "@/components/modals/EditProfileModal";
import ViewProfileModal from "@/components/modals/ViewProfileModal";
import ReferralProgramModal from "@/components/modals/ReferralProgramModal";
import Verification from "./modals/Verification";
import Filter from "./modals/CreatorFilter";
import PerfectMatchModal from "@/components/modals/PerfectMatchModal";
import DailyLimitModal from "@/components/modals/DailyLikeLimitModal";
import Stats from "./Stats";
import Navbar from "./Navbar";

const transformToMatch = (rec: RawApiUser): Match => {
  return {
    user_id: String(rec.id ?? ""),
    full_name: rec.full_name || "No Name",
    age: rec.age || null,
    state: rec.state || "Unknown",
    city: rec.city || "Unknown",
    display_pic: rec.display_pic || "/avatar.png",
    interests: Array.isArray(rec.interests) && rec.interests.length > 0 
      ? rec.interests 
      : ["Single", "Friendly"],
    user_type: "Creator" as const,
    bio: rec.bio || "Passionate creator sharing amazing content",
    followers: Number(rec.followers) || 0,
    subscribers: Number(rec.subscribers) || 0,
    subscriptionFee: 10,
    gender: null,
  };
};

export default function AuthenticatedHomepage(): ReactNode {
  const router = useRouter();
  const { user, signout } = useAuthStore();
  const { profile, getProfile } = useProfileStore();
  const {
    recommendations,
    getRecommendations,
    sendLike,
    followersCount,
    confirmedLikesCount,
    getFollowerCount,
    getFollowingCount,
    getConfirmedLikesCount,
    matchedUser,
    clearMatchedUser,
  } = useSocialStore();

  // UI state
  // const [activeTab, setActiveTab] = useState<string>("Discover");
  const [showLikeSuccess, setShowLikeSuccess] = useState<boolean>(false);

  const [isProfileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [isSendKeysModalOpen, setSendKeysModalOpen] = useState<boolean>(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState<boolean>(false);
  const [isReferralModalOpen, setIsReferralModalOpen] =
    useState<boolean>(false);
  const [isSubscribed] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isVerificationOpen, setIsVerificationOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isPerfectMatchOpen, setIsPerfectMatchOpen] = useState<boolean>(false);
  const [isDailyLimitOpen, setIsDailyLimitOpen] = useState<boolean>(false);

  // daily likes remaining (initialized from user if available)
  const [dailyLikesRemaining, setDailyLikesRemaining] = useState<number>(() => {
    // fallback default 10
    return user?.dailyLikesRemaining ?? 10;
  });

  // update dailyLikesRemaining if user changes (sync)
  useEffect(() => {
    if (user && typeof user.dailyLikesRemaining === "number") {
      setDailyLikesRemaining(user.dailyLikesRemaining);
    }
  }, [user]);

  // Keep timeout id so we can clear on unmount/change
  const likeTimeoutRef = useRef<number | null>(null);

  // initial data fetch
  useEffect(() => {
    if (!profile) getProfile();
    if (!recommendations || recommendations.length === 0) getRecommendations();

    getFollowerCount();
    getFollowingCount();
    getConfirmedLikesCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, recommendations]);

  const availableMatches: Match[] = useMemo(() => {
    if (!recommendations) return [];
    return (recommendations as RawApiUser[]).map(transformToMatch);
  }, [recommendations]);

  // Ensure currentIndex never exceeds availableMatches length
  useEffect(() => {
    if (
      currentIndex >= availableMatches.length &&
      availableMatches.length > 0
    ) {
      setCurrentIndex(Math.max(0, availableMatches.length - 1));
    }

    if (availableMatches.length === 0 && currentIndex !== 0) {
      setCurrentIndex(0);
    }
  }, [availableMatches.length, currentIndex]);

  // currentMatch
  const currentMatch: Match | undefined =
    availableMatches.length > 0 &&
    currentIndex >= 0 &&
    currentIndex < availableMatches.length
      ? availableMatches[currentIndex]
      : undefined;

  const remaining = Math.max(0, availableMatches.length - 1 - currentIndex);

  // Open PerfectMatchModal when remaining hits 0
  useEffect(() => {
    if (remaining === 0 && availableMatches.length > 0) {
      setIsPerfectMatchOpen(true);
    }
  }, [remaining, availableMatches.length]);

  const handleLogout = async (): Promise<void> => {
    await signout();
    router.push(ROUTES.HOMEPAGE);
  };

  // Like handler with daily-limit and perfect-match logic
  const handleLike = async (): Promise<void> => {
    if (!currentMatch) return;

    // daily limit check
    if (dailyLikesRemaining <= 0) {
      setIsDailyLimitOpen(true);
      return;
    }

    try {
      // send like
      await sendLike(currentMatch.user_id);

      // decrement daily likes (optimistic)
      setDailyLikesRemaining((prev) => Math.max(0, prev - 1));

      // show like success toast
      setShowLikeSuccess(true);

      // clear any existing timeout first
      if (likeTimeoutRef.current) {
        window.clearTimeout(likeTimeoutRef.current);
        likeTimeoutRef.current = null;
      }

      // simulate delay before moving to next profile
      const id = window.setTimeout(() => {
        setShowLikeSuccess(false);
        setCurrentIndex((prev) => prev + 1);
        likeTimeoutRef.current = null;
      }, 2500);

      likeTimeoutRef.current = id;

      // If backend provides mutual-match info immediately via recommendations or currentMatch metadata,
      // open PerfectMatchModal. We'll check a safe property `isMutual` if present on the match object.
      const maybeMutual =
        // safe runtime check (don't assume type)
        (currentMatch as unknown as { isMutual?: boolean }).isMutual ?? false;
      if (maybeMutual) {
        setIsPerfectMatchOpen(true);
      }
    } catch (error) {
      console.error("Error sending like:", error);
      // revert optimistic decrement if you like (optional)
    }
  };

  const handleDislike = (): void => {
    if (!currentMatch) return;
    setCurrentIndex((prev) => prev + 1);
  };

  // const handleOpenProfile = (): void => setProfileModalOpen(true);

  const handleCloseAllModals = (): void => {
    setProfileModalOpen(false);
    setSendKeysModalOpen(false);
    setIsWalletModalOpen(false);
    setIsEditProfileOpen(false);
    setIsViewProfileOpen(false);
    setIsReferralModalOpen(false);
    setIsVerificationOpen(false);
    setIsFilterOpen(false);
    setIsPerfectMatchOpen(false);
    setIsDailyLimitOpen(false);
  };

  const handleOpenSubscribeFlow = (): void => {
    setProfileModalOpen(false);
    setSendKeysModalOpen(true);
  };

  // cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (likeTimeoutRef.current) {
        window.clearTimeout(likeTimeoutRef.current);
        likeTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div
        className="min-h-screen c-profile text-white"
        style={{
          background:
            "linear-gradient(135deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
        }}
      >
        {/* {profile && (
          <Header
            profile={profile as Profile}
            onLogout={handleLogout}
            onWalletClick={() => setIsWalletModalOpen(true)}
            onMessageClick={() => router.push("/messages")}
            onEditProfileClick={() => setIsEditProfileOpen(true)}
            onViewProfileClick={() => setIsViewProfileOpen(true)}
            onReferralClick={() => setIsReferralModalOpen(true)}
            onVerificationClick={() => setIsVerificationOpen(true)}
            onFilterClick={() => setIsFilterOpen(true)}
          />
        )} */}

        <Navbar
          onLogout={handleLogout}
          onWalletClick={() => setIsWalletModalOpen(true)}
          onMessageClick={() => router.push("/messages")}
          onEditProfileClick={() => setIsEditProfileOpen(true)}
          onViewProfileClick={() => setIsViewProfileOpen(true)}
          onReferralClick={() => setIsReferralModalOpen(true)}
          onVerificationClick={() => setIsVerificationOpen(true)}
          onFilterClick={() => setIsFilterOpen(true)}
        />

        <Stats 
          followers={followersCount} 
          totalMatches={confirmedLikesCount}
          todayMatches={dailyLikesRemaining}
          dailyGoal={{ current: 10 - dailyLikesRemaining, target: 10 }}
        />

        {/* <div className="container mx-auto px-4"> */}
        {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-4"> */}
        {/* <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}
        {/* <StatsBar
              followers={followersCount}
              followings={followingsCount}
              totalMatches={confirmedLikesCount}
            /> */}
        {/* </div> */}

        {/* <main className="flex flex-col items-center pb-8">
            {currentMatch ? (
              // <ProfileCard profile={currentMatch} onClick={handleOpenProfile} />
            ) : (
              <div className="flex items-center justify-center h-[65vh] w-full max-w-md bg-white/10 rounded-2xl">
                <p className="text-white/80">Finding new profiles for you...</p>
              </div>
            )}

            <ActionButtons
              onLike={handleLike}
              onDislike={handleDislike}
              dailyLikesRemaining={dailyLikesRemaining}
              onDailyLimitReached={() => setIsDailyLimitOpen(true)}
              onPerfectMatch={() => setIsPerfectMatchOpen(true)}
              isPerfectMatch={currentMatch?.isMutual ?? false}
            />

            <div className="text-center mt-6">
              <p className="font-bold">{remaining} profiles remaining</p>
            </div>
          </main> */}
        {/* </div> */}

        <ProfileCard
          currentMatch={currentMatch}
          onLike={handleLike}
          onDislike={handleDislike}
          dailyLikesRemaining={dailyLikesRemaining}
          onDailyLimitReached={() => setIsDailyLimitOpen(true)}
          isPerfectMatch={currentMatch?.isMutual ?? false}
          remainingProfiles={remaining}
          totalMatches={confirmedLikesCount}
        />

        <LikeSuccessToast isOpen={showLikeSuccess} />
      </div>

      {/* Match Modal - Shown when like is accepted */}
      {matchedUser && (
        <MatchModal
          matchedUser={{
            id: Number(matchedUser.user_id),
            user_id: matchedUser.user_id,
            full_name: matchedUser.full_name,
            display_pic: matchedUser.display_pic,
            age: matchedUser.age,
            bio: matchedUser.bio,
            gender: matchedUser.gender,
            state: matchedUser.state,
            city: matchedUser.city,
            interests: matchedUser.interests,
          }}
          onClose={() => clearMatchedUser()}
        />
      )}

      {/* --- Modals --- */}
      {currentMatch &&
        (isSubscribed ? (
          <ProfileModalSubscribed
            isOpen={isProfileModalOpen}
            onClose={handleCloseAllModals}
            match={currentMatch}
          />
        ) : (
          <ProfileModalNotSubscribed
            isOpen={isProfileModalOpen}
            onClose={handleCloseAllModals}
            onSubscribeClick={handleOpenSubscribeFlow}
            match={currentMatch}
          />
        ))}

      {currentMatch && user && (
        <SendKeysModal
          isOpen={isSendKeysModalOpen}
          onClose={handleCloseAllModals}
          creatorName={currentMatch.full_name}
          creatorAvatar={currentMatch.display_pic || ""}
          currentBalance={user.balance ?? 0}
        />
      )}

      {profile && (
        <>
          <WalletManagementModal
            isOpen={isWalletModalOpen}
            onClose={() => setIsWalletModalOpen(false)}
          />
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            currentUser={profile}
          />
          <ViewProfileModal
            isOpen={isViewProfileOpen}
            onClose={() => setIsViewProfileOpen(false)}
            profile={profile}
          />
          <ReferralProgramModal
            isOpen={isReferralModalOpen}
            onClose={() => setIsReferralModalOpen(false)}
          />
          <Verification
            isOpen={isVerificationOpen}
            onClose={() => setIsVerificationOpen(false)}
          />
          <Filter
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
          <PerfectMatchModal
            isOpen={isPerfectMatchOpen}
            onClose={() => setIsPerfectMatchOpen(false)}
          />
          <DailyLimitModal
            isOpen={isDailyLimitOpen}
            onClose={() => setIsDailyLimitOpen(false)}
          />
        </>
      )}
    </>
  );
}

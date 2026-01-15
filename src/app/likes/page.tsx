"use client";

import React, { useState, useEffect } from "react";
import { useSocialStore, Like } from "@/stores/socialStore";
import { useProfileStore } from "@/stores/profileStore";
import { Header } from "@/components/fans/Header";
import { StatsBar } from "@/components/fans/StatsBar";
import { ProfileCard } from "@/components/fans/ProfileCards";
import { Profile } from "@/types";
import { MatchModal } from "@/components/fans/MatchModal";

const likeToProfile = (like: Like): Profile => ({
  id: like.id,
  user_id: String(like.id),
  full_name: like.full_name,
  gender: like.gender as "Male" | "Female" | "Other" | null,
  bio: like.bio,
  display_pic: null, // API does not provide this for likes
  age: null, // API does not provide this for likes
  state: "", // API does not provide this for likes
  city: "", // API does not provide this for likes
  interests: [], // API does not provide this for likes
  monthly_sub_keys: null,
});

export default function LikesPage() {
  const { profile, getProfile } = useProfileStore();
  const {
    likes,
    getLikes,
    respondLike,
    loading,
    followersCount,
    followingsCount,
    confirmedLikesCount,
    getFollowerCount,
    getFollowingCount,
    getConfirmedLikesCount,
  } = useSocialStore();

  const [likeRequests, setLikeRequests] = useState<
    { like: Like; id: number }[]
  >([]);
  const [matchedUser, setMatchedUser] = useState<Profile | null>(null);

  useEffect(() => {
    if (!profile) getProfile();
    getFollowerCount();
    getFollowingCount();
    getConfirmedLikesCount();
    getLikes("requested");
  }, [
    profile,
    getProfile,
    getFollowerCount,
    getFollowingCount,
    getConfirmedLikesCount,
    getLikes,
  ]);

  useEffect(() => {
    if (likes?.results) {
      setLikeRequests(likes.results);
    }
  }, [likes]);

  const removeRequest = (likeInstanceId: number) => {
    setLikeRequests((current) =>
      current.filter((req) => req.id !== likeInstanceId)
    );
  };

  const handleAccept = async (
    likeInstanceId: number,
    likedProfile: Profile
  ) => {
    try {
      await respondLike(likeInstanceId, "accept");
      setMatchedUser(likedProfile);
      removeRequest(likeInstanceId);
    } catch (error) {
      console.error("Failed to accept like:", error);
    }
  };

  const handleReject = async (likeInstanceId: number) => {
    try {
      await respondLike(likeInstanceId, "reject");
      removeRequest(likeInstanceId);
    } catch (error) {
      console.error("Failed to reject like:", error);
    }
  };

  const currentRequest = likeRequests[0];
  const currentProfile = currentRequest
    ? likeToProfile(currentRequest.like)
    : null;

  return (
    <>
      <div
        className="min-h-screen text-white"
        style={{
          background:
            "linear-gradient(135deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
        }}
      >
        {profile && (
          <Header
            profile={profile}
            onLogout={() => {}}
            onWalletClick={() => {}}
            onMessageClick={() => {}}
            onEditProfileClick={() => {}}
            onViewProfileClick={() => {}}
            onReferralClick={() => {}}
            onVerificationClick={() => {}}
            onFilterClick={() => {}}
          />
        )}

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-4">
            <div className="flex-1" />
            <StatsBar
              followers={followersCount}
              followings={followingsCount}
              totalMatches={confirmedLikesCount}
            />
          </div>

          <main className="flex flex-col items-center pb-8">
            {loading && <p>Loading like requests...</p>}
            {!loading && currentProfile ? (
              <ProfileCard
                key={currentRequest.id}
                profile={currentProfile}
                onAccept={() => handleAccept(currentRequest.id, currentProfile)}
                onReject={() => handleReject(currentRequest.id)}
              />
            ) : (
              !loading && (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)]">
                  <div className="bg-white/10 p-8 rounded-2xl text-center shadow-lg max-w-md w-full">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      No new like requests
                    </h2>
                    <p className="text-white/80 text-sm mb-6">
                      Check back later for new requests.
                    </p>
                  </div>
                </div>
              )
            )}
          </main>
        </div>
      </div>

      <MatchModal
        matchedUser={matchedUser}
        onClose={() => setMatchedUser(null)}
      />
    </>
  );
}

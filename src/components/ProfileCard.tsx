"use client";

import Image from "next/image";
import { Match } from "@/types";
import { useAuthStore } from "@/stores/authStore";

interface Props {
  currentMatch?: Match;
  onLike?: () => void;
  onDislike?: () => void;
  dailyLikesRemaining?: number;
  onDailyLimitReached?: () => void;
  isPerfectMatch?: boolean;
  remainingProfiles?: number;
  totalMatches?: number;
}

const ProfileCard: React.FC<Props> = ({
  currentMatch,
  onLike,
  onDislike,
  dailyLikesRemaining = 0,
  onDailyLimitReached,
  isPerfectMatch = false,
  remainingProfiles = 0,
  totalMatches = 0,
}) => {
  const { user } = useAuthStore();
  const userRole = user?.user_type;

  const handleLikeClick = () => {
    if (dailyLikesRemaining && dailyLikesRemaining <= 0) {
      onDailyLimitReached?.();
      return;
    }
    onLike?.();
  };

  if (!currentMatch) {
    return (
      <div className="mt-[23px] pb-10">
        <div className="min-[400px]:w-[391px] px-5 min-[400px]:px-0 mx-auto">
          <div className="bg-grayBorder/80 h-[617px] rounded-2xl relative overflow-hidden flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-lg font-semibold">No profiles available</p>
              <p className="text-white/70 mt-2">Check back later for more profiles</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[23px] pb-10">
      <div className="min-[400px]:w-[391px] px-5 min-[400px]:px-0 mx-auto">
        {/* Profile Card */}
        <div className="bg-grayBorder/80 h-[617px] rounded-2xl relative group overflow-hidden">
          {/* Gradient overlay */}
          <div
            className="absolute size-full inset-0 z-10"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.92))",
            }}
          />

          {/* Background image */}
          {currentMatch.display_pic && (
            <Image
              src={currentMatch.display_pic}
              className="object-cover group-hover:scale-110 duration-300 z-0 w-full h-full absolute"
              fill
              alt={`${currentMatch.full_name} profile picture`}
            />
          )}

          {/* Creator badge */}
          {userRole?.toLowerCase() === "creator" && (
            <div className="bg-badgePink flex items-center gap-1 text-white rounded-full h-6 w-20 justify-center absolute right-3 top-6 z-20">
              <Image
                width={12}
                height={12}
                src="/badgeStar.svg"
                alt="creator badge"
              />
              <p className="text-xs font-bold">Creator</p>
            </div>
          )}

          {/* Profile Info Overlay */}
          <div className="z-50 absolute max-w-[90%] left-4 bottom-3 text-white">
            <h3 className="text-3xl font-bold truncate">
              {currentMatch.full_name}{" "}
              {currentMatch.age && <span className="text-2xl">{currentMatch.age}</span>}
            </h3>
            
            <div className="flex flex-col gap-2 mt-3">
              {/* Location */}
              {(currentMatch.state || currentMatch.city) && (
                <p>
                  📍 {currentMatch.state} {currentMatch.city}
                </p>
              )}

              {/* Stats */}
              <div className="flex gap-4">
                {currentMatch.followers !== undefined && (
                  <p>💚 {currentMatch.followers} followers</p>
                )}
                {currentMatch.subscribers !== undefined && (
                  <p>🔥 {currentMatch.subscribers} subscribers</p>
                )}
              </div>
            </div>

            {/* Interests */}
            {currentMatch.interests && currentMatch.interests.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {currentMatch.interests.map((interest) => (
                  <p
                    className="capitalize text-xs font-bold bg-tagBackground py-1 px-[7px] rounded-full"
                    key={interest}
                  >
                    {interest}
                  </p>
                ))}
              </div>
            )}

            {/* Bio */}
            {currentMatch.bio && (
              <p className="mt-3 text-sm line-clamp-2">{currentMatch.bio}</p>
            )}

            {/* Status */}
            <p className="text-[#22C55E] mt-3">🟢 Online</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          <div className="mt-5 flex items-center gap-4 justify-center">
            {/* Dislike Button */}
            <button
              onClick={onDislike}
              className="bg-white size-16 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all stats-card active:scale-95"
              title="Pass"
              aria-label="Pass profile"
            >
              <Image width={16} height={16} src="/cancel.svg" alt="Pass" />
            </button>

            {/* Profile Button */}
            <button
              className="bg-white size-16 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all stats-card active:scale-95"
              title="View profile"
              aria-label="View full profile"
            >
              <Image width={16} height={16} src="/user.svg" alt="View profile" />
            </button>

            {/* Refresh Button */}
            <button
              className="bg-[#3B82F6] size-16 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-all stats-card active:scale-95"
              title="Super like"
              aria-label="Super like"
            >
              <Image width={16} height={16} src="/refresh.svg" alt="Super like" />
            </button>

            {/* Like Button */}
            <button
              onClick={handleLikeClick}
              className="bg-[#F8248D] size-16 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-all stats-card active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              title={
                dailyLikesRemaining <= 0
                  ? "Daily likes limit reached"
                  : "Like profile"
              }
              aria-label="Like profile"
              disabled={dailyLikesRemaining <= 0}
            >
              <Image width={16} height={16} src="/heart.svg" alt="Like" />
            </button>
          </div>

          {/* Stats */}
          <h3 className="text-center mt-4 text-lg font-bold text-white">
            {totalMatches} matches • {remainingProfiles} profiles remaining
          </h3>
          <h4 className="mt-2 text-center text-white text-sm">
            You have {dailyLikesRemaining} likes remaining today
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

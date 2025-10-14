"use client";

import { useProfileStore } from "@/stores/profileStore";
import Image from "next/image";

interface Props {
  userRole?: string;
  onLike?: () => void;
  onDislike?: () => void;
  dailyLikesRemaining?: number;
  onDailyLimitReached?: () => void;
  onPerfectMatch?: () => void;
  isPerfectMatch?: boolean;
}

const ProfileCard: React.FC<Props> = ({
  userRole,
  onLike,
  onDislike,
  dailyLikesRemaining,
  onDailyLimitReached,
}) => {
  const { profile } = useProfileStore();

  function getColor(text: string): string {
    switch (text.toLowerCase()) {
      case "online":
        return "text-[#22C55E]";
      default:
        return "";
    }
  }

  const handleLikeClick = () => {
    if (dailyLikesRemaining && dailyLikesRemaining <= 0) {
      onDailyLimitReached?.();
      return;
    }
    onLike?.();
  };

  return (
    <div className="mt-[23px] pb-10">
      <div className="min-[400px]:w-[391px] px-5 min-[400px]:px-0 mx-auto">
        <div className="bg-grayBorder/80 h-[617px] rounded-2xl relative group overflow-hidden">
          <div
            className="absolute size-full inset-0 z-1"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.92))",
            }}
          />

          {/* bg image */}
          {profile && profile.display_pic && (
            <Image
              src={profile.display_pic}
              className="object-cover group-hover:scale-110 duration-300 z-0 w-full h-full absolute"
              fill
              alt={`${profile.full_name} profile picture`}
            />
          )}

          {/* badge */}
          {userRole && userRole.toLowerCase() === "creator" ? (
            <div className="bg-badgePink flex items-center gap-1 text-white rounded-full h-6 w-20 justify-center absolute right-3 top-6">
              <Image
                width={12}
                height={12}
                src="/badgeStar.svg"
                alt="white star"
              />
              <p className="text-xs font-bold">Creator</p>
            </div>
          ) : (
            <div>hello</div>
          )}

          <div className="z-50 absolute max-w-[90%] left-4 bottom-3 text-white">
            <h3 className="text-3xl font-bold truncate">
              {profile?.full_name.split(" ")[0]}{" "}
              {profile?.full_name.split(" ")?.[1]}
            </h3>
            <div className="min-[400px]:flex-row flex flex-col max-[400px]:gap-y-1 min-[400px]:items-center justify-between mt-3">
              <p>📍 2 km away</p>
              <p>
                {profile?.state} {profile?.city}
              </p>
            </div>
            <div className="min-[400px]:flex-row flex flex-col max-[400px]:gap-y-1 min-[400px]:items-center justify-between mt-1">
              <p>💚 482 followers</p>
              <p>🔥 271 subscribers</p>
            </div>
            {profile && profile.interests.length > 0 && (
              <div className="flex gap-2 mt-3">
                {profile?.interests.map((item) => (
                  <p
                    className="capitalize text-xs font-bold bg-tagBackground py-1 px-[7px] rounded-full"
                    key={item}
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
            <p className={`${getColor("online")} mt-3`}>{"Online"}</p>
          </div>
        </div>
        <div>
          <div className="mt-5 flex items-center gap-4 justify-center">
            <div
              onClick={onDislike}
              className="bg-white size-16 rounded-full flex items-center justify-center cursor-pointer stats-card"
            >
              <Image width={16} height={16} src="/cancel.svg" alt="" />
            </div>
            <div className="bg-white size-16 rounded-full flex items-center justify-center cursor-pointer stats-card">
              <Image width={16} height={16} src="/user.svg" alt="" />
            </div>
            <div className="bg-[#3B82F6] size-16 rounded-full flex items-center justify-center cursor-pointer stats-card">
              <Image width={16} height={16} src="/refresh.svg" alt="" />
            </div>
            <div
              onClick={handleLikeClick}
              className="bg-[#F8248D] size-16 rounded-full flex items-center justify-center cursor-pointer stats-card"
            >
              <Image width={16} height={16} src="/heart.svg" alt="" />
            </div>
          </div>
          <h3 className="text-center mt-4 text-lg font-bold text-white">
            3 matches • 4 profiles remaining
          </h3>
          <h4 className="mt-2 text-center text-white">
            You have 3 super likes remaining today
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

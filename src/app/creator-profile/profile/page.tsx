"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import { useProfileStore } from "@/stores/profileStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreatorProfileContext } from "@/hooks/useCreatorProfileContext";

const dummyData = [
  {
    time: 3600 * 2,
    imageCount: 2,
    commentCount: 0,
    likedCount: 0,
    isAccessible: true,
    description: "caribbean crush x. Big Big tarz ni mo like",
  },
  {
    time: 3600 * 3,
    imageCount: 1,
    commentCount: 12,
    likedCount: 30,
    isAccessible: false,
    description: "Behind the scenes content - subscribers only! 📸",
  },
  {
    time: 3600 * 5,
    imageCount: 1,
    commentCount: 0,
    likedCount: 4,
    isAccessible: true,
    description: "caribbean crush x. Big Big tarz ni mo like",
  },
];

const Page = () => {
  const { profile, getProfile } = useProfileStore();

  const router = useRouter();

  useEffect(() => {
    if (!profile) getProfile();
  }, [profile, getProfile]);

  const { setShowUploadModal } = useCreatorProfileContext();

  return (
    <div>
      {/* main component */}
      <div className="px-[50px] mt-5">
        {/* back link */}
        <div
          className="text-white cursor-pointer mt-5 ml-auto hover:bg-white/10 border-white/30 border w-fit p-2 rounded-[8px] flex gap-2 items-center"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          <p className="text-sm">Return to Home</p>
        </div>

        {/* post card */}
        <div className="mt-6 w-[692px] mx-auto">
          <div className="bg-white flex rounded-[8px] gap-3 px-9 py-5">
            {profile && profile.display_pic ? (
              <Image
                src={profile.display_pic}
                className="size-[70px] rounded-full object-cover"
                alt={`${profile.full_name.split(" ")[0]} profile picture`}
                width={70}
                height={70}
              />
            ) : (
              <div className="size-[70px] bg-grayBorder rounded-full flex items-center justify-center text-2xl text-white">
                {profile?.full_name[0]}
              </div>
            )}
            <div className="flex-1">
              <div>
                <h2 className="font-bold text-2xl leading-[32px] mt-1">
                  {profile?.full_name.split(" ")[0]}
                </h2>
                <p className="text-sm leading-[24px] text-grayBorder">
                  Creator
                </p>
                <p className="mt-2 text-xs leading-[20px] text-grayBorder/80">
                  🎂 {profile?.age} years old • 📍 {profile?.city}{" "}
                  {profile?.state}
                </p>
                <p className="text-[13px] text-black/70 mt-2">Sweet Melody</p>
                <div className="my-4 flex items-center justify-between">
                  <div>
                    <div className="flex text-black/70 gap-1.5 mb-4 items-center text-[13px]">
                      <p>10 Following</p>
                      <p>18000 Followers</p>
                    </div>
                    <p className="text-black/70 text-[13px]">
                      {profile?.city} {profile?.state}
                    </p>
                  </div>
                  <button
                    className="rounded-[6px] flex items-center justify-center gap-3 h-10 px-8 cursor-pointer text-white text-xs"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #FB923C 0%, #EC4899 100%)",
                    }}
                    onClick={() => setShowUploadModal(true)}
                  >
                    <Image
                      src={"/aeroplane.svg"}
                      width={16}
                      height={16}
                      alt="white plane"
                    />
                    <p>Create new post</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* post */}
          <div className="mt-7 pb-25 flex flex-col gap-6">
            {dummyData.map((post, i) => (
              <PostCard data={post} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

//

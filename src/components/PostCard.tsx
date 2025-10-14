import React from "react";
import Image from "next/image";

type Data = {
  data: {
    time: number;
    imageCount: number;
    commentCount: number;
    likedCount: number;
    isAccessible: boolean;
    description: string;
  };
};

const PostCard = ({ data }: Data) => {
  const {
    time,
    imageCount,
    commentCount,
    likedCount,
    isAccessible,
    description,
  } = data;
  return (
    <div className="bg-white rounded-[8px] px-4 pt-5 pb-5">
      <div className="flex items-center gap-4 pb-1">
        <div className="size-[55px] rounded-full text-white flex items-center justify-center text-lg bg-grayBorder">
          A
        </div>
        <div>
          <h2 className="text-xl font-bold leading-[28px]">Anthony</h2>
          <p className="text-xs bg-[#DCFCE7] items-center justify-center rounded-full text-[#15803D] h-6 flex">
            Creator
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-grayBorder mt-1">{time / 3600} Hours</p>
        <p
          className={`${
            isAccessible
              ? "text-[#15803D] bg-[#DCFCE7]"
              : "text-[#7E22CE] bg-[#F3E8FF]"
          } text-xs rounded-full px-2 py-1.5`}
        >
          {isAccessible ? "Accessible" : "Subscribers only"}
        </p>
      </div>
      <div className="flex mt-4 items-center justify-center gap-4">
        {[...Array(imageCount)].map((image, i) => (
          <div
            className="w-[249px] h-[320px] bg-grayBorder rounded-[8px]"
            key={i}
          />
        ))}
      </div>
      <p className="text-sm text-[#1F2937] leading-[24px] mt-4">
        {description}
      </p>
      <div className="flex items-center gap-4 mt-4">
        <div className="flex gap-1">
          <Image alt="heart" width={20} height={20} src={"/postCardHeat.svg"} />
          <p className="text-[#4B5563]">{likedCount}</p>
        </div>
        <div className="flex gap-1">
          <Image
            alt="message"
            width={20}
            height={20}
            src={"/postCardMsg.svg"}
          />
          <p className="text-[#4B5563]">{commentCount}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Notifications() {
  const dummyNotifications: {
    title: string;
    descriptions: string;
    tag: string[];
    image: string | null;
    isOpened: boolean;
    timeOfArrival: string | number;
  }[] = [
    {
      title: "New Match!",
      descriptions: "You and Sarah liked each other",
      tag: ["match"],
      image: null,
      isOpened: false,
      timeOfArrival: "30m",
    },
    {
      title: "Someone liked you!",
      descriptions: "Alex sent you a like",
      tag: ["like"],
      image: "/blackMan.svg",
      isOpened: false,
      timeOfArrival: "2h",
    },
    {
      title: "Tip Received!",
      descriptions: "You received a $5 tip from Jordan",
      tag: ["tip"],
      isOpened: true,
      timeOfArrival: "4h",
      image: "/yellow-gift.svg",
    },
    {
      title: "New Subscriber!",
      descriptions: "Emma subscribed to your content",
      tag: ["subscription"],
      isOpened: false,
      timeOfArrival: "6h",
      image: "/nakedWoman.svg",
    },
  ];

  const router = useRouter();
  return (
    <div className="px-15 pb-12">
      <div
        className="text-white cursor-pointer mt-5 ml-auto hover:bg-white/10 border-white/30 border w-fit p-2 rounded-[8px] flex gap-2 items-center"
        onClick={() => router.back()}
      >
        <ArrowLeft />
        <p className="text-sm">Return to Home</p>
      </div>

      <ul className="mt-10 flex flex-col gap-y-4">
        {dummyNotifications.map((notification, i) => (
          <li
            key={i}
            className="bg-white/10 flex gap-x-4 shadow-md cursor-pointer py-4 px-5 rounded-[8px]"
          >
            <div className="size-12 flex items-center justify-center relative rounded-full overflow-hidden">
              {notification.image && (
                <Image
                  className="object-cover"
                  src={notification.image}
                  alt="image"
                  width={48}
                  height={48}
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold leading-[24px] text-[#111827]">
                {notification.title}
              </h3>
              <p className="text-[#4B5563] mt-1 text-sm leading-[20px]">
                {notification.descriptions}
              </p>
              {notification.tag.length > 0 && (
                <div className="flex mt-4 items-center gap-1">
                  {notification.tag.map((tag) => (
                    <p
                      className="text-[#0F172A] rounded-full font-bold text-xs bg-white px-[11px] py-[5px]"
                      key={tag}
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex h-4 items-center gap-x-2">
              <p className="text-[#6B7280] text-xs">
                {notification.timeOfArrival} ago
              </p>
              {!notification.isOpened && (
                <div className="size-2 bg-[#EC4899] rounded-full" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

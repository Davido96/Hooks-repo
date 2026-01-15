"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";

interface StatsBarProps {
  followers?: number;
  totalMatches?: number;
  todayMatches?: number;
  dailyGoal?: {
    current: number;
    target: number;
  };
}

const Stats = ({
  followers,
  totalMatches,
  todayMatches,
  dailyGoal,
}: StatsBarProps) => {
  const router = useRouter();
  const [currentActiveLinkIndex, setCurrentActiveLinkIndex] = useState(0);

  const links = [
    { label: "Discover", path: ROUTES.DISCOVER },
    { label: "Exclusive Content", path: ROUTES.EXCLUSIVE_CONTENT },
  ];

  const handleLinkClick = (index: number, path: string) => {
    setCurrentActiveLinkIndex(index);
    router.push(path);
  };

  return (
    <div className="sm:px-[50px] px-5 border-t-[0.5px] border-b-[0.5px] py-[10px] border-grayBorder">
      {/* Navigation Links - Top Section */}
      <div className="flex justify-between items-center gap-8 mb-5">
        <ul className="flex gap-5 items-center">
          {links.map((item, index) => (
            <li
              key={index}
              className={`${
                index === currentActiveLinkIndex
                  ? "border-b text-white underline-offset-10"
                  : "text-white/70"
              } text-sm cursor-pointer hover:text-white transition-colors`}
              onClick={() => handleLinkClick(index, item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Stats Cards on the Right */}
        <div className="flex gap-2 md:gap-5 overflow-x-auto pb-2">
          {/* Premium fans */}
          {followers !== undefined && (
            <div
              style={{
                backgroundImage: "linear-gradient(45deg, #FB923C, #F97316)",
              }}
              className="h-[66px] stats-card px-3 text-white min-w-[140px] md:w-[153px] rounded-[8px] flex flex-col justify-center flex-shrink-0"
            >
              <h3 className="font-bold text-2xl">{followers}</h3>
              <h5 className="text-xs md:text-sm">Premium fan</h5>
            </div>
          )}

          {/* Today's matches */}
          {todayMatches !== undefined && (
            <div
              style={{
                backgroundImage: "linear-gradient(45deg, #4ADE80, #22C55E)",
              }}
              className="h-[66px] px-3 text-white min-w-[140px] md:w-[153px] rounded-[8px] stats-card flex flex-col justify-center flex-shrink-0"
            >
              <h3 className="font-bold text-2xl">{todayMatches}</h3>
              <h5 className="text-xs md:text-sm">Todays Matches</h5>
            </div>
          )}

          {/* Daily goals */}
          {dailyGoal !== undefined && (
            <div
              style={{
                backgroundImage: "linear-gradient(45deg, #60A5FA, #3B82F6)",
              }}
              className="h-[66px] px-3 text-white min-w-[140px] md:w-[153px] rounded-[8px] stats-card flex flex-col justify-center flex-shrink-0"
            >
              <h3 className="font-bold text-2xl">
                {dailyGoal.current}/{dailyGoal.target}
              </h3>
              <h5 className="text-xs md:text-sm">Daily goals</h5>
            </div>
          )}

          {/* Total matches */}
          {totalMatches !== undefined && (
            <div
              style={{
                backgroundImage: "linear-gradient(45deg, #F472B6, #EC4899)",
              }}
              className="h-[66px] px-3 text-white min-w-[140px] md:w-[153px] rounded-[8px] stats-card flex flex-col justify-center flex-shrink-0"
            >
              <h3 className="font-bold text-2xl">{totalMatches}</h3>
              <h5 className="text-xs md:text-sm">Total Matches</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;

"use client";
import { useState } from "react";

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
  const links = ["Discover", "Exclusive Content"];
  const [currentActiveLinkIndex, setCurrentActiveLinkIndex] = useState(0);

  return (
    <div className="sm:px-[50px] px-5 border-t-[0.5px] border-b-[0.5px] py-[10px] border-grayBorder md:flex gap-[99.2px]">
      <ul className="flex gap-5 items-center">
        {links.map((item, index) => (
          <li
            key={index}
            className={`${
              index === currentActiveLinkIndex
                ? "border-b text-white underline-offset-10"
                : "text-white/70"
            } text-sm cursor-pointer`}
            onClick={() => setCurrentActiveLinkIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="md:flex grid grid-cols-2 md:gap-5 gap-2 mt-5 md:mt-0">
        {/* premium fans */}
        {followers !== undefined && (
          <div
            style={{
              backgroundImage: "linear-gradient(45deg, #FB923C, #F97316)",
            }}
            className="h-[66px] stats-card px-3 text-white md:w-[153px] rounded-[8px]"
          >
            <h3 className="font-bold text-2xl pt-[3px]">{followers}</h3>
            <h5>Premium fan</h5>
          </div>
        )}
        {/* today's matches */}
        {todayMatches !== undefined && (
          <div
            style={{
              backgroundImage: "linear-gradient(45deg, #4ADE80, #22C55E)",
            }}
            className="h-[66px] px-3 text-white md:w-[153px] rounded-[8px] stats-card"
          >
            <h3 className="font-bold text-2xl pt-[3px]">{todayMatches}</h3>
            <h5>Todays Matches</h5>
          </div>
        )}
        {/* daily goals */}
        {dailyGoal !== undefined && (
          <div
            style={{
              backgroundImage: "linear-gradient(45deg, #60A5FA, #3B82F6)",
            }}
            className="h-[66px] px-3 text-white md:w-[153px] rounded-[8px] stats-card"
          >
            <h3 className="font-bold text-2xl pt-[3px]">
              {dailyGoal.current}/{dailyGoal.target}
            </h3>
            <h5>Daily goals</h5>
          </div>
        )}
        {/* total matches */}
        {totalMatches !== undefined && (
          <div
            style={{
              backgroundImage: "linear-gradient(45deg, #F472B6, #EC4899)",
            }}
            className="h-[66px] px-3 text-white md:w-[153px] rounded-[8px] stats-card"
          >
            <h3 className="font-bold text-2xl pt-[3px]">{totalMatches}</h3>
            <h5>Total Matches</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;

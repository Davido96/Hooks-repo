"use client";

import React from "react";
import Link from "next/link";

interface StatsBarProps {
  followers?: number;
  followings?: number;
  totalMatches?: number;
  todayMatches?: number;
  dailyGoal?: {
    current: number;
    target: number;
  };
}

export function StatsBar({
  followings = 0,
  totalMatches = 0,
  todayMatches = 0,
  dailyGoal = { current: 0, target: 20 },
}: StatsBarProps) {
  const dailyGoalProgress = (dailyGoal.current / dailyGoal.target) * 100;

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-nowrap w-full md:w-auto">
      {/* Premium Fans */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-4 flex flex-col justify-between flex-shrink-0 w-32 h-24 shadow-md">
        <div className="text-center">
          <p className="font-bold text-2xl text-white">{followings}</p>
          <p className="text-xs text-white/90 mt-1">Premium Fans</p>
        </div>
      </div>

      {/* Today's matches */}
      <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 flex flex-col justify-between flex-shrink-0 w-32 h-24 shadow-md">
        <div className="text-center">
          <p className="font-bold text-2xl text-white">{todayMatches}</p>
          <p className="text-xs text-white/90 mt-1">Today&apos;s matches</p>
        </div>
      </div>

      {/* Daily goal */}
      <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 flex flex-col justify-between flex-shrink-0 w-32 h-24 shadow-md">
        <div className="text-center">
          <p className="font-bold text-2xl text-white">
            {dailyGoal.current}/{dailyGoal.target}
          </p>
          <p className="text-xs text-white/90 mt-1">Daily goal</p>
        </div>
        <div className="w-full bg-white/30 rounded-full h-1.5 mt-2">
          <div
            className="bg-white rounded-full h-1.5 transition-all duration-300"
            style={{ width: `${Math.min(dailyGoalProgress, 100)}%` }}
          />
        </div>
      </div>

      {/* Total matches */}
      <Link href="/likes" className="flex-shrink-0">
        <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl p-4 flex flex-col justify-between w-32 h-24 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <p className="font-bold text-2xl text-white">{totalMatches}</p>
            <p className="text-xs text-white/90 mt-1">Total matches</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

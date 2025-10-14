"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Profile, Match } from "@/types";

interface ProfileCardProps {
  profile: Profile | Match;
  onAccept?: () => void;
  onReject?: () => void;
  onClick?: () => void;
}

export function ProfileCard({
  profile,
  onAccept,
  onReject,
  onClick,
}: ProfileCardProps) {
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleRejectClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (onReject) {
      onReject();
    }
  };

  const handleAcceptClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (onAccept) {
      onAccept();
    }
  };

  const cardContent = (
    <>
      <Image
        src={profile.display_pic || "/default-avatar.png"}
        alt={profile.full_name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Profile Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end text-left">
        <h2 className="text-2xl sm:text-3xl font-bold">
          {profile.full_name}, {profile.age}
        </h2>

        <div className="flex items-center gap-2 text-sm text-white/90 my-2">
          <span>
            {profile.city}, {profile.state}
          </span>
          {profile.gender && (
            <Badge variant="secondary" className="bg-green-200 text-green-900">
              {profile.gender}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {profile.interests.map((interest) => (
            <Badge
              key={interest}
              variant="secondary"
              className="bg-white/20 text-white border-transparent"
            >
              {interest}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        {onAccept && onReject && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleRejectClick}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2 text-sm font-medium transition"
            >
              Reject
            </button>
            <button
              onClick={handleAcceptClick}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 text-sm font-medium transition"
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={handleCardClick}
        className="relative w-full max-w-md h-[65vh] rounded-2xl overflow-hidden shadow-2xl group text-left"
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div className="relative w-full max-w-md h-[65vh] rounded-2xl overflow-hidden shadow-2xl group">
      {cardContent}
    </div>
  );
}

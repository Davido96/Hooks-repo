"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  X,
  Cake,
  MapPin,
  Music,
  MessageSquare,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSocialStore } from "@/stores/socialStore";
import { Match } from "@/types";

interface ProfileModalSubscribedProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match;
}

export default function ProfileModalSubscribed({
  isOpen,
  onClose,
  match,
}: ProfileModalSubscribedProps) {
  const {
    followUser,
    unfollowUser,
    loading,
    isFollowing,
    getFollowingCount,
    getFollowings
  } = useSocialStore();

  useEffect(() => {
    getFollowingCount();
    getFollowings();
  }, [getFollowingCount, getFollowings]);

  if (!isOpen) return null;

  const handleFollowToggle = async () => {
    try {
      if (isFollowing(match.user_id)) {
        await unfollowUser(match.user_id);
      } else {
        await followUser(match.user_id);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const handleSendMessage = () => {
    console.log(`Navigating to message with ${match.full_name}`);
    onClose();
    // router.push(`/messages/${match.user_id}`);
  };

  const following = isFollowing(match.user_id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-md shadow-lg relative p-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Creator Info */}
        <div className="text-center mb-6">
          <div className="relative w-24 h-24 mx-auto mb-3">
            <Image
              src={match.display_pic || "/default-avatar.png"}
              alt={match.full_name}
              fill
              className="rounded-full border-2 border-pink-500 object-cover"
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{match.full_name}</h3>
          <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mt-2 hover:bg-green-100">
            {match.user_type}
          </Badge>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6 text-gray-700 text-sm">
          <div className="flex items-center">
            <Cake size={18} className="text-gray-400 mr-3" />
            <span>{match.age} years old</span>
          </div>
          <div className="flex items-center">
            <MapPin size={18} className="text-gray-400 mr-3" />
            <span>{match.city}, {match.state}</span>
          </div>
          <div className="flex items-center">
            <Music size={18} className="text-gray-400 mr-3" />
            <span>{match.bio}</span>
          </div>
        </div>

        {/* Interests */}
        <div className="mb-6">
          <p className="font-semibold text-gray-700 mb-2">Interests</p>
          <div className="flex flex-wrap gap-2">
            {match.interests.map((interest, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 border-gray-200"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            onClick={handleFollowToggle}
            disabled={loading}
            className={`w-full font-bold h-auto py-3 text-base ${
              following
                ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {following ? (
              <>
                <CheckCircle size={20} className="mr-2 text-green-500" /> 
                {loading ? "Updating..." : "Following"}
              </>
            ) : (
              <>
                <UserPlus size={20} className="mr-2 text-white" /> 
                {loading ? "Following..." : "Follow"}
              </>
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center py-2 h-auto text-base"
            disabled
          >
            <CheckCircle size={20} className="mr-2 text-green-500" /> 
            Subscribed
          </Button>

          <Button
            variant="outline"
            onClick={handleSendMessage}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center py-2 h-auto text-base"
            disabled={loading}
          >
            <MessageSquare size={20} className="mr-2 text-gray-500" /> Send
            Message
          </Button>
        </div>

        {/* Stats */}
        <div className="flex justify-around text-center mt-4">
          <div>
            <p className="text-lg font-bold text-red-500">0</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div>
            <p className="text-lg font-bold text-orange-500">
              {match.followers}
            </p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div>
            <p className="text-lg font-bold text-pink-500">
              {match.subscribers}
            </p>
            <p className="text-xs text-gray-500">Subscribers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

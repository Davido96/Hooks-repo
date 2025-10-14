// components/fans/MatchModal.tsx

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Profile } from "@/types";
import { Heart } from "lucide-react";

interface MatchModalProps {
  matchedUser: Profile | null;
  onClose: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  matchedUser,
  onClose,
}) => {
  if (!matchedUser) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-8 text-center flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-4">
          <div className="absolute -left-12 top-2 text-2xl">
            <Heart />
          </div>
          <div className="absolute -right-12 bottom-4 text-2xl">
            <Heart />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">It&apos;s a Match!</h2>
        <p className="text-gray-500 mt-2">
          You and {matchedUser.full_name.split(" ")[0]} liked each other!
        </p>
        <div className="relative my-6">
          <Image
            src={matchedUser.display_pic || "/default-avatar.png"}
            alt={matchedUser.full_name}
            width={128}
            height={128}
            className="size-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <span className="absolute bottom-1 right-1 block h-6 w-6 rounded-full bg-green-500 border-2 border-white" />
        </div>
        <p className="text-xl font-bold text-gray-900">
          {matchedUser.full_name}, {matchedUser.age}
        </p>
        <p className="text-gray-500 text-sm mb-6">
          {matchedUser.bio.substring(0, 25)}...
        </p>
        <Button className="w-full bg-pink-500 hover:bg-pink-600 rounded-full py-3 text-lg">
          Start Chatting Now!
        </Button>
        <Button variant="ghost" className="w-full mt-2" onClick={onClose}>
          Keep Discovering
        </Button>
        <p className="text-xs text-gray-400 mt-4">
          Your connection will automatically start with a welcome message!
        </p>
      </div>
    </div>
  );
};

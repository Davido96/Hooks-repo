"use client";

import React from "react";
import Link from "next/link";
import { X, Star, Users } from "lucide-react";
import { ROUTES } from "@/routes/routes";

interface SignupChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupChoiceModal({
  isOpen,
  onClose,
}: SignupChoiceModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 transition-colors hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Join Hooks</h2>
          <p className="mt-2 text-white/80">
            How would you like to get started?
          </p>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Creator Option - Fixed Route */}
          <Link href={ROUTES.CREATOR_SIGNUP} passHref>
            <div
              onClick={onClose}
              className="group flex h-full cursor-pointer flex-col items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center transition-all hover:border-white/40 hover:bg-white/15"
            >
              <Star className="mb-4 h-10 w-10 text-yellow-300 transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-semibold">Sign up as a Creator</h3>
              <p className="mt-2 text-sm text-white/70">
                Monetize your content, build your audience, and start earning.
              </p>
            </div>
          </Link>

          {/* Fan Option */}
          <Link href={ROUTES.FAN_SIGNUP} passHref>
            <div
              onClick={onClose}
              className="group flex h-full cursor-pointer flex-col items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center transition-all hover:border-white/40 hover:bg-white/15"
            >
              <Users className="mb-4 h-10 w-10 text-pink-300 transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-semibold">Sign up as a Fan</h3>
              <p className="mt-2 text-sm text-white/70">
                Follow your favorite creators and access exclusive content.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Image from "next/image";

export function LikeSuccessToast({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in pointer-events-none">
      <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-pink-200/20 p-4 text-white shadow-2xl backdrop-blur-lg">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pink-500">
          <Image src="/fans/heart.png" alt="Success" width={24} height={24} />
        </div>
        <div>
          <h3 className="font-bold">Success</h3>
          <p className="text-sm text-white/80">
            Like sent, wait for user to accept match
          </p>
        </div>
      </div>
    </div>
  );
}

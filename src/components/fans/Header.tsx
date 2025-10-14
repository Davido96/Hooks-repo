"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Pencil,
  SlidersHorizontal,
  Shield,
  Gift,
  LogOut,
} from "lucide-react";
import { Profile } from "@/types";

interface HeaderProps {
  onLogout: () => void;
  profile: Profile | null;
  onWalletClick: () => void;
  onMessageClick: () => void;
  onEditProfileClick: () => void;
  onViewProfileClick: () => void;
  onReferralClick: () => void;
  onVerificationClick: () => void;
  onFilterClick: () => void;
}

export function Header({
  onLogout,
  profile,
  onWalletClick,
  onMessageClick,
  onEditProfileClick,
  onViewProfileClick,
  onReferralClick,
  onVerificationClick,
  onFilterClick,
}: HeaderProps) {
  if (!profile) {
    return (
      <header className="flex items-center justify-between p-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Hooks Logo"
            width={32}
            height={32}
            unoptimized
          />
          <span className="text-3xl font-bold text-white">Hooks</span>
        </Link>
      </header>
    );
  }

  // Cache-busting URL for the profile picture
  const profileImageUrl = profile.display_pic
    ? `${profile.display_pic}?v=${new Date(
        profile.updatedAt || Date.now()
      ).getTime()}`
    : "/default-avatar.png";

  return (
    <header className="flex items-center justify-between p-4 border-b border-white/10">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Hooks Logo"
          width={32}
          height={32}
          unoptimized
        />
        <span className="text-3xl font-bold text-white">Hooks</span>
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Likes Icon */}
        <Link href="/likes" className="relative hidden sm:block">
          <Image
            src="/fans/heart.png"
            alt="Likes"
            width={24}
            height={24}
            className="cursor-pointer"
            unoptimized
          />
          <div className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            10
          </div>
        </Link>

        {/* Notifications Icon */}
        <Link href="/notifications" className="relative hidden sm:block">
          <Image
            src="/fans/notif.png"
            alt="Notifications"
            width={24}
            height={24}
            className="cursor-pointer"
            unoptimized
          />
          <div className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            16
          </div>
        </Link>

        {/* Messages Icon */}
        <button onClick={onMessageClick} className="relative">
          <Image
            src="/fans/message.png"
            alt="Messages"
            width={24}
            height={24}
            className="cursor-pointer"
            unoptimized
          />
          <div className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            12
          </div>
        </button>

        {/* Wallet Icon */}
        <button onClick={onWalletClick} className="relative" title="Wallet">
          <Image
            src="/fans/wallet.png"
            alt="Wallet"
            width={24}
            height={24}
            className="cursor-pointer"
            unoptimized
          />
        </button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none">
            <Image
              src={profileImageUrl}
              alt={profile.full_name || "User avatar"}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover border-2 border-white/50"
              unoptimized
            />
            <span className="font-semibold hidden sm:block text-white">
              {profile.full_name}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl border-white/20 bg-gray-800/80 backdrop-blur-lg p-2 text-sm text-white"
          >
            <DropdownMenuLabel className="px-2 py-1.5 font-semibold">
              {profile.full_name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/20" />

            <DropdownMenuItem
              onClick={onViewProfileClick}
              className="flex items-center gap-2 cursor-pointer"
            >
              <User className="w-4 h-4" /> View profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={onEditProfileClick}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Pencil className="w-4 h-4" /> Edit Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={onFilterClick}
              className="flex items-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filter
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onVerificationClick}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4" /> Verification
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onReferralClick}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Gift className="w-4 h-4" /> Referral Program
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-white/20" />

            <DropdownMenuItem
              onClick={onLogout}
              className="flex items-center gap-2 cursor-pointer text-red-400 focus:bg-red-500/20 focus:text-red-300"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

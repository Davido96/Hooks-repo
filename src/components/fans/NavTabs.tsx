"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-6 flex-shrink-0">
      <Link
        href="/discover"
        className={`font-semibold pb-1 ${
          pathname === "/discover" ? "border-b-2 border-white" : "text-white/70"
        }`}
      >
        Discover
      </Link>

      <Link
        href="/exclusive-content"
        className={`font-semibold pb-1 ${
          pathname === "/exclusive-content"
            ? "border-b-2 border-white"
            : "text-white/70"
        }`}
      >
        Exclusive Content
      </Link>
    </div>
  );
}

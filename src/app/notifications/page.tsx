"use client";

import React from "react";
import Image from "next/image";
import NavigationTabs from "@/components/Navbar";
import { StatsBar } from "@/components/fans/StatsBar";

interface Notification {
  id: string;
  type: "match" | "like" | "tip" | "subscription";
  title: string;
  message: string;
  timestamp: string;
  avatar?: string;
  icon?: string;
}

export default function NotificationsPage() {
  const notifications: Notification[] = [
    {
      id: "1",
      type: "match",
      title: "New Match!",
      message: "You and Sarah liked each other!",
      timestamp: "30m ago",
    },
    {
      id: "2",
      type: "like",
      title: "Someone liked you!",
      message: "Alex sent you a like",
      timestamp: "2h ago",
      avatar: "/avatars/alex.jpg",
    },
    {
      id: "3",
      type: "tip",
      title: "Tip Received!",
      message: "You received a $5 tip from Jordan",
      timestamp: "4h ago",
      icon: "gift",
    },
    {
      id: "4",
      type: "subscription",
      title: "New Subscriber!",
      message: "Emma subscribed to your content",
      timestamp: "6h ago",
      avatar: "/avatars/emma.jpg",
    },
  ];

  const getBadgeColor = () => {
    return "bg-white text-gray-800";
  };

  const getNotificationIcon = (notification: Notification) => {
    if (notification.avatar) {
      return (
        <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20">
          <Image
            src={notification.avatar}
            alt="User avatar"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    if (notification.icon === "gift") {
      return (
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
            />
          </svg>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(135deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
      }}
    >
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 pb-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <NavigationTabs
            onLogout={() => {}}
            onWalletClick={() => {}}
            onMessageClick={() => {}}
            onEditProfileClick={() => {}}
            onViewProfileClick={() => {}}
            onReferralClick={() => {}}
            onVerificationClick={() => {}}
            onFilterClick={() => {}}
          />
        </div>

        {/* Stats Bar */}
        <div className="mb-6">
          <StatsBar />
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/50 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Icon/Avatar */}
                {getNotificationIcon(notification)}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900">
                      {notification.title}
                    </h3>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      {notification.timestamp}
                      <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{notification.message}</p>
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${getBadgeColor()}`}
                  >
                    {notification.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

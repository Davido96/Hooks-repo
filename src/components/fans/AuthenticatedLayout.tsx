"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/fans/Header";
import WalletManagementModal from "@/components/modals/WalletManagementModal";
import EditProfileModal from "@/components/modals/EditProfileModal";
import ViewProfileModal from "@/components/modals/ViewProfileModal";
import { ROUTES } from "@/routes/routes";
import { User } from "@/types";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, signout } = useAuthStore();
  const { profile } = useProfileStore();

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isViewProfileModalOpen, setIsViewProfileModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signout();
      router.push(ROUTES.HOMEPAGE);
    } catch (error) {
      console.error("Logout error:", error);
      router.push(ROUTES.HOMEPAGE);
    }
  };

  const handleMessageClick = () => {
    router.push("/messages");
  };

  const currentUser: User = useMemo(
    () => ({
      id: user?.user_id?.toString() ?? "user-123",
      email: user?.email ?? "user@example.com",
      fullName: profile?.full_name ?? user?.full_name ?? "User",
      avatar:
        profile?.display_pic ??
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      age: profile?.age ?? 25,
      bio: profile?.bio ?? "No bio available",
      gender: profile?.gender ?? "Not specified",
      interestedIn: "Everyone",
      state: profile?.state ?? "Lagos",
      city: profile?.city ?? "Unknown",
      phoneNumber: "+2348012345678",
      interests: profile?.interests ?? [],
    }),
    [user, profile]
  );

  return (
    <>
      <div
        className="min-h-screen text-white"
        style={{
          background:
            "linear-gradient(135deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
        }}
      >
        <Header
          user={currentUser}
          onLogout={handleLogout}
          onWalletClick={() => setIsWalletModalOpen(true)}
          onMessageClick={handleMessageClick}
          onEditProfileClick={() => setIsEditProfileModalOpen(true)}
          onViewProfileClick={() => setIsViewProfileModalOpen(true)}
        />

        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>

      {/* Modals */}
      <WalletManagementModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        user={currentUser}
      />
      <ViewProfileModal
        isOpen={isViewProfileModalOpen}
        onClose={() => setIsViewProfileModalOpen(false)}
      />
    </>
  );
}

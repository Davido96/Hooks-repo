"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/fans/Header";
import WalletManagementModal from "@/components/modals/WalletManagementModal";
import EditProfileModal from "@/components/modals/EditProfileModal";
import ViewProfileModal from "@/components/modals/ViewProfileModal";
import { ROUTES } from "@/routes/routes";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { signout } = useAuthStore();
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
           profile={profile}
           onLogout={handleLogout}
           onWalletClick={() => setIsWalletModalOpen(true)}
           onMessageClick={handleMessageClick}
           onEditProfileClick={() => setIsEditProfileModalOpen(true)}
           onViewProfileClick={() => setIsViewProfileModalOpen(true)}
           onReferralClick={() => {}}
           onVerificationClick={() => {}}
           onFilterClick={() => {}}
         />

        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>

      {/* Modals */}
      <WalletManagementModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
      {profile && (
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
          currentUser={profile}
        />
      )}
      {profile && (
        <ViewProfileModal
          isOpen={isViewProfileModalOpen}
          onClose={() => setIsViewProfileModalOpen(false)}
          profile={profile}
        />
      )}
    </>
  );
}

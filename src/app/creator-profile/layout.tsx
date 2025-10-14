"use client";

import ModalContainer from "@/components/ModalContainerCreator";
import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";
import { useCreatorProfileContext } from "@/hooks/useCreatorProfileContext";
import { useAuthStore } from "@/stores/authStore";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { signout } = useAuthStore();

  const handleLogOut = async () => {
    await signout();
    redirect("/");
  };

  const router = useRouter();

  const {
    setIsEditing,
    setShowFilter,
    setShowReferralProgram,
    setShowVerification,
    setShowWallet,
  } = useCreatorProfileContext();

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(135deg, #FF6B6B 0%, #FF8E9B 50%, #C44E88 100%)",
      }}
      className="min-h-screen c-profile"
    >
      <ModalContainer />
      <Navbar
        onViewProfileClick={() => router.push("/creator-profile/profile")}
        onMessageClick={() => router.push("/creator-profile/message")}
        onWalletClick={() => setShowWallet(true)}
        onVerificationClick={() => setShowVerification(true)}
        onReferralClick={() => setShowReferralProgram(true)}
        onEditProfileClick={() => setIsEditing(true)}
        onFilterClick={() => setShowFilter(true)}
        onLogout={handleLogOut}
        onNotificationClick={() =>
          router.push("/creator-profile/notifications")
        }
      />
      <Stats
        todayMatches={0}
        totalMatches={0}
        followers={2}
        dailyGoal={{ current: 0, target: 20 }}
      />
      <>{children}</>
    </div>
  );
}

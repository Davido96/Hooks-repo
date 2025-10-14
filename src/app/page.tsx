"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Homepage from "@/components/Landingpage";
import { ROUTES } from "../routes/routes";

interface User {
  role: "creator" | "fan";
  isVerified: boolean;
  profileCompleted: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user } = useAuth() as AuthContextType;
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // For the core redirection logic.
  useEffect(() => {
    // Wait until the component is mounted and auth state is confirmed.
    if (!mounted || !isAuthenticated || !user) {
      return;
    }

    // --- Creator Onboarding Flow ---
    if (user.role === "creator") {
      if (!user.isVerified) {
        router.replace(ROUTES.CREATOR_VERIFICATION_KYC_POLICY);
        return;
      }
      if (!user.profileCompleted) {
        router.replace(ROUTES.CREATOR_SETUP);
        return;
      }
    }

    router.replace(ROUTES.AUTHENTICATED_HOMEPAGE);
  }, [mounted, isAuthenticated, user, router]);

  if (!mounted) {
    return null;
  }

  return <Homepage />;
}

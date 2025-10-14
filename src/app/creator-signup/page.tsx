"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatorSignup from "@/components/CreatorSignup";
import { ROUTES } from "@/routes/routes";
import { useAuthStore } from "@/stores/authStore";

export default function CreatorSignupPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      if (user.user_type === "Creator") {
        router.push(ROUTES.CREATOR_PROFILE);
      } else {
        router.push(ROUTES.AUTHENTICATED_HOMEPAGE);
      }
    }
  }, [user, router]);

  return <CreatorSignup />;
}

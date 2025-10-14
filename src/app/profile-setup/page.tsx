"use client";

import { useRouter } from "next/navigation";
import ProfileSetup from "@/components/ProfileSetup";
import { RouteType } from "@/routes/routes";

export default function ProfileSetupPage() {
  const router = useRouter();

  const handleNavigate = (route: RouteType) => {
    router.push(route);
  };

  return <ProfileSetup onNavigate={handleNavigate} />;
}

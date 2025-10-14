"use client";

import { useRouter } from "next/navigation";
import CreatorProfileSetup from "@/components/CreatorProfileSetup";
import { RouteType } from "@/routes/routes";

export default function CreatorSetupPage() {
  const router = useRouter();

  const handleNavigate = (route: RouteType) => {
    router.push(route);
  };

  return <CreatorProfileSetup onNavigate={handleNavigate} />;
}

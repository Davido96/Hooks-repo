"use client";

import { useRouter } from "next/navigation";
import FanSignup from "@/components/FanSignup";
import { RouteType } from "@/routes/routes";

export default function FanSignupPage() {
  const router = useRouter();

  const handleNavigate = (route: RouteType) => {
    router.push(route);
  };

  return <FanSignup onNavigate={handleNavigate} />;
}

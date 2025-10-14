"use client";

import ProfileCard from "@/components/ProfileCard";
import { useEffect } from "react";
import { useProfileStore } from "@/stores/profileStore";
// import { useSocialStore } from "@/stores/socialStore";

const Page = () => {
  const { getProfile } = useProfileStore();
  // const {} = useSocialStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  // if (loading || error) return null;

  return (
    <div>
      <div>
        {/* passing the user role to know if its a creator or fan */}
        <ProfileCard userRole="creator" />
      </div>
    </div>
  );
};

export default Page;

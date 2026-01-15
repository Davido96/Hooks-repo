"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Profile } from "@/types";
import Image from "next/image";
import { useProfileStore } from "@/stores/profileStore";
import { useAuthStore } from "@/stores/authStore";

interface ViewProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: Profile | null;
}

const ProfileField = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined | null;
}) => (
  <div>
    <p className="block text-sm font-medium text-gray-500">{label}</p>
    <p className="text-lg text-gray-900 break-words">{value || "Not set"}</p>
  </div>
);

export default function ViewProfileModal({
   isOpen,
   onClose,
   profile: propProfile,
 }: ViewProfileModalProps) {
   const { profile: storeProfile, getProfile } = useProfileStore();
   const { user } = useAuthStore();

   // Use profile from props or store
   const profile = propProfile || storeProfile;

   // Load profile from store on mount if not provided
   useEffect(() => {
     if (isOpen && !propProfile && !storeProfile) {
       getProfile();
     }
   }, [isOpen, propProfile, storeProfile, getProfile]);

   if (!isOpen || !profile) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-2xl shadow-lg relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">View Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 text-gray-900 scrollbar-thin">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full bg-pink-500 flex items-center justify-center text-white text-5xl font-bold mb-4">
              {/* ✅ CORRECTED: Use `display_pic` to match the Profile type */}
              {profile.display_pic ? (
                <Image
                  src={profile.display_pic}
                  alt={`${profile.full_name}'s profile picture`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                // ✅ CORRECTED: Use `full_name` to match the Profile type
                profile.full_name?.charAt(0).toUpperCase() || "?"
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {/* ✅ CORRECTED: Use `full_name` */}
              <ProfileField label="Full Name" value={profile.full_name} />
              <ProfileField label="Age" value={profile.age} />
              <ProfileField label="Gender" value={profile.gender} />
            </div>
            <div className="mt-6">
              <ProfileField label="Bio" value={profile.bio} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Location</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <ProfileField label="State" value={profile.state} />
              <ProfileField label="City" value={profile.city} />
            </div>
          </div>


        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold px-6 py-2 rounded-md shadow-md hover:opacity-90"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

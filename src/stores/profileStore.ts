import { create } from "zustand";
import toast from "react-hot-toast";
import {
  getProfile as apiGetProfile,
  updateProfile as apiUpdateProfile,
} from "@/api/api";
import { Profile, ProfileUpdatePayload } from "@/types";

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;

  getProfile: (userId?: number) => Promise<void>;
  updateProfile: (data: ProfileUpdatePayload) => Promise<void>;
  clearError: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  getProfile: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await apiGetProfile(userId);
      set({ profile: res.data, loading: false });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to fetch profile";
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw err;
    }
  },

  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await apiUpdateProfile(data);
      set({ profile: res.data, loading: false });
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Profile update failed";
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));

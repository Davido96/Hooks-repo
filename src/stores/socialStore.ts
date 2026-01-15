import { create } from "zustand";
import toast from "react-hot-toast";
import {
  followUser as apiFollowUser,
  unfollowUser as apiUnfollowUser,
  getFollowers as apiGetFollowers,
  getFollowings as apiGetFollowings,
  getRecommendations as apiGetRecommendations,
  sendLike as apiSendLike,
  getLikes as apiGetLikes,
  respondLike as apiRespondLike,
} from "@/api/api";
import { Match } from "@/types";
import { AxiosError } from "axios";

interface ApiError {
  message?: string;
  error?: string;
}

export interface Like {
  id: number;
  full_name: string;
  gender: string;
  bio: string;
}

export interface PaginatedLikes {
  count: number;
  next: string | null;
  previous: string | null;
  results: { like: Like; id: number }[];
}

interface SocialState {
  followers: Match[];
  followings: Match[];
  followersCount: number;
  followingsCount: number;
  recommendations: Match[];
  likes: PaginatedLikes | null;
  confirmedLikesCount: number;
  loading: boolean;
  error: string | null;

  followUser: (id: string | number) => Promise<void>;
  unfollowUser: (id: string | number) => Promise<void>;
  getFollowers: () => Promise<void>;
  getFollowings: () => Promise<void>;
  getFollowerCount: () => Promise<void>;
  getFollowingCount: () => Promise<void>;
  getConfirmedLikesCount: () => Promise<void>;
  getRecommendations: () => Promise<void>;
  isFollowing: (id: string | number) => boolean;
  sendLike: (id: string | number) => Promise<void>;
  getLikes: (status: "pending" | "requested" | "confirmed") => Promise<void>;
  respondLike: (
    likeInstance: string | number,
    action: "accept" | "reject"
  ) => Promise<void>;
  clearError: () => void;
}

export const useSocialStore = create<SocialState>((set, get) => ({
  followers: [],
  followings: [],
  followersCount: 0,
  followingsCount: 0,
  recommendations: [],
  likes: null,
  confirmedLikesCount: 0,
  loading: false,
  error: null,

  isFollowing: (id) => {
    const followings = get().followings;
    return followings.some((user) => user.user_id === id);
  },

  followUser: async (id) => {
    const originalFollowings = get().followings;
    set((state) => ({
      followings: [...state.followings, { user_id: String(id) } as Match],
      followingsCount: state.followingsCount + 1,
    }));
    try {
      await apiFollowUser(id);
      toast.success("User followed successfully!");
      await get().getFollowings(); // Full sync
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      set({
        followings: originalFollowings,
        followingsCount: get().followingsCount - 1,
      });
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        "Failed to follow user";
      toast.error(errorMessage);
      throw err;
    }
  },

  unfollowUser: async (id) => {
    const originalFollowings = get().followings;
    set((state) => ({
      followings: state.followings.filter((user) => user.user_id !== id),
      followingsCount: state.followingsCount - 1,
    }));
    try {
      await apiUnfollowUser(id);
      toast.success("User unfollowed successfully!");
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      set({
        followings: originalFollowings,
        followingsCount: get().followingsCount + 1,
      });
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        "Failed to unfollow user";
      toast.error(errorMessage);
      throw err;
    }
  },

  getFollowers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiGetFollowers();
      set({ followers: res.data, loading: false });
    } catch {
      set({ error: "Failed to fetch followers", loading: false });
    }
  },

  getFollowings: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiGetFollowings();
      set({ followings: res.data, loading: false });
    } catch {
      set({ error: "Failed to fetch followings", loading: false });
    }
  },

  getFollowerCount: async () => {
    try {
      const res = await apiGetFollowers(true);
      set({ followersCount: res.data.followers });
    } catch {
      console.error("Failed to fetch follower count");
    }
  },

  getFollowingCount: async () => {
    try {
      const res = await apiGetFollowings(true);
      set({ followingsCount: res.data.following });
    } catch {
      console.error("Failed to fetch following count");
    }
  },

  getConfirmedLikesCount: async () => {
    try {
      const res = await apiGetLikes("confirmed");
      set({ confirmedLikesCount: res.data.count });
    } catch {
      console.error("Failed to fetch confirmed likes count");
    }
  },

  getRecommendations: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiGetRecommendations();
      set({ recommendations: res.data, loading: false });
    } catch {
      set({ error: "Failed to fetch recommendations", loading: false });
    }
  },

  sendLike: async (id) => {
    set({ loading: true, error: null });
    try {
      await apiSendLike(id);
      set({ loading: false });
      toast.success("Like sent successfully!");
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        "Failed to send like";
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw err;
    }
  },

  getLikes: async (status) => {
    set({ loading: true, error: null });
    try {
      const res = await apiGetLikes(status);
      set({ likes: res.data, loading: false });
    } catch {
      set({ error: "Failed to fetch likes", loading: false });
    }
  },

  respondLike: async (likeInstance, action) => {
    set({ loading: true, error: null });
    try {
      await apiRespondLike(likeInstance, action);
      set({ loading: false });
      toast.success(`Like ${action}ed successfully!`);
      await get().getLikes("requested");
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        "Failed to respond to like";
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));

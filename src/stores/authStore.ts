import { create } from "zustand";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  signin as apiSignin,
  signout as apiSignout,
  signup as apiSignup,
  getProfile as apiGetProfile,
} from "@/api/api";
import { AxiosError } from "axios";
import { User } from "@/types";

interface AuthUser extends User {
  balance?: number;
  dailyLikesRemaining?: number;
}

interface ApiError {
  message?: string;
  error?: string;
}

interface AuthState {
  user: AuthUser | null;
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;
  signup: (data: {
    email: string;
    password: string;
    password2: string;
    user_type?: "Fan" | "Creator";
  }) => Promise<AuthUser | null>;
  signin: (data: { email: string; password: string }) => Promise<AuthUser | null>;
  signout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const handleAuthSuccess = (access: string, refresh: string, user: AuthUser) => {
    const cookieOptions = { expires: 7, secure: true, path: "/" };

    // Set cookies for middleware
    Cookies.set("authToken", access, cookieOptions);
    if (user.user_type) {
      Cookies.set("userRole", user.user_type, cookieOptions);
    }
    if (typeof user.profileCreated === "boolean") {
      Cookies.set(
        "profileComplete",
        String(user.profileCreated),
        cookieOptions
      );
    }

    // Set local storage for client-side use
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    // Update the state
    set({ access, refresh, user, loading: false, error: null });
  };

  return {
    user: null,
    access: null,
    refresh: null,
    loading: true,
    error: null,

    signup: async (data) => {
      set({ loading: true, error: null });
      try {
        const response = await apiSignup(
          data.email,
          data.password,
          data.password2,
          data.user_type || "Fan"
        );

        // Signup only returns email and user_type, not tokens
        // User needs to sign in separately to get tokens
        toast.success("Signup successful! Please sign in.");
        set({ loading: false });
        return null; // Return null as signup doesn't authenticate
      } catch (error) {
        const err = error as AxiosError<ApiError>;
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Signup failed";
        set({ error: errorMessage, loading: false });
        toast.error(errorMessage);
        return null;
      }
    },

    signin: async (data) => {
      set({ loading: true, error: null });
      try {
        const response = await apiSignin(data.email, data.password);

        const user = response.data.user as AuthUser;
        handleAuthSuccess(response.data.access, response.data.refresh, user);
        toast.success("Login successful!");
        return user;
      } catch (error) {
        const err = error as AxiosError<ApiError>;
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed";
        set({ error: errorMessage, loading: false });
        toast.error(errorMessage);
        return null;
      }
    },

    signout: async () => {
      try {
        await apiSignout();
        Cookies.remove("authToken");
        Cookies.remove("userRole");
        Cookies.remove("profileComplete");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        set({ user: null, access: null, refresh: null, error: null });
        toast.success("Logged out successfully");
      } catch (error) {
        console.error("Signout error:", error);
        // Still clear local state even if API call fails
        set({ user: null, access: null, refresh: null });
      }
    },

    fetchProfile: async () => {
      try {
        const response = await apiGetProfile();
        const user = response.data as AuthUser;
        set({ user, loading: false });
      } catch (error) {
        console.error("Fetch profile error:", error);
        set({ loading: false });
      }
    },

    initializeAuth: async () => {
      try {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");

        if (access && refresh) {
          set({ access, refresh, loading: true });
          await get().fetchProfile();
        } else {
          set({ loading: false });
        }
      } catch (error) {
        console.error("Initialize auth error:", error);
        set({ loading: false });
      }
    },
  };
});

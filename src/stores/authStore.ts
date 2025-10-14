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

interface User {
  email: string;
  user_id?: string;
  user_type?: "Fan" | "Creator";
  full_name?: string;
  display_pic?: string;
  age?: number;
  bio?: string;
  gender?: string;
  state?: string;
  city?: string;
  balance?: number;
  interests?: string[];
  monthly_sub_keys?: string | null;
  isVerified?: boolean;
  profileCreated?: boolean;
}

interface ApiError {
  message?: string;
  error?: string;
}

interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;
  signup: (data: {
    email: string;
    password: string;
    password2: string;
    user_type?: "Fan" | "Creator";
  }) => Promise<User | null>;
  signin: (data: { email: string; password: string }) => Promise<User | null>;
  signout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const handleAuthSuccess = (access: string, refresh: string, user: User) => {
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
        await apiSignup(
          data.email,
          data.password,
          data.password2,
          data.user_type
        );
        toast.success("Account created successfully! Logging you in...");

        try {
          const loginRes = await apiSignin(data.email, data.password);
          const { access, refresh, user } = loginRes.data;
          handleAuthSuccess(access, refresh, user); // Use helper
          return user;
        } catch (loginErr) {
          // Gracefully handle auto-login failure
          console.error("Auto-login after signup failed:", loginErr);
          toast.success("Registration successful! Please log in to continue.");
          // Don't re-throw, just return null to signify login is needed
          return null;
        }
      } catch (err: unknown) {
        const axiosError = err as AxiosError<ApiError>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          "Sign up failed";
        set({ error: errorMessage, loading: false });
        toast.error(errorMessage);
        throw axiosError;
      }
    },

    signin: async (data) => {
      set({ loading: true, error: null });
      try {
        const res = await apiSignin(data.email, data.password);
        const { access, refresh, user } = res.data;
        handleAuthSuccess(access, refresh, user); // Use helper
        toast.success("Login successful!");
        return user;
      } catch (err: unknown) {
        const axiosError = err as AxiosError<ApiError>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          "Signin failed";
        set({ error: errorMessage, loading: false });
        toast.error(errorMessage);
        throw axiosError;
      }
    },

    signout: async () => {
      set({ loading: true });
      try {
        await apiSignout();
        toast.success("Logged out successfully!");
      } catch (error: unknown) {
        console.error("Logout error:", error);
      } finally {
        Cookies.remove("authToken");
        Cookies.remove("userRole");
        Cookies.remove("profileComplete");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        set({
          user: null,
          access: null,
          refresh: null,
          error: null,
          loading: false,
        });
      }
    },

    fetchProfile: async () => {
      try {
        if (get().user) return; // Don't fetch if user is already in state
        const res = await apiGetProfile();
        set({ user: res.data });
      } catch (error) {
        console.error("Profile fetch failed, signing out:", error);
        // If profile fetch fails, the token is likely invalid. Sign out.
        get().signout();
      }
    },

    initializeAuth: async () => {
      try {
        const accessToken = localStorage.getItem("access");
        if (accessToken) {
          set({ access: accessToken });
          await get().fetchProfile();
        }
      } catch (error) {
        console.error("Initialization failed:", error);
      } finally {
        set({ loading: false });
      }
    },
  };
});

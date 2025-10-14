export interface User {
  user_id: string;
  email: string;
  name: string;
  age: number | null;
  bio: string;
  gender: "Male" | "Female" | "Other" | null;
  state: string;
  city: string;
  interests: string[];
  avatarUrl?: string;
  user_type: "Fan" | "Creator";
  isVerified: boolean;
  profileCreated: boolean;
  subscriptionFee?: number;
  balance?: number;
  followers?: number;
  following?: number;
  subscribers?: number;
  posts?: number;
  createdAt?: string;
  updatedAt?: string;
  phoneNumber?: string;
  race?: string;
  interestedIn?: string;
}

export interface Match {
  user_id: string;
  full_name: string;
  age: number | null;
  state: string;
  isMutual?: boolean;
  city: string;
  display_pic?: string;
  interests: string[];
  user_type: "Fan" | "Creator";
  bio: string;
  followers: number;
  subscribers: number;
  subscriptionFee: number;
  gender: "Male" | "Female" | "Other" | null;
}

export interface Profile {
  id: number;
  user_id: string;
  full_name: string;
  display_pic: string | null;
  age: number | null;
  bio: string;
  gender: "Male" | "Female" | "Other" | null;
  state: string;
  city: string;
  interests: string[];
  monthly_sub_keys: string | null;
  updatedAt?: string;
}

export interface ProfileUpdatePayload {
  full_name?: string;
  gender?: "Male" | "Female" | "Other" | null;
  display_pic?: File;
  age?: number;
  monthly_sub_keys?: string;
  state?: string;
  city?: string;
  interests?: string[];
  bio?: string;
}
export interface RawApiUser {
  id?: number | string;
  full_name?: string;
  age?: number;
  city?: string;
  state?: string;
  display_pic?: string;
  subscribers?: number | string;
  interests?: string[];
  bio?: string;
  followers?: number;
}

export interface ProfileFormData {
  name: string;
  age: string;
  bio: string;
  state: string;
  city: string;
  interests: string[];
  currentInterest: string;
  subscriptionRate: string;
  newPin: string;
  confirmPin: string;
  avatarFile?: File;
  avatarPreview?: string;
}

export interface ProfileSetupStep {
  step: number;
  title: string;
  subtitle: string;
}

export const ROUTES = {
  HOMEPAGE: "/",
  LOGIN: "/login",
  CREATOR_SIGNUP: "/creator-signup",
  CREATOR_SETUP: "/creator-setup",
  FAN_SIGNUP: "/fan-signup",
  PROFILE_SETUP: "/profile-setup",
  AUTHENTICATED_HOMEPAGE: "/authenticated-homepage",
  CREATOR_PROFILE: "/creator-profile",
  COMMUNITY_GUIDELINES: "/community-guidelines",
  TERMS: "/terms",
  EARNINGS: "/earnings",
  FAN_PRIVACY: "/fan-privacy",
  CREATOR_PRIVACY: "/creator-privacy",
  ABOUT: "/about",
  CREATOR_VERIFICATION_KYC_POLICY: "/creator-verification/kyc-policy",
} as const;

export type RouteType = (typeof ROUTES)[keyof typeof ROUTES];

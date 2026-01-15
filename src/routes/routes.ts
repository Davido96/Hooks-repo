export const ROUTES = {
  // --- Public & Static Routes ---
  HOMEPAGE: "/",
  ABOUT: "/about",
  COMMUNITY_GUIDELINES: "/community-guidelines",
  TERMS: "/terms",
  EARNINGS: "/earnings",
  FAN_PRIVACY: "/fan-privacy",
  CREATOR_PRIVACY: "/creator-privacy",

  // --- Authentication Routes ---
  LOGIN: "/login",
  FAN_SIGNUP: "/fan-signup",
  CREATOR_SIGNUP: "/creator-signup",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_RESET_CODE: "/verify-reset-code",
  CREATE_NEW_PASSWORD: "/create-new-password",

  // --- Onboarding & Setup Routes ---
  PROFILE_SETUP: "/profile-setup", // For Fans
  CREATOR_SETUP: "/creator-setup",
  CREATOR_VERIFICATION_KYC_POLICY: "/creator-verification/kyc-policy",
  CREATOR_VERIFICATION_AGE_CONSENT: "/creator-verification/age-consent",
  CREATOR_VERIFICATION_PRIVACY: "/creator-verification/privacy",
  CREATOR_VERIFICATION_AGREEMENT: "/creator-verification/agreement",

  // --- Core Authenticated Routes ---
  AUTHENTICATED_HOMEPAGE: "/authenticated-homepage",
  DISCOVER: "/authenticated-homepage",
  LIKES: "/likes",
  MESSAGES: "/messages",
  CREATOR_PROFILE: "/creator-profile",
  NOTIFICATIONS: "/notifications",
  // --- User Account & Settings Routes ---
  SETTINGS_FILTERS: "/settings/filters",
  VERIFICATION: "/verification",
  REFERRALS: "/referrals",
} as const;

export type RouteType = (typeof ROUTES)[keyof typeof ROUTES];

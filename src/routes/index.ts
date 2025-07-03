export const ROUTES = {
  HOMEPAGE: "homepage",
  LOGIN: "login",
  CREATOR_SIGNUP: "creator-signup",
  CREATOR_SETUP: "creator-setup",
  FAN_SIGNUP: "fan-signup",
  PROFILE_SETUP: "profile-setup",
  AUTHENTICATED_HOMEPAGE: "authenticated-homepage",
} as const;

export type RouteType = (typeof ROUTES)[keyof typeof ROUTES];

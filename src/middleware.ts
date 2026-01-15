import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "../src/routes/routes";

const publicRoutes = [
  ROUTES.HOMEPAGE,
  ROUTES.ABOUT,
  ROUTES.COMMUNITY_GUIDELINES,
  ROUTES.TERMS,
  ROUTES.EARNINGS,
  ROUTES.FAN_PRIVACY,
  ROUTES.CREATOR_PRIVACY,
] as const;

const authRoutes = [
  ROUTES.LOGIN,
  ROUTES.FAN_SIGNUP,
  ROUTES.CREATOR_SIGNUP,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.VERIFY_RESET_CODE,
  ROUTES.CREATE_NEW_PASSWORD,
] as const;

// Creates the type: "/" | "/about" | ...
type PublicRoute = (typeof publicRoutes)[number];
// Creates the type: "/login" | "/fan-signup" | ...
type AuthRoute = (typeof authRoutes)[number];

function isPublicRoute(pathname: string): pathname is PublicRoute {
  return (publicRoutes as readonly string[]).includes(pathname);
}

function isAuthRoute(pathname: string): pathname is AuthRoute {
  return (authRoutes as readonly string[]).includes(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read Authentication State from Cookies
  const authToken = request.cookies.get("authToken")?.value;
  const userRole = request.cookies.get("userRole")?.value as
    | "Creator"
    | "Fan"
    | undefined;
  const isProfileComplete =
    request.cookies.get("profileComplete")?.value === "true";

  const isProtectedRoute = !isPublicRoute(pathname) && !isAuthRoute(pathname);

  // --- Handle Unauthenticated Users ---
  if (!authToken && isProtectedRoute) {
    return NextResponse.redirect(new URL(ROUTES.HOMEPAGE, request.url));
  }

  // --- Handle Authenticated Users ---
  if (authToken) {
    if (isAuthRoute(pathname)) {
      return NextResponse.redirect(
        new URL(ROUTES.AUTHENTICATED_HOMEPAGE, request.url)
      );
    }

    if (!isProfileComplete) {
      if (userRole === "Fan" && pathname !== ROUTES.PROFILE_SETUP) {
        return NextResponse.redirect(
          new URL(ROUTES.PROFILE_SETUP, request.url)
        );
      }
      if (
        userRole === "Creator" &&
        !pathname.startsWith("/creator-verification")
      ) {
        return NextResponse.redirect(
          new URL(ROUTES.CREATOR_VERIFICATION_KYC_POLICY, request.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

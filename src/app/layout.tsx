import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import CreatorContextProvider from "@/contexts/creatorProfile";

export const metadata: Metadata = {
  title: {
    template: "%s | Hooks",
    default: "Hooks - Connect with Creators and Fans",
  },
  description:
    "Hooks is the ultimate platform for creators to monetize their content and for fans to get exclusive access and connect with their favorite personalities.",
  metadataBase: new URL("https://hooksfans.com"),
  openGraph: {
    title: "Hooks - Connect with Creators and Fans",
    description: "The ultimate platform for creators and fans.",
    url: "/",
    siteName: "Hooks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hooks - Connect with Creators and Fans",
    description: "The ultimate platform for creators and fans.",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={`c-profile antialiased min-h-screen bg-white text-black`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <CreatorContextProvider>{children}</CreatorContextProvider>
        </AuthProvider>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "9999px",
              padding: "12px 20px",
            },
            error: {
              style: {
                background: "#EF4444",
                color: "white",
              },
            },
            success: {
              style: {
                background: "#22C55E",
                color: "white",
              },
            },
          }}
        />
      </body>
    </html>
  );
}

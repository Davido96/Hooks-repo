"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "@/components/ui/button";
import SignupChoiceModal from "../../components/modals/SignUpChoiceModal";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const { signin } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Kindly enter all fields");

    setIsLoading(true);
    try {
      await signin({ email, password });
      const user = useAuthStore.getState().user;

      if (user?.user_type === "Creator") {
        router.push("/creator-profile");
      } else {
        router.push("/authenticated-homepage");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      alert(
        error?.response?.data?.message ||
          "Authentication failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col justify-between text-white"
        style={{
          background:
            "linear-gradient(160deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
        }}
      >
        <header className="absolute top-0 right-0 p-6">
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-white/30 hover:bg-white/10 text-white text-xs rounded-full px-4 py-2"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </header>

        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4 gap-3">
                <Image
                  src="/logo.png"
                  alt="Hooks Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                  unoptimized
                />
                <h1 className="text-3xl font-bold text-white">Hooks</h1>
              </div>
              <p className="text-white/80">Welcome back!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all placeholder:text-white/60"
                  required
                />
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all placeholder:text-white/60"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </form>
            <div className="mt-6 text-sm flex justify-between items-center">
              <div>
                <button
                  onClick={() => setIsSignupModalOpen(true)}
                  className="text-white/80 hover:text-white font-medium transition-colors"
                >
                  Don&apos;t have an account? Sign up
                </button>
              </div>
              <Link href={"/forgot-password"}>Forgot Password?</Link>
            </div>
          </div>
        </main>

        <footer className="w-full container mx-auto text-center py-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/80">
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/guidelines"
                className="hover:text-white transition-colors"
              >
                Guidelines
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <p className="text-xs text-white/70">
              &copy; {new Date().getFullYear()} Hooks. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <SignupChoiceModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </>
  );
}

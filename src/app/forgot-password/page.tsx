"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ROUTES } from "@/routes/routes";
import { forgotPassword } from "@/api/api";

interface ApiError {
  message?: string;
  error?: string;
}

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast.success("Reset code sent to your email!");
      
      // Navigate to verify code page after 2 seconds
      setTimeout(() => {
        router.push(`${ROUTES.VERIFY_RESET_CODE}?email=${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        (err instanceof Error ? err.message : "Failed to send reset code. Please try again.");
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Forgot password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between text-white"
      style={{
        background:
          "linear-gradient(160deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
      }}
    >
      {/* Header */}
      <header className="absolute top-0 right-0 p-6">
        <button
          title="Go Back"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/20 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 w-full">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Hooks Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h1 className="text-3xl font-bold text-white">Hooks</h1>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Reset Password
                  </h2>
                  <p className="text-white/80 text-base leading-relaxed">
                    Enter your email address and we'll send you a code to reset
                    your password.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white/90 text-sm font-semibold mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"
                        size={20}
                      />
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent outline-none transition-all placeholder:text-white/40 text-white text-sm"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500/20 border border-red-400/40 rounded-xl p-4 backdrop-blur-sm">
                      <p className="text-red-100 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 via-pink-400 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-base"
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Code...
                      </span>
                    ) : (
                      "Send Reset Code"
                    )}
                  </button>
                </form>

                {/* Links */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <Link
                    href={ROUTES.LOGIN}
                    className="block text-center text-white/70 hover:text-white font-medium transition-colors text-sm"
                  >
                    Remember your password?{" "}
                    <span className="text-pink-300 hover:text-pink-200">
                      Sign in
                    </span>
                  </Link>
                  <p className="text-center text-white/60 text-xs">
                    Don't have an account?{" "}
                    <Link
                      href={ROUTES.FAN_SIGNUP}
                      className="text-pink-300 hover:text-pink-200 font-semibold transition-colors"
                    >
                      Create account
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center py-8">
                  <div className="flex justify-center mb-6">
                    <CheckCircle size={64} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Code Sent Successfully
                  </h3>
                  <p className="text-white/80 text-sm mb-6">
                    We've sent a password reset code to
                    <br />
                    <span className="text-white font-semibold">{email}</span>
                  </p>
                  <div className="bg-white/10 rounded-xl p-4 mb-6">
                    <p className="text-white/70 text-xs">
                      Didn't receive the code? Check your spam folder or wait a
                      few seconds.
                    </p>
                  </div>
                  <p className="text-white/60 text-sm">
                    Redirecting to verification page...
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-white/50 text-xs">
        <p>&copy; {new Date().getFullYear()} Hooks. All rights reserved.</p>
      </footer>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function VerifyResetCode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    setIsLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/auth/verify-reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        throw new Error("Invalid or expired code");
      }

      const data = await response.json();

      // Navigate to create new password page with token
      router.push(`/create-new-password?token=${data.resetToken}`);
    } catch (err) {
      setError("Invalid or expired code. Please try again.");
      console.error("Verify code error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to resend code");
      }

      setCountdown(60);
      setCanResend(false);
    } catch (err) {
      setError("Failed to resend code. Please try again.");
      console.error("Resend code error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-4"
      style={{
        background:
          "linear-gradient(160deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
      }}
    >
      <button
        title="Go Back"
        onClick={() => router.back()}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="flex items-center gap-3 mb-12">
        <Image src="/logo.png" alt="Hooks Logo" width={40} height={40} />
        <h1 className="text-4xl font-bold text-white">Hooks</h1>
      </div>

      <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
          <p className="text-white/80 text-sm">
            We&apos;ve sent a password reset code to your email. Input the code
            in the email to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/90 text-sm mb-2">
              Input Code
            </label>
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all placeholder:text-white/60 text-white"
              required
            />
          </div>

          {error && <p className="text-red-200 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-white/80 mb-1">
            Didn&apos;t receive the email? Check your spam folder or try
            resending.
          </p>
          {canResend ? (
            <button
              onClick={handleResendCode}
              className="text-pink-300 hover:text-pink-200 font-medium underline"
              disabled={isLoading}
            >
              Resend Code
            </button>
          ) : (
            <p className="text-white/70">
              Resend code in {formatTime(countdown)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset code");
      }

      // Navigate to verify code page
      router.push(`/verify-reset-code?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError("Failed to send reset code. Please try again.");
      console.error("Forgot password error:", err);
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
          <h2 className="text-2xl font-bold text-white mb-2">
            Forgot Password
          </h2>
          <p className="text-white/80 text-sm">
            Enter your email address and we&apos;ll send you a code to reset
            your password.
          </p>
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
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all placeholder:text-white/60 text-white"
              required
            />
          </div>

          {error && <p className="text-red-200 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending Code..." : "Send Reset Code"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-white/80 hover:text-white font-medium transition-colors text-sm"
          >
            Remember your password? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

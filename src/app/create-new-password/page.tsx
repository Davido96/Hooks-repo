"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";

function CreateNewPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      // Show success message and redirect to login
      alert(
        "Password reset successful! Please sign in with your new password."
      );
      router.push("/login");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error("Reset password error:", err);
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
            Create New Password
          </h2>
          <p className="text-white/80 text-sm">
            Please enter and confirm your new password. You will need to enter
            sign in after the reset.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/90 text-sm mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                size={20}
              />
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all placeholder:text-white/60 text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white/90 text-sm mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                size={20}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all placeholder:text-white/60 text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-200 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CreateNewPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewPasswordContent />
    </Suspense>
  );
}

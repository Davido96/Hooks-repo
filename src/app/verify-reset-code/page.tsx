"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function VerifyResetCodeContent() {
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
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || code.length < 6) {
      setError("Please enter a valid verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/verify-reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });

      if (!response.ok) {
        throw new Error("Verification code is invalid or expired");
      }

      const data = await response.json();

      router.push(`/create-new-password?token=${data.token}`);
    } catch (err) {
      setError("Failed to verify code. Please try again.");
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/resend-reset-code", {
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
      console.error("Resend error:", err);
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
          <h2 className="text-2xl font-bold text-white mb-2">Verify Code</h2>
          <p className="text-white/80 text-sm">
            We&apos;ve sent a verification code to <span className="font-semibold">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="block text-white/90 text-sm mb-2">
              Verification Code
            </label>
            <input
              type="text"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              className="w-full px-4 py-3 text-center text-2xl tracking-widest bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all placeholder:text-white/60 text-white"
              required
            />
            <p className="text-xs text-white/60 mt-2 text-center">
              Enter the 6-digit code sent to your email
            </p>
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

        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm mb-3">
            {canResend ? (
              <>
                Didn&apos;t receive the code?{" "}
                <button
                  onClick={handleResendCode}
                  className="text-pink-300 hover:text-pink-200 font-semibold transition-colors"
                >
                  Resend Code
                </button>
              </>
            ) : (
              <>
                You can request a new code in{" "}
                <span className="text-pink-300 font-semibold">
                  {formatTime(countdown)}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyResetCode() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyResetCodeContent />
    </Suspense>
  );
}

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Stepper = () => {
  const steps = ["KYC Policy", "Age Consent", "Privacy", "Agreement"];
  const activeStep = 4;

  return (
    <div className="flex items-center justify-center w-full max-w-lg mb-8">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= activeStep;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-white text-pink-500 border-white"
                    : "bg-transparent border-white/50 text-white/50"
                }`}
              >
                {stepNumber}
              </div>
              <p
                className={`text-xs mt-2 transition-all duration-300 ${
                  isActive ? "text-white font-semibold" : "text-white/50"
                }`}
              >
                {label}
              </p>
            </div>
            {stepNumber < steps.length && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                  isActive && activeStep > stepNumber
                    ? "bg-white"
                    : "bg-white/30"
                }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default function Agreement() {
  const router = useRouter();

  const handleProceed = () => {
    console.log("Onboarding complete. Proceeding to yor Profile...");
    router.push("/creator-profile");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 sm:p-8"
      style={{
        background:
          "linear-gradient(160deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
      }}
    >
      <header className="w-full max-w-5xl mb-8">
        <div className="relative flex justify-center items-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Hooks Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-3xl font-bold text-white">Hooks</span>
          </Link>
        </div>
      </header>

      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">Hooks Creator Verification</h1>
        <p className="mt-2 text-white/80 max-w-xl mx-auto">
          Welcome to Hooks. To ensure a safe and trusted space for creators and
          users, we require every creator to complete this verification process.
        </p>
      </div>

      <Stepper />

      <main className="bg-white text-black rounded-2xl shadow-xl p-8 w-full max-w-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Final Step: Agreement</h2>
          <p className="text-gray-600">
            You&apos;re ready to become a verified Hooks creator!
          </p>
        </div>

        <div className="my-8 space-y-6">
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Congratulations!</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              You have successfully completed all verification steps. By
              proceeding, you agree to all the terms and conditions outlined in
              the previous steps and confirm your eligibility to create content
              on our 18+ platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> KYC Verified
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> Age Confirmed
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> Privacy Agreed
            </div>
          </div>

          <div className="flex items-center gap-3 bg-purple-500/10 text-purple-800 p-4 rounded-lg text-sm">
            <Sparkles className="w-5 h-5 flex-shrink-0 text-purple-600" />
            <p>
              <strong>
                Click &quot;I Agree & Proceed&quot; to complete your onboarding
                and become a verified creator on HooksFans.
              </strong>
            </p>
          </div>
        </div>

        <Button
          onClick={handleProceed}
          className="w-full font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 py-6 text-base"
        >
          I Agree & Proceed
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By proceeding, you acknowledge that you have read, understood, and
          agree to all terms and conditions.
        </p>
      </main>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Added missing import
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// --- Sub-Components for organization ---

const Stepper = () => {
  const steps = ["KYC Policy", "Age Consent", "Privacy", "Agreement"];
  const activeStep = 3;

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

const CustomListItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-2 flex-shrink-0"></div>
    <p className="text-gray-600">{children}</p>
  </div>
);

export default function Privacy() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleNext = () => {
    if (agreed) {
      console.log("Privacy policy agreed. Proceeding to next step.");
      router.push("/creator-verification/agreement"); // Your next step route
    }
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
            <Image src="/logo.png" alt="Hooks Logo" width={32} height={32} />
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
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Privacy Disclaimer</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Your privacy and safety are our top priority. Here&apos;s how we
            handle your data:
          </p>
        </div>

        <div className="my-8 space-y-4 text-left text-sm">
          <CustomListItem>
            Personal information (name, photo, ID, etc.) is used strictly for
            identity verification.
          </CustomListItem>
          <CustomListItem>
            We do not sell, trade, or publicly display any part of your personal
            data.
          </CustomListItem>
          <CustomListItem>
            Only your public-facing username and content will be visible to
            users.
          </CustomListItem>
          <CustomListItem>
            You may request to delete your account and data at any time, subject
            to identity confirmation.
          </CustomListItem>
          <CustomListItem>
            We maintain strict security protocols to store your data securely
            and prevent unauthorized access.
          </CustomListItem>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <label
            htmlFor="privacy-agree"
            className="flex items-center gap-3 text-sm text-gray-800 cursor-pointer"
          >
            <Checkbox
              id="privacy-agree"
              checked={agreed}
              onCheckedChange={(checked: boolean) => setAgreed(checked)}
            />
            <span>
              I acknowledge the data handling policy and agree to participate in
              the platform with my privacy protected.
            </span>
          </label>
        </div>

        <Button
          onClick={handleNext}
          disabled={!agreed}
          className="w-full font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Accept Privacy Policy & Continue
        </Button>
      </main>
    </div>
  );
}

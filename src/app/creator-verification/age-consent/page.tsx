"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

const Stepper = () => {
  const steps = ["KYC Policy", "Age Consent", "Privacy", "Agreement"];
  const activeStep = 2;

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

const ConsentItem = ({
  id,
  onCheckedChange,
  children,
}: {
  id: string;
  onCheckedChange: (id: string, checked: boolean) => void;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-4">
    <Checkbox
      id={id}
      onCheckedChange={(checked: boolean) => onCheckedChange(id, checked)}
      className="mt-1"
    />
    <label htmlFor={id} className="text-sm text-gray-700 leading-normal">
      {children}
    </label>
  </div>
);

export default function AgeConsent() {
  const router = useRouter();
  const consentItems = [
    "is18OrOlder",
    "canPostAdultContent",
    "understandsAdultPlatform",
    "noIllegalContent",
    "acknowledgesModeration",
  ];

  // State to track all checkboxes
  const [checkedState, setCheckedState] = useState(
    consentItems.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedState((prev) => ({ ...prev, [id]: checked }));
  };

  // Memoize the calculation to prevent re-running on every render
  const allConsentsGiven = useMemo(
    () => Object.values(checkedState).every(Boolean),
    [checkedState]
  );

  const handleNext = () => {
    if (allConsentsGiven) {
      console.log("All consents given, proceeding to next step.");
      router.push("/creator-verification/privacy");
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
            <ShieldCheck className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold mb-2">
            &quot;Rated 18&quot; Consent Form
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            This platform is exclusively for adults. By signing up as a creator,
            you confirm the following:
          </p>
        </div>

        <div className="space-y-6 my-8 text-left">
          <ConsentItem id="is18OrOlder" onCheckedChange={handleCheckboxChange}>
            You are 18 years of age or older.
          </ConsentItem>
          <ConsentItem
            id="canPostAdultContent"
            onCheckedChange={handleCheckboxChange}
          >
            You are consenting to post or share adult-rated or suggestive
            content.
          </ConsentItem>
          <ConsentItem
            id="understandsAdultPlatform"
            onCheckedChange={handleCheckboxChange}
          >
            You understand and accept that Hooks is an adult content platform,
            and your content will be available only to age-verified users.
          </ConsentItem>
          <ConsentItem
            id="noIllegalContent"
            onCheckedChange={handleCheckboxChange}
          >
            You agree not to post illegal, abusive, or non-consensual content.
          </ConsentItem>
          <ConsentItem
            id="acknowledgesModeration"
            onCheckedChange={handleCheckboxChange}
          >
            You acknowledge that Hooks has the right to moderate or remove
            content that violates its policies.
          </ConsentItem>
        </div>

        <div className="flex items-center gap-3 bg-red-500/10 text-red-700 p-4 rounded-lg mb-8 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>
            <strong>
              By clicking next, you certify that you are legally eligible and
              consenting to participate as a creator on an 18+ platform.
            </strong>
          </p>
        </div>

        <Button
          onClick={handleNext}
          disabled={!allConsentsGiven}
          className="w-full font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          I Certify & Continue
        </Button>
      </main>
    </div>
  );
}

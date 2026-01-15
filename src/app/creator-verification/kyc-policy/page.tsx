"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Camera, FileUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Sub-Components for organization ---

const Stepper = () => {
  const steps = ["KYC Policy", "Age Consent", "Privacy", "Agreement"];
  const activeStep = 1;

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

const CustomListItem = ({
  children,
  color = "bg-pink-400",
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <div className="flex items-start gap-3">
    <div
      className={`w-1.5 h-1.5 rounded-full ${color} mt-2 flex-shrink-0`}
    ></div>
    <p>{children}</p>
  </div>
);

export default function KYCPolicy() {
  const router = useRouter();
  const [livePhoto, setLivePhoto] = useState<File | null>(null);
  const [idDocument, setIdDocument] = useState<File | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: "photo" | "doc"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (fileType === "photo") setLivePhoto(file);
      if (fileType === "doc") setIdDocument(file);
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
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-bold mb-6">KYC Onboarding Policy</h2>
        </div>

        <div className="space-y-8 text-left">
          <section>
            <h3 className="font-bold mb-2">Purpose:</h3>
            <p className="text-gray-600">
              To verify the identity of every creator, protect the integrity of
              our community, and comply with age-restriction standards, we
              require creators to complete a KYC (Know Your Customer) process.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-4">
              What you&apos;ll provide during onboarding:
            </h3>
            <div className="space-y-2">
              <CustomListItem>
                A clear live photo (selfie) of yourself
              </CustomListItem>
              <CustomListItem>
                A valid government-issued identity document
              </CustomListItem>
              <CustomListItem>
                Consent for face matching to confirm identity
              </CustomListItem>
              <CustomListItem>
                Your preferred display username (this will be public)
              </CustomListItem>
            </div>
          </section>

          <section>
            <h3 className="font-bold mb-4">Important Notes:</h3>
            <div className="space-y-2 text-sm">
              <CustomListItem color="bg-gray-400">
                Your full name, ID number, and face data are only used for
                verification and will not be shared publicly.
              </CustomListItem>
              <CustomListItem color="bg-gray-400">
                Only your username, profile photo, and content will be visible
                to fans.
              </CustomListItem>
              <CustomListItem color="bg-gray-400">
                All data submitted is stored securely and in compliance with
                privacy laws.
              </CustomListItem>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center text-center">
              {livePhoto ? (
                <div className="flex flex-col items-center text-green-600">
                  <CheckCircle className="h-10 w-10 mb-2" />
                  <p className="font-semibold text-sm mb-3">Photo Added</p>
                  <p className="text-xs text-gray-500 break-all">
                    {livePhoto.name}
                  </p>
                </div>
              ) : (
                <>
                  <Camera className="h-10 w-10 mb-2 text-gray-500" />
                  <p className="font-semibold text-sm mb-3">
                    Live Photo Required
                  </p>
                  <Button
                    onClick={() => photoInputRef.current?.click()}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold"
                  >
                    Take Photo
                  </Button>
                </>
              )}
              <input
                type="file"
                ref={photoInputRef}
                onChange={(e) => handleFileChange(e, "photo")}
                accept="image/*"
                capture="user"
                className="hidden"
              />
            </div>
            <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center text-center">
              {idDocument ? (
                <div className="flex flex-col items-center text-green-600">
                  <CheckCircle className="h-10 w-10 mb-2" />
                  <p className="font-semibold text-sm mb-3">
                    Document Uploaded
                  </p>
                  <p className="text-xs text-gray-500 break-all">
                    {idDocument.name}
                  </p>
                </div>
              ) : (
                <>
                  <FileUp className="h-10 w-10 mb-2 text-gray-500" />
                  <p className="font-semibold text-sm mb-3">
                    ID Document Required
                  </p>
                  <Button
                    onClick={() => docInputRef.current?.click()}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold"
                  >
                    Upload Document
                  </Button>
                </>
              )}
              <input
                type="file"
                ref={docInputRef}
                onChange={(e) => handleFileChange(e, "doc")}
                accept="image/*,.pdf"
                className="hidden"
              />
            </div>
          </section>

          <Button
            onClick={() => router.push("/creator-verification/age-consent")}
            disabled={!livePhoto || !idDocument}
            className="w-full font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Requirements Above
          </Button>
        </div>
      </main>
    </div>
  );
}

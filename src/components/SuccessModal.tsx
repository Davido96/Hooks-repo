"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onComplete: () => void;
  role: "Creator" | "Fan";
}

export default function SuccessModal({
  isOpen,
  onComplete,
  role,
}: SuccessModalProps) {
  if (!isOpen) return null;

  const successMessage =
    role === "Creator"
      ? "Your creator profile has been successfully created."
      : "Your fan profile has been successfully created.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white text-black rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Setup Complete!</h2>
        <p className="text-gray-600 mb-6">{successMessage}</p>
        <Button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold"
        >
          Go to Your Profile
        </Button>
      </div>
    </div>
  );
}

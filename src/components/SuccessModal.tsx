import React from "react";
import { Check, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SuccessModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onComplete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-sm md:max-w-md">
        <CardContent className="p-6 md:p-8 text-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6 justify-center">
            <img
              src="/logo.png"
              alt="Hooks Logo"
              className="w-6 h-6 md:w-8 md:h-8 object-contain"
              onError={(e) => {
                // Fallback to Crown icon if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <Crown className="text-yellow-300 w-6 h-6 md:w-8 md:h-8 hidden" />
            <span className="text-xl md:text-2xl font-bold text-gray-800">
              Hooks
            </span>
          </div>

          <div className="mb-6">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-pink-500" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Account Created Successfully
            </h2>
            <p className="text-gray-600">
              Your profile has been created successfully. Click the button below
              to proceed
            </p>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all transform hover:scale-105"
          >
            Done
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessModal;

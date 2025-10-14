import React, { useState } from "react";
import { X, Check, Crown, Heart } from "lucide-react";

interface FeatureItemProps {
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <div className="flex items-center gap-3 mb-3">
    <Check size={20} className="text-green-500 flex-shrink-0" />
    <span className="text-gray-700">{text}</span>
  </div>
);

interface PricingCardProps {
  duration: string;
  keys: string;
  price: string;
  monthlyPrice?: string;
  badge?: string;
  badgeColor?: string;
  savePercent?: string;
  isHighlighted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  duration,
  keys,
  price,
  monthlyPrice,
  badge,
  badgeColor,
  savePercent,
  isHighlighted = false,
}) => (
  <div
    className={`relative border-2 rounded-2xl p-5 ${
      isHighlighted
        ? badgeColor === "yellow"
          ? "border-yellow-400 bg-yellow-50"
          : "border-green-400 bg-green-50"
        : "border-gray-200 bg-white"
    }`}
  >
    {badge && (
      <div
        className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold ${
          badgeColor === "yellow"
            ? "bg-yellow-400 text-gray-900"
            : "bg-green-500 text-white"
        }`}
      >
        {badge}
      </div>
    )}
    <div className="flex justify-between items-start mb-1">
      <div>
        <div className="font-bold text-lg mb-1">{duration}</div>
        <div className="text-sm text-gray-600">{keys}</div>
        {monthlyPrice && (
          <div className="text-xs text-gray-500 mt-1">{monthlyPrice}</div>
        )}
      </div>
      <div className="text-right">
        <div className="font-bold text-xl">{price}</div>
        {savePercent && (
          <div className="text-sm text-green-600 font-semibold mt-1">
            {savePercent}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function HooksGoldModal() {
  // Start closed by default
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
            <Heart size={40} className="text-pink-500 fill-pink-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-4 leading-tight">
          You have reached your daily like limit
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Upgrade to Hooks Gold to enjoy unlimited likes and get more matches!
        </p>

        {/* Features */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-4">With Hooks Gold, you get:</h3>
          <FeatureItem text="Unlimited likes per day" />
          <FeatureItem text="See who likes you" />
          <FeatureItem text="Advanced filters" />
          <FeatureItem text="Priority in recommendations" />
          <FeatureItem text="Boost your profile" />
        </div>

        {/* Pricing plans */}
        <div className="space-y-4 mb-8">
          <PricingCard duration="1 Month" keys="4 keys" price="₦4,000.00" />

          <PricingCard
            duration="3 Months"
            keys="9.3 keys"
            price="₦9,300.00"
            badge="Most Popular"
            badgeColor="yellow"
            savePercent="Save 22%"
            isHighlighted={true}
          />

          <PricingCard
            duration="12 Months"
            keys="17.3 keys"
            price="₦17,300.00"
            monthlyPrice="₦1,441.66/month"
            badge="Best Value"
            badgeColor="green"
            savePercent="Save 64%"
            isHighlighted={true}
          />
        </div>

        {/* Upgrade button */}
        <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 transition-colors">
          <Crown size={24} />
          Upgrade to Hooks Gold
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { X, Check, Crown } from "lucide-react";

interface FeatureItemProps {
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <div className="flex items-center gap-2 mb-2">
    <Check size={18} className="text-green-500 flex-shrink-0" />
    <span className="text-gray-700 text-sm">{text}</span>
  </div>
);

interface PricingCardProps {
  duration: string;
  monthlyPrice: string;
  keys: string;
  totalPrice: string;
  badge?: string;
  savePercent?: string;
  isHighlighted?: boolean;
  hasCheckmark?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  duration,
  monthlyPrice,
  keys,
  totalPrice,
  badge,
  savePercent,
  isHighlighted = false,
  hasCheckmark = false,
}) => (
  <div
    className={`relative border-2 rounded-2xl p-5 ${
      isHighlighted
        ? "border-yellow-400 bg-yellow-50"
        : "border-gray-200 bg-white"
    }`}
  >
    {badge && (
      <div className="absolute -top-3 left-6 bg-yellow-400 px-3 py-1 rounded-full text-xs font-bold text-gray-900">
        {badge}
      </div>
    )}
    <div className="flex justify-between items-start">
      <div>
        <div className="font-bold text-lg mb-1">{duration}</div>
        <div className="text-sm text-gray-600 mb-1">{monthlyPrice}</div>
        <div className="text-xs text-yellow-600 font-semibold">{keys}</div>
        {savePercent && (
          <div className="text-xs text-green-600 font-semibold mt-1">
            {savePercent}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="font-bold text-2xl">{totalPrice}</div>
        {hasCheckmark && (
          <Check size={24} className="text-green-600" strokeWidth={3} />
        )}
      </div>
    </div>
  </div>
);

interface SimplePricingCardProps {
  duration: string;
  monthlyPrice: string;
  keys: string;
  totalPrice: string;
  badge?: string;
  savePercent?: string;
}

const SimplePricingCard: React.FC<SimplePricingCardProps> = ({
  duration,
  monthlyPrice,
  keys,
  totalPrice,
  badge,
  savePercent,
}) => (
  <div className="relative border-2 border-gray-200 rounded-2xl p-5 bg-white">
    {badge && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 px-3 py-1 rounded-full text-xs font-bold text-white">
        {badge}
      </div>
    )}
    <div className="flex justify-between items-start">
      <div>
        <div className="font-bold text-lg mb-1">{duration}</div>
        <div className="text-sm text-gray-600 mb-1">{monthlyPrice}</div>
        <div className="text-xs text-yellow-600 font-semibold">{keys}</div>
        {savePercent && (
          <div className="text-xs text-green-600 font-semibold mt-1">
            {savePercent}
          </div>
        )}
      </div>
      <div className="font-bold text-2xl">{totalPrice}</div>
    </div>
  </div>
);

interface HooksPerfectMatchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function HooksPerfectMatchModal({
  isOpen = false,
  onClose = () => {},
}: HooksPerfectMatchModalProps = {}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
           onClick={onClose}
           className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
           aria-label="Close modal"
         >
           <X size={24} />
         </button>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center">
            <Crown
              size={48}
              className="text-yellow-400 fill-yellow-400"
              strokeWidth={2}
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-4 leading-tight">
          Find your perfect match faster
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Gold members can be more detailed about who they are looking for
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-center text-gray-800">
            Become a Gold member. Like unlimited profiles, see who likes you,
            and more!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-6">
          <FeatureItem text="Like unlimited profiles" />
          <FeatureItem text="See who likes you" />
          <FeatureItem text="Advanced filters" />
          <FeatureItem text="Priority matching" />
          <FeatureItem text="No ads" />
          <FeatureItem text="Read receipts" />
        </div>

        <div className="space-y-4 mb-6">
          <PricingCard
            duration="1 Month"
            monthlyPrice="₦4,000.00/month"
            keys="4 Keys"
            totalPrice="₦4,000.00"
          />

          <PricingCard
            duration="3 Months"
            monthlyPrice="₦3,100.00/month"
            keys="9.3 Keys"
            totalPrice="₦9,300.00"
            badge="Most Popular"
            savePercent="Save 22%"
            isHighlighted={true}
            hasCheckmark={true}
          />

          <SimplePricingCard
            duration="12 Months"
            monthlyPrice="₦1,441.66/month"
            keys="17.3 Keys"
            totalPrice="₦17,300.00"
            badge="Best Value"
            savePercent="Save 64%"
          />
        </div>

        <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 transition-colors">
          <Crown size={24} />
          Upgrade to Hooks Gold
        </button>
      </div>
    </div>
  );
}

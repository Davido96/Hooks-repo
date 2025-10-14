"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Key, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SendKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
  creatorAvatar: string;
  currentBalance: number;
}

const SendKeysModal: React.FC<SendKeysModalProps> = ({
  isOpen,
  onClose,
  creatorName,
  creatorAvatar,
  currentBalance,
}) => {
  const [selectedMonths, setSelectedMonths] = useState<number>(1);
  const [subscriptionAmount, setSubscriptionAmount] = useState<string>("10");

  if (!isOpen) return null;

  const nairaPerKey = 1000;
  const totalKeys = parseInt(subscriptionAmount || "0");
  const totalNaira = totalKeys * nairaPerKey;

  const handleMonthSelect = (months: number) => setSelectedMonths(months);

  const handleSend = () => {
    console.log(
      `Sending ${subscriptionAmount} Keys to ${creatorName} for ${selectedMonths} months.`
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 z-0 backdrop-blur-sm bg-transparent"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* MODAL CARD */}
      <div
        className="relative z-10 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-xl w-full shadow-lg relative p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Key className="text-yellow-500" size={20} />
              <h2 className="text-xl font-semibold">Send Keys</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Creator Info */}
          <div className="text-center mb-6">
            <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-pink-500">
              <Image
                src={creatorAvatar}
                alt={creatorName}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              Subscribe to {creatorName}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Your current balance:{" "}
              <span className="font-semibold">
                {currentBalance.toLocaleString()}
              </span>{" "}
              <Key size={14} className="inline-block text-yellow-500 -mt-0.5" />
            </p>
          </div>

          {/* Subscription Months */}
          <div className="mb-6">
            <p className="font-semibold text-gray-700 mb-2">Months</p>
            <div className="grid grid-cols-4 gap-3">
              {[1, 3, 6, 12].map((months) => (
                <button
                  key={months}
                  onClick={() => handleMonthSelect(months)}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                    selectedMonths === months
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {months} <Key size={14} className="ml-1 text-yellow-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Subscription Amount */}
          <div className="mb-6">
            <p className="font-semibold text-gray-700 mb-2">
              Subscription Amount
            </p>
            <Input
              type="text"
              value={`${subscriptionAmount} Keys`}
              onChange={(e) =>
                setSubscriptionAmount(e.target.value.replace("Keys", ""))
              }
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-base focus:border-pink-500 focus:ring-pink-500"
              readOnly
            />
          </div>

          {/* Subscription Fee Info */}
          <div className="flex items-start bg-blue-50 text-blue-700 p-4 rounded-lg mb-6 text-sm">
            <Info size={18} className="mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <span className="font-semibold">Subscription Fee:</span> Just a
              heads up, you are about to subscribe which will give you direct
              message access and exclusive content. Each Key costs 1000 naira
              and will be deducted directly from your wallet.
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold text-gray-800">Total</span>
            <span className="text-lg font-bold text-gray-800">
              {totalKeys}{" "}
              <Key size={18} className="inline-block text-yellow-500 -mt-0.5" />{" "}
              (₦{totalNaira.toLocaleString()})
            </span>
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 rounded-lg text-lg hover:opacity-90 transition-opacity"
          >
            Send
          </Button>
          <p className="text-center text-gray-500 text-xs mt-3">
            Keys are sent instantly and cannot be undone
          </p>
        </div>
      </div>
    </div>
  );
};

export default SendKeysModal;

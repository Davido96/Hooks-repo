"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ArrowUp, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SendKeysTipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SendKeysTipModal({
  isOpen,
  onClose,
}: SendKeysTipModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5);
  const [customAmount, setCustomAmount] = useState<string>("5");
  const [message, setMessage] = useState<string>("");

  if (!isOpen) return null;

  const quickAmounts = [5, 10, 15, 25];
  const currentBalance = 253584;
  const nairaPerKey = 1000;

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleQuickAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(String(amount));
  };

  const totalKeys = parseInt(customAmount || "0", 10);
  const totalNaira = totalKeys * nairaPerKey;

  const handleSendTip = () => {
    console.log("Sending tip:", {
      to: "Anita",
      keys: totalKeys,
      message,
    });
    onClose();
  };

  return (
    // Fixed: Removed bg-black bg-opacity-50 from the class list
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white text-black rounded-xl w-full max-w-md shadow-lg relative p-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="block h-5 w-5 rounded-full border-2 border-yellow-400 mr-2" />
            <h2 className="text-xl font-semibold">Send Keys Tip</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="bg-pink-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <ArrowUp className="text-pink-500" size={32} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Sending tip to Anita</h3>
          <p className="text-gray-600 text-sm flex items-center justify-center">
            Your current balance: {currentBalance.toLocaleString()}{" "}
            <Key size={16} className="ml-1 text-yellow-500" />
          </p>
        </div>

        {/* Quick Amounts */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Quick Amounts</h4>
          <div className="flex justify-center gap-3">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                className={`flex items-center justify-center h-12 w-16 rounded-lg border-2 text-base font-medium transition-all ${
                  selectedAmount === amount
                    ? "border-pink-500 bg-pink-50 text-pink-700"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
                onClick={() => handleQuickAmountClick(amount)}
              >
                {amount} <Key size={16} className="ml-1 text-yellow-500" />
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Custom Amount</h4>
          <div className="relative">
            <Input
              type="number"
              placeholder="Enter amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="w-full p-3 pr-10 border-gray-300 rounded-lg bg-gray-50 text-base"
            />
            <Key
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500"
            />
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-700 mb-3">
            Message (Optional)
          </h4>
          <textarea
            placeholder="Add a personal message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border-gray-300 rounded-lg bg-gray-50 text-base min-h-[80px]"
          ></textarea>
        </div>

        {/* Total and Send Button */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-800">Total</span>
          <span className="text-lg font-bold text-gray-800 flex items-center">
            {totalKeys} <Key size={20} className="mx-1 text-yellow-500" /> (₦
            {totalNaira.toLocaleString()})
          </span>
        </div>

        <Button
          onClick={handleSendTip}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 h-auto rounded-lg text-base shadow-lg hover:opacity-90"
          disabled={totalKeys <= 0 || totalKeys > currentBalance}
        >
          Send
        </Button>
        <p className="text-center text-xs text-gray-500 mt-2">
          Tips are sent instantly and cannot be undone
        </p>
      </div>
    </div>
  );
}

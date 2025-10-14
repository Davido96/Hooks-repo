"use client";

import React, { useState } from "react";
import { X, Wallet, TrendingUp, Lock, Key, Info, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface WalletManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "buy" | "withdraw";
}

function WithdrawSuccessToast({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center animate-fade-in pointer-events-none">
      <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-pink-200/20 p-4 text-white shadow-2xl backdrop-blur-lg">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pink-500">
          <Banknote className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold">Request successful</h3>
          <p className="text-sm text-white/80">
            You will receive your funds within 24 hours of request.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WalletManagementModal({
  isOpen,
  onClose,
  initialView = "buy",
}: WalletManagementModalProps) {
  const [currentView, setCurrentView] = useState<"buy" | "withdraw">(
    initialView
  );
  const [selectedBuyPackage, setSelectedBuyPackage] = useState<number | null>(
    5
  );
  const [customBuyAmount, setCustomBuyAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);

  if (!isOpen && !showWithdrawSuccess) return null;

  const availableBalance = 1552;
  const pendingWithdrawals = 10500;
  const minWithdrawal = 100;
  const nairaPerKey = 1000;

  const keyPackages = [
    { keys: 1, price: 1000, saved: 0, label: "1 Keys" },
    { keys: 5, price: 4500, saved: 500, label: "5 Keys", popular: true },
    { keys: 10, price: 8500, saved: 1500, label: "10 Keys" },
    { keys: 25, price: 20000, saved: 5000, label: "25 Keys" },
  ];
  const quickWithdrawAmounts = [100, 500, 1000, 2500];

  const getPurchaseButtonText = () => {
    if (customBuyAmount) {
      const keys = parseInt(customBuyAmount, 10);
      if (!isNaN(keys) && keys > 0)
        return `Purchase ${keys} Keys for ₦${(
          keys * nairaPerKey
        ).toLocaleString()}`;
    }
    const selectedPackage = keyPackages.find(
      (p) => p.keys === selectedBuyPackage
    );
    if (selectedPackage)
      return `Purchase ${
        selectedPackage.keys
      } Keys for ₦${selectedPackage.price.toLocaleString()}`;
    return "Select a Package to Purchase";
  };

  const handleBuyKeys = () => {
    console.log("Buying Keys:", selectedBuyPackage, customBuyAmount);
    onClose();
  };

  const handleRequestWithdrawal = () => {
    console.log("Requesting Withdrawal:", {
      withdrawAmount,
      bankName,
      accountNumber,
      accountName,
      additionalNotes,
    });
    onClose();
    setShowWithdrawSuccess(true);
    setTimeout(() => setShowWithdrawSuccess(false), 3000);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed c-profile inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            className="bg-white text-black w-full max-w-4xl shadow-lg relative p-6 max-h-[90vh] overflow-y-auto animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Wallet Management</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Available Balance</span>
                  <Wallet size={20} />
                </div>
                <p className="text-2xl font-bold">
                  {availableBalance}{" "}
                  <Key size={18} className="inline-block -mt-1" />
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-400 to-yellow-500 text-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    Pending Withdrawals
                  </span>
                  <TrendingUp size={20} />
                </div>
                <p className="text-2xl font-bold">
                  {pendingWithdrawals}{" "}
                  <Lock size={18} className="inline-block -mt-1" />
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Min. Withdrawal</span>
                  <Lock size={20} />
                </div>
                <p className="text-2xl font-bold">
                  {minWithdrawal}{" "}
                  <Key size={18} className="inline-block -mt-1" />
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
              <Button
                onClick={() => setCurrentView("buy")}
                className={`font-semibold py-2 h-auto text-sm ${
                  currentView === "buy"
                    ? "bg-white text-gray-800 shadow hover:bg-white"
                    : "bg-transparent text-gray-500 hover:bg-white/50"
                }`}
              >
                <Key size={16} className="mr-2" /> Buy Keys
              </Button>
              <Button
                onClick={() => setCurrentView("withdraw")}
                className={`font-semibold py-2 h-auto text-sm ${
                  currentView === "withdraw"
                    ? "bg-white text-gray-800 shadow hover:bg-white"
                    : "bg-transparent text-gray-500 hover:bg-white/50"
                }`}
              >
                <Banknote size={16} className="mr-2" /> Withdraw Earnings
              </Button>
            </div>

            {currentView === "buy" && (
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-4">Choose a Package</h3>
                <div className="space-y-3 mb-6">
                  {keyPackages.map((pkg) => (
                    <div
                      key={pkg.keys}
                      onClick={() => {
                        setSelectedBuyPackage(pkg.keys);
                        setCustomBuyAmount("");
                      }}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedBuyPackage === pkg.keys
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-800 mr-2">
                          {pkg.label}
                        </span>
                        {pkg.popular && (
                          <Badge className="bg-green-100 text-green-700 px-2 py-0.5 text-xs">
                            Most Popular
                          </Badge>
                        )}
                        {pkg.saved > 0 && (
                          <span className="ml-2 text-sm text-green-600 font-medium">
                            Save ₦{pkg.saved.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">
                          ₦{pkg.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₦{nairaPerKey.toLocaleString()}/Key
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2">Custom Amount</h3>
                <Input
                  type="number"
                  placeholder="Enter amount..."
                  value={customBuyAmount}
                  onChange={(e) => {
                    setCustomBuyAmount(e.target.value);
                    setSelectedBuyPackage(null);
                  }}
                  className="w-full p-3 border-gray-300 rounded-lg bg-gray-50 text-base mb-6"
                />
                <Button
                  onClick={handleBuyKeys}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 h-auto rounded-lg text-base hover:opacity-90"
                  disabled={Boolean(
                    (!selectedBuyPackage && !customBuyAmount) ||
                      (customBuyAmount && parseInt(customBuyAmount, 10) <= 0)
                  )}
                >
                  {getPurchaseButtonText()}
                </Button>
              </div>
            )}
            {currentView === "withdraw" && (
              <div className="text-left">
                <div className="flex items-start bg-blue-50 text-blue-800 p-4 rounded-lg mb-6 text-sm">
                  <Info size={18} className="mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Withdrawal Fee:</span> 10%
                    fee applies to all withdrawals. You will receive your funds
                    within 24 hours of request.
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-4">Quick Amounts</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {quickWithdrawAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setWithdrawAmount(String(amount))}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        parseInt(withdrawAmount || "0", 10) === amount
                          ? "border-red-500 bg-red-50 text-red-600"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {amount}{" "}
                      <Key size={14} className="inline-block -mt-0.5" />
                    </button>
                  ))}
                </div>
                <h3 className="text-lg font-semibold">Amount (Keys)*</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Minimum {minWithdrawal} Keys
                </p>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full p-3 border-gray-300 rounded-lg bg-gray-50 text-base mb-6"
                />
                <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="bankName">Bank Name*</label>
                    <Input
                      id="bankName"
                      type="text"
                      placeholder="e.g., First Bank Nigeria"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full p-3 border-gray-300 rounded-lg bg-gray-50 text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="accountNumber">Account Number*</label>
                    <Input
                      id="accountNumber"
                      type="text"
                      placeholder="10-digit account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full p-3 border-gray-300 rounded-lg bg-gray-50 text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="accountName">Account Name*</label>
                    <Input
                      id="accountName"
                      type="text"
                      placeholder="Full name on bank account"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="w-full p-3 border-gray-300 rounded-lg bg-gray-50 text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="notes">Additional Notes (Optional)</label>
                    <textarea
                      id="notes"
                      placeholder="Any additional information..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="w-full p-3 border-gray-300 rounded-lg bg-gray-50 text-base min-h-[100px]"
                    ></textarea>
                  </div>
                </div>
                <Button
                  onClick={handleRequestWithdrawal}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 h-auto rounded-lg text-base hover:opacity-90"
                  disabled={Boolean(
                    parseInt(withdrawAmount || "0", 10) < minWithdrawal ||
                      !bankName ||
                      !accountNumber ||
                      !accountName
                  )}
                >
                  Request withdrawal
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <WithdrawSuccessToast isOpen={showWithdrawSuccess} />
    </>
  );
}

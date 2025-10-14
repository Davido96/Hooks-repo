"use client";

import Image from "next/image";
import { TrendingUp, Lock, Wallet, Banknote } from "lucide-react";
import { useState } from "react";
import { toNaira } from "@/utils/currencyConverter";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { Textarea } from "../ui/textarea";

interface Props {
  onClose: () => void;
}

function WalletStats() {
  const data = [
    {
      title: "Available Balanace",
      number: 1552,
      icon: "🔑",
      image: <Wallet color="#FFFFFF" />,
      style: {
        background: "linear-gradient(135deg, #FF6B47 0%, #EC4899 100%)",
      },
    },
    {
      title: "Pending Withdrawals",
      number: 10500,
      icon: "🔒",
      image: <TrendingUp color="#FFFFFF" />,
      style: {
        background: "linear-gradient(135deg, #FACC15 0%, #F97316 100%)",
      },
    },
    {
      title: "Min. Withdrawal",
      number: 50,
      icon: "🔑",
      image: <Lock color="#FFFFFF" />,
      style: {
        background: "linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)",
      },
    },
  ];

  return (
    <div className="grid mt-10 px-6 grid-cols-3 gap-3">
      {data.map((dataItem, index) => (
        <div
          className="px-7 py-4 text-white rounded-[8px]"
          style={dataItem.style}
          key={index}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm leading-[24px] text-[#FDEEE6]">
              {dataItem.title}
            </h3>
            <div>{dataItem.image}</div>
          </div>
          <h1 className="leading-[36px] text-2xl mt-2">
            {toNaira(dataItem.number)}
            {dataItem.icon}
          </h1>
        </div>
      ))}
    </div>
  );
}

function BuyComponent({ onClick }: { onClick: () => void }) {
  const [selected, setSelected] = useState<number>(5);
  const data: { keys: number; amt: number; isMostPopular?: boolean }[] = [
    {
      keys: 1,
      amt: 1000,
    },
    {
      keys: 5,
      amt: 4500,
      isMostPopular: true,
    },
    {
      keys: 10,
      amt: 8500,
    },
    {
      keys: 25,
      amt: 20000,
    },
  ];
  const selectedIndex = data.findIndex((value) => value.keys === selected);
  const [customAmt, setCustomAmt] = useState("");

  const validateButtonClick = () => {
    if (customAmt) {
      if (!/^\d+$/.test(customAmt)) {
        toast.error("Kindly enter a valid amount");
        return;
      }
    }
    onClick();
  };

  return (
    <div className="px-6 mt-8">
      <div className="border border-[#E2E8F0] p-6 rounded-[8px]">
        <h2 className="text-xl mb-6 font-bold leading-[28px]">
          Choose a Package
        </h2>
        <div className="flex flex-col gap-y-4">
          {data.map((listing) => (
            <div
              className={`cursor-pointer py-6 px-4 rounded-[8px] ${
                listing.keys === selected
                  ? "outline-2 outline-[#FF6B47]"
                  : "border outline-none border-[#E2E8F0]"
              }`}
              key={listing.keys}
              onClick={() => setSelected(listing.keys)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold leading-[24px]">
                    {listing.keys} Keys
                  </h3>
                  {listing.isMostPopular && (
                    <div className="bg-[#FF6B47] text-xs rounded-full text-white px-2 py-1.5">
                      Most Popular
                    </div>
                  )}
                </div>
                <p className="font-bold">{toNaira(listing.amt)}</p>
              </div>
              <div className="text-sm text-[#4B5563] flex items-center justify-between mt-1 leading-[20px]">
                <div className="flex items-center gap-2">
                  <p>{toNaira(listing.amt)}</p>
                  {listing.keys * 1000 > listing.amt && (
                    <p className="text-[#16A34A]">
                      Save {toNaira(listing.keys * 1000 - listing.amt)}
                    </p>
                  )}
                </div>
                <p>NGN/Key</p>
              </div>
            </div>
          ))}
        </div>
        <div className="my-6">
          <label htmlFor="cus_amt">Custom Amount</label>
          <Input
            name="cus_amt"
            type="number"
            value={customAmt}
            className="block mt-2"
            placeholder="Enter amount"
            onChange={(e) => setCustomAmt(e.target.value)}
          />
        </div>
        <button
          onClick={validateButtonClick}
          className="block w-full text-center bg-gradient-to-r from-[#FF6B47] to-[#EC4899] text-white py-3 rounded-[6px] cursor-pointer"
        >
          Purchase {data[selectedIndex].keys} for{" "}
          {toNaira(data[selectedIndex].amt)}
        </button>
      </div>
    </div>
  );
}

function WithdrawSuccessToast() {
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

function WithdrawComponent({ onClick }: { onClick: () => void }) {
  const quickAmts = [500, 100, 1000, 2500];
  const [keyAmt, setKeyAmt] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleReqWithdraw = () => {
    if (!keyAmt || !bankName || !accountName || !accountNumber) {
      toast.error("Kindly enter all the required fields");
      return;
    }
    if (isNaN(Number(keyAmt))) {
      toast.error("Kindly enter a valid number for the amount keys");
      return;
    }
    if (Number(keyAmt) < 100) {
      toast.error("The amount of keys cannot be less than 100");
      return;
    }
    if (isNaN(Number(accountNumber))) {
      toast.error("Kindly enter a valid account number");
      return;
    }
    if (accountNumber.length !== 10) {
      const res =
        accountNumber.length < 10
          ? "Account number must be atleast 10 digits"
          : "Account number cannot have more than 10 digits";
      toast.error(res);
    }
    onClick();
  };

  return (
    <div className="px-6 mt-8">
      <div className="border border-[#E2E8F0] p-6 rounded-[8px]">
        <div className="w-[448px] mb-8 mx-auto">
          {/* header */}
          <ul className="list-disc py-4 px-7 bg-[#EFF6FF] rounded-[8px] border border-[#BFDBFE]">
            <li className="text-[#1E40AF] text-sm">
              <strong>Withdrawal Fee</strong>: 10% fee applies to all
              withdrawals. You will receive your funds within 24 hours of
              request.
            </li>
          </ul>

          {/* quick amounts */}
          <div className="text-sm leading-[20px] mt-6">
            <p>Quick Amounts</p>
            <div className="grid grid-cols-2 mt-3 sm:grid-cols-4 gap-x-2">
              {quickAmts.map((amt, i) => (
                <div
                  key={i}
                  onClick={() => setKeyAmt(amt.toString())}
                  className="rounded-[6px] cursor-pointer border border-[#E2E8F0] py-1.5"
                >
                  <h5 className="flex items-center justify-center gap-x-1">
                    <strong className="text-xs leading-[20px]">{amt}</strong>
                    <div className="size-3 rounded bg-[#FACC15]" />
                  </h5>
                  <p className="text-center text-[10.8px] text-[#6B7280] font-medium">
                    {toNaira(amt * 1000)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Amount (Keys) */}
          <div className="mt-7 text-sm">
            <p>Amount (Keys)*</p>
            <div className="flex flex-col gap-y-5 mt-1">
              <div className="flex flex-col gap-y-1">
                <label
                  className="text-[#4B5563] leading-[20px]"
                  htmlFor="keyAmt"
                >
                  Minimum 100 Keys
                </label>
                <Input
                  value={keyAmt}
                  name="keyAmt"
                  autoComplete="off"
                  placeholder="Enter amount"
                  onChange={(e) => setKeyAmt(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="leading-[14.77px]" htmlFor="bankName">
                  Bank Name*
                </label>
                <Input
                  value={bankName}
                  name="bankName"
                  autoComplete="off"
                  placeholder="e.g., First Bank Nigeria"
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="leading-[14.77px]" htmlFor="accountNumber">
                  Account Number*
                </label>
                <Input
                  value={accountNumber}
                  name="accountNumber"
                  autoComplete="off"
                  placeholder="10-digit account number"
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="leading-[14.77px]" htmlFor="accountName">
                  Account Name*
                </label>
                <Input
                  value={accountName}
                  name="accountName"
                  autoComplete="off"
                  placeholder="Full name on bank account"
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="leading-[14.77px]" htmlFor="additionalNotes">
                  Additional Notes (Optional)
                </label>
                <Textarea
                  value={additionalNotes}
                  className="resize-none h-20"
                  name="additionalNotes"
                  autoComplete="off"
                  placeholder="Full name on bank account"
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleReqWithdraw}
          className="block w-full text-center bg-gradient-to-r from-[#FF6B47] to-[#EC4899] text-white py-3 rounded-[6px] cursor-pointer"
        >
          Request Withdrawal
        </button>
      </div>
    </div>
  );
}

export default function WalletCreator({ onClose }: Props) {
  const [action, setAction] = useState<"buy" | "withdraw">("buy");
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white pb-8 w-4xl overflow-y-auto h-[90vh]">
        <div className="py-4 border-b border-[#F3F4F6] px-6 flex items-center justify-between">
          <h2 className="font-bold text-xl">Wallet Management</h2>
          <Image
            onClick={onClose}
            src={"/cancelBlack.svg"}
            className="cursor-pointer"
            alt="cancel"
            width={24}
            height={24}
          />
        </div>
        <WalletStats />
        <div className="flex px-6 gap-x-4 mt-9 items-center justify-between">
          <button
            className={`border text-xs cursor-pointer py-3 rounded-[6px] flex-1 ${
              action === "buy"
                ? "bg-linear-90 from-[#FF6B47] to-[#EC4899] text-white"
                : "border-[#F8B99A] text-[#E55A3C]"
            } `}
            onClick={() =>
              setAction((prev) => (prev === "buy" ? "withdraw" : "buy"))
            }
          >
            🔑 Buy Keys
          </button>
          <button
            className={`border text-xs cursor-pointer py-3 rounded-[6px] flex-1 ${
              action === "withdraw"
                ? "bg-linear-90 from-[#FF6B47] to-[#EC4899] text-white"
                : "border-[#F8B99A] text-[#E55A3C]"
            } `}
            onClick={() =>
              setAction((prev) => (prev === "withdraw" ? "buy" : "withdraw"))
            }
          >
            💰 Withdraw Earnings
          </button>
        </div>
        {action === "buy" ? (
          <BuyComponent onClick={() => setShowWithdrawSuccess(true)} />
        ) : (
          <WithdrawComponent onClick={() => setShowWithdrawSuccess(true)} />
        )}
        {showWithdrawSuccess && <WithdrawSuccessToast />}
      </div>
    </div>
  );
}

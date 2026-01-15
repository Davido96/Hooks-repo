"use client";

import React from "react";
import {
  ArrowLeft,
  TrendingUp,
  Calendar,
  Wallet,
  Heart,
  MessageSquare,
  Clock,
  Landmark,
  Smartphone,
  CircleDollarSign,
  CheckCircle2,
  Lock,
  Shield,
  RefreshCcw,
  Headset,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const InfoCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 md:p-8 ${className}`}
  >
    {children}
  </div>
);

const FeatureItem = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-4">
    <div className="bg-white/10 p-2 rounded-lg mt-1">
      <Icon className="w-5 h-5 text-pink-200" />
    </div>
    <div>
      <h4 className="font-bold text-white">{title}</h4>
      <p className="text-sm text-white/80">{children}</p>
    </div>
  </div>
);

export default function EarningsPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(160deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Hooks Logo"
              width={32}
              height={32}
              unoptimized
            />
            <h1 className="text-3xl font-bold">Hooks</h1>
          </div>

          <Button
            asChild
            variant="outline"
            className="bg-transparent border-white/30 hover:bg-white/10 text-white text-xs rounded-full px-4 py-2"
          >
            <Link href="/about">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to About
            </Link>
          </Button>
        </header>

        <main className="max-w-5xl mx-auto flex flex-col items-center text-center gap-12">
          <section className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Earnings & Payout System
            </h2>
            <p className="max-w-3xl mx-auto text-white/80">
              Transparent, fair, and creator-first. Learn how Hooks empowers
              creators with industry-leading revenue sharing and secure payouts.
            </p>
          </section>

          <InfoCard className="w-full text-center">
            <TrendingUp className="mx-auto w-8 h-8 text-green-300 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              70% Revenue Share
            </h3>
            <p className="text-sm text-white/80 mb-8">
              Keep more of what you earn - industry-leading creator revenue
              share
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-green-300">₦700</p>
                <p className="text-xs text-white/70 mt-1">
                  You keep from every ₦1,000
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">₦250</p>
                <p className="text-xs text-white/70 mt-1">
                  Platform operations & support
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">₦50</p>
                <p className="text-xs text-white/70 mt-1">
                  Payment processing fees
                </p>
              </div>
            </div>
          </InfoCard>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <InfoCard>
              <h3 className="text-xl font-bold mb-6">Revenue Streams</h3>
              <div className="space-y-6">
                <FeatureItem icon={Calendar} title="Monthly Subscriptions">
                  Set your own pricing from ₦1000 upward per month.
                </FeatureItem>
                <FeatureItem icon={Wallet} title="Pay-Per-View Content">
                  One-time pricing from ₦10,000 upward per piece.
                </FeatureItem>
                <FeatureItem icon={Heart} title="Tips & Appreciation">
                  Direct support from fans with a custom tip amount and message.
                </FeatureItem>
                <FeatureItem icon={MessageSquare} title="Custom Requests">
                  Personalized content commissions with your own pricing
                  structure.
                </FeatureItem>
              </div>
            </InfoCard>
            <InfoCard>
              <h3 className="text-xl font-bold mb-6">Payout Schedule</h3>
              <div className="space-y-6">
                <FeatureItem icon={Calendar} title="Set Weekly Payouts">
                  Get paid every Friday for the previous week&apos;s earnings
                  (minimum ₦1,000).
                </FeatureItem>
                <FeatureItem icon={Zap} title="Instant Payouts">
                  Creators can request instant payouts for a small fee.
                </FeatureItem>
                <FeatureItem icon={Clock} title="Hold Period">
                  A 7-day hold for new accounts to prevent fraud and
                  chargebacks.
                </FeatureItem>
              </div>
            </InfoCard>
          </div>

          <InfoCard className="w-full">
            <h3 className="text-xl font-bold mb-8 text-center">
              Payout Methods
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <Landmark className="w-8 h-8 text-pink-200" />
                </div>
                <h4 className="font-bold">Bank Transfer</h4>
                <p className="text-xs text-white/70 mt-1">
                  Direct deposits to all major Nigerian banks.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="w-8 h-8 text-pink-200" />
                </div>
                <h4 className="font-bold">Mobile Money</h4>
                <p className="text-xs text-white/70 mt-1">
                  Instant payouts to Opay, PalmPay, and other mobile wallets.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <CircleDollarSign className="w-8 h-8 text-pink-200" />
                </div>
                <h4 className="font-bold">Crypto Payouts</h4>
                <p className="text-xs text-white/70 mt-1">
                  USDT and BTC payouts for international creators (coming soon).
                </p>
              </div>
            </div>
          </InfoCard>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <InfoCard>
              <h3 className="text-xl font-bold mb-6">Tax Compliance</h3>
              <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-yellow-200">
                  Nigerian Tax Requirements
                </h4>
                <p className="text-sm text-yellow-200/80">
                  We provide annual tax documents (1099-equivalent) for all
                  creators earning over ₦600,000 annually.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-300" />{" "}
                  Automatic tax document generation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-300" /> Monthly
                  earnings statements
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-300" /> FIRS
                  compliance support
                </li>
              </ul>
            </InfoCard>
            <InfoCard className="flex flex-col">
              <h3 className="text-xl font-bold mb-6">Creator Support</h3>
              <ul className="space-y-2 text-sm text-white/90 flex-grow">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-300" />{" "}
                  Personalized earnings optimization
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-300" /> Content
                  strategy consultation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-300" />{" "}
                  Marketing and promotion guidance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-300" /> 24/7
                  payout support
                </li>
              </ul>
              <div className="mt-6 bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
                <p className="text-sm text-blue-200/90">
                  <span className="font-bold text-blue-200">
                    The Top Creator Farm:
                  </span>{" "}
                  Earn ₦2M+ monthly with our premium creator program and
                  dedicated account management.
                </p>
              </div>
            </InfoCard>
          </div>

          <InfoCard className="w-full">
            <h3 className="text-xl font-bold mb-8 text-center">
              Security & Safety
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Lock className="w-7 h-7 text-pink-200 mb-3" />
                <h4 className="font-bold">Bank-Grade Security</h4>
                <p className="text-xs text-white/70 mt-1">
                  256-bit encryption and PCI DSS compliance.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-7 h-7 text-pink-200 mb-3" />
                <h4 className="font-bold">Fraud Protection</h4>
                <p className="text-xs text-white/70 mt-1">
                  Advanced AI fraud detection and prevention.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCcw className="w-7 h-7 text-pink-200 mb-3" />
                <h4 className="font-bold">Chargeback Protection</h4>
                <p className="text-xs text-white/70 mt-1">
                  We handle disputes and protect your earnings.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Headset className="w-7 h-7 text-pink-200 mb-3" />
                <h4 className="font-bold">24/7 Support</h4>
                <p className="text-xs text-white/70 mt-1">
                  Round-the-clock assistance for payment issues.
                </p>
              </div>
            </div>
          </InfoCard>

          <InfoCard className="w-full text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Start Earning?</h3>
            <p className="text-sm text-white/80 max-w-lg mx-auto mb-6">
              Join thousands of creators already earning on Hooks. Set up your
              profile, upload your content, and start monetizing your audience
              today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                asChild
                className="w-full sm:w-auto bg-white text-pink-600 hover:bg-white/90 font-bold px-6 py-6"
              >
                <a href="/creator-signup">Start Creating Today</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto text-pink-600 border-white/50 hover:bg-white/10  font-bold px-6 py-6"
              >
                <a href="/creator-privacy">Creator Privacy Policy</a>
              </Button>
            </div>
          </InfoCard>
        </main>
      </div>
    </div>
  );
}

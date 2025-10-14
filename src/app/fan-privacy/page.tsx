"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Reusable component for section titles
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-bold text-white mb-6">{children}</h3>
);

// Reusable component for list items with a checkmark
const ListItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 size={18} className="text-green-300 flex-shrink-0 mt-1" />
    <p className="text-white/90">{children}</p>
  </div>
);

export default function FanPrivacyPolicy() {
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

        <main className="max-w-4xl mx-auto flex flex-col gap-12">
          {/* --- Main Title --- */}
          <section className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold">
              Fan Privacy Policy
            </h2>
            <p className="text-sm text-white/70 mt-2">
              Last updated: August 2025
            </p>
          </section>

          {/* --- Your Privacy Matters --- */}
          <section>
            <SectionTitle>Your Privacy Matters</SectionTitle>
            <p className="text-white/90 mb-6">
              As a fan on Hooks, we understand you value your privacy when
              engaging with creators. We&apos;re committed to protecting your
              personal information and being transparent about how we use your
              data.
            </p>
            <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4">
              <p>
                <strong className="text-green-200">Key Promise:</strong> Your
                interactions with creators are private by default. We never
                share your activity or personal information with other users
                unless you choose to make it public.
              </p>
            </div>
          </section>

          {/* --- Information We Collect --- */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Profile & Details</h4>
                <div className="space-y-3">
                  <ListItem>Email address and phone number</ListItem>
                  <ListItem>Profile photo and display name (optional)</ListItem>
                  <ListItem>Age verification for content access</ListItem>
                  <ListItem>Location (city/state only for matching)</ListItem>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">
                  Activity & Preferences
                </h4>
                <div className="space-y-3">
                  <ListItem>Subscriptions and content purchases</ListItem>
                  <ListItem>Messages with creators</ListItem>
                  <ListItem>Content views and interactions</ListItem>
                  <ListItem>Search and browsing history</ListItem>
                </div>
              </div>
            </div>
          </section>

          {/* --- How We Keep You Safe --- */}
          <section>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
              <h4 className="font-bold text-lg mb-4 text-center">
                How We Keep You Safe
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                <ListItem>
                  <strong>Anonymous browsing:</strong> Creators can&apos;t see
                  who viewed their profiles unless you interact.
                </ListItem>
                <ListItem>
                  <strong>Private messaging:</strong> Only you and the creator
                  can see your conversations.
                </ListItem>
                <ListItem>
                  <strong>Secure payments:</strong> We never store your full
                  payment details.
                </ListItem>
                <ListItem>
                  <strong>No public activity:</strong> Your subscriptions and
                  purchases are never displayed publicly.
                </ListItem>
                <ListItem>
                  <strong>Block & report tools:</strong> Easy tools to block
                  users and report inappropriate behavior.
                </ListItem>
              </div>
            </div>
          </section>

          {/* --- What Creators Can See --- */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-500/10 border border-green-400/30 rounded-2xl p-6">
              <h4 className="font-bold flex items-center gap-2 mb-4">
                <CheckCircle2 size={20} className="text-green-300" /> Visible to
                Creators
              </h4>
              <div className="space-y-3 text-sm">
                <ListItem>Your display name and profile photo</ListItem>
                <ListItem>Messages you send to them</ListItem>
                <ListItem>Tips and interactions you make</ListItem>
                <ListItem>When you subscribe to their content</ListItem>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-6">
              <h4 className="font-bold flex items-center gap-2 mb-4">
                <XCircle size={20} className="text-red-300" /> Hidden from
                Creators
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <XCircle
                    size={18}
                    className="text-red-300 flex-shrink-0 mt-1"
                  />
                  <p>Your real name and contact information</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle
                    size={18}
                    className="text-red-300 flex-shrink-0 mt-1"
                  />
                  <p>Other creators you follow or subscribe to</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle
                    size={18}
                    className="text-red-300 flex-shrink-0 mt-1"
                  />
                  <p>Your browsing history and search activity</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle
                    size={18}
                    className="text-red-300 flex-shrink-0 mt-1"
                  />
                  <p>Payment methods and transaction details</p>
                </div>
              </div>
            </div>
          </section>

          {/* --- Your Control Options --- */}
          <section>
            <SectionTitle>Your Control Options</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Privacy Controls</h4>
                <div className="space-y-3">
                  <ListItem>Hide your online status from creators</ListItem>
                  <ListItem>Control who can message you</ListItem>
                  <ListItem>Set spending limits and budgets</ListItem>
                  <ListItem>Customize notification preferences</ListItem>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Account Management</h4>
                <div className="space-y-3">
                  <ListItem>Download all your data</ListItem>
                  <ListItem>Delete your account and all data</ListItem>
                  <ListItem>Cancel subscriptions anytime</ListItem>
                  <ListItem>Update or correct your information</ListItem>
                </div>
              </div>
            </div>
          </section>

          {/* --- All other sections --- */}
          <section>
            <SectionTitle>Payment & Financial Privacy</SectionTitle>
            <p className="text-white/90 mb-6">
              Your financial information is protected with the highest security
              standards.
            </p>
            <div className="space-y-3">
              <ListItem>
                <strong>Secure processors:</strong> We use bank-grade payment
                processors (Paystack, Flutterwave).
              </ListItem>
              <ListItem>
                <strong>No storage:</strong> We never store your full card
                details or bank information.
              </ListItem>
              <ListItem>
                <strong>Discretion:</strong> Charges appear as &quot;Hooks
                Digital Services&quot; on your statements.
              </ListItem>
              <ListItem>
                <strong>Fraud protection:</strong> Advanced fraud detection to
                protect your accounts.
              </ListItem>
            </div>
          </section>

          <section>
            <SectionTitle>Data Sharing & Third Parties</SectionTitle>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-6">
              <p>
                <strong>We never sell your data.</strong> Your information is
                only shared in these limited cases:
              </p>
            </div>
            <div className="space-y-3">
              <ListItem>
                <strong>Payment processing:</strong> Minimal data shared with
                payment processors.
              </ListItem>
              <ListItem>
                <strong>Legal compliance:</strong> When required by Nigerian law
                or court orders.
              </ListItem>
              <ListItem>
                <strong>Safety & security:</strong> To investigate fraud or
                protect user safety.
              </ListItem>
              <ListItem>
                <strong>Technical services:</strong> Trusted partners who help
                operate the platform (under strict agreements).
              </ListItem>
            </div>
          </section>

          <section>
            <SectionTitle>Age Verification & Content Access</SectionTitle>
            <p className="text-white/90 mb-6">
              We use secure, third-party age verification to comply with
              Nigerian laws.
            </p>
            <div className="space-y-3">
              <ListItem>
                Age verification documents are encrypted and stored securely.
              </ListItem>
              <ListItem>
                Verification data is only used to confirm eligibility.
              </ListItem>
              <ListItem>
                Documents are deleted after verification (except as required by
                law).
              </ListItem>
              <ListItem>
                Parental controls available for younger users.
              </ListItem>
            </div>
          </section>

          <section>
            <SectionTitle>Contact & Support</SectionTitle>
            <p className="text-white/90 mb-6">
              Questions about your privacy or need to exercise your rights?
              We&apos;re here to help:
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-3 text-sm">
              <p>
                <strong>Privacy Email:</strong> privacy@hooks.ng
              </p>
              <p>
                <strong>Support Chat:</strong> Available 24/7 in the app
              </p>
              <p>
                <strong>Response Time:</strong> Within 24 hours for privacy
                matters
              </p>
              <p>
                <strong>Phone Support:</strong> +234-XXX-XXXX (for urgent
                privacy concerns)
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

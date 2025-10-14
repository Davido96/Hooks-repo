"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
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

export default function CreatorPrivacyPolicy() {
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

        <main className="max-w-4xl mx-auto flex flex-col gap-12 text-left">
          {/* --- Main Title --- */}
          <section>
            <h2 className="text-4xl md:text-5xl font-bold">
              Creator Privacy Policy
            </h2>
            <p className="text-sm text-white/70 mt-2">
              Last updated: August 2025
            </p>
          </section>

          {/* --- Your Content, Your Control --- */}
          <section>
            <SectionTitle>Your Content, Your Control</SectionTitle>
            <p className="text-white/90 mb-6">
              As a creator on Hooks, you retain full ownership and control of
              all content you upload. We never claim ownership of your
              intellectual property, and you can delete your content at any
              time.
            </p>
            <div className="space-y-3">
              <ListItem>You own all rights to your original content.</ListItem>
              <ListItem>
                You control who can access your content through our subscription
                and pay-per-view systems.
              </ListItem>
              <ListItem>
                You can delete or modify your content at any time.
              </ListItem>
              <ListItem>
                We only store your content to provide our services to you.
              </ListItem>
            </div>
          </section>

          {/* --- Personal Information We Collect --- */}
          <section>
            <SectionTitle>Personal Information We Collect</SectionTitle>
            <p className="text-white/90 mb-6">
              To provide our services and ensure platform safety, we collect:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Account Information</h4>
                <div className="space-y-3">
                  <ListItem>Email address and phone number</ListItem>
                  <ListItem>Profile information you choose to share</ListItem>
                  <ListItem>Payment and tax information for earnings</ListItem>
                  <ListItem>Age verification documents</ListItem>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Platform Usage</h4>
                <div className="space-y-3">
                  <ListItem>Content upload and engagement metrics</ListItem>
                  <ListItem>Subscriber and earnings data</ListItem>
                  <ListItem>Messages and interactions with fans</ListItem>
                  <ListItem>
                    Technical data for security and performance
                  </ListItem>
                </div>
              </div>
            </div>
          </section>

          {/* --- How We Protect Your Privacy --- */}
          <section>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                How We Protect Your Privacy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ListItem>
                  <strong>Bank-grade encryption:</strong> All sensitive data is
                  encrypted in transit and at rest.
                </ListItem>
                <ListItem>
                  <strong>Limited access:</strong> Only authorized personnel can
                  access user data, and only when necessary.
                </ListItem>
                <ListItem>
                  <strong>No content sharing:</strong> We never share your
                  content with third parties without your consent.
                </ListItem>
                <ListItem>
                  <strong>Secure payments:</strong> We use industry-standard
                  payment processors and never store full payment details.
                </ListItem>
                <ListItem>
                  <strong>Regular audits:</strong> We conduct regular security
                  audits and vulnerability assessments.
                </ListItem>
              </div>
            </div>
          </section>

          {/* --- Your Rights as a Creator --- */}
          <section>
            <SectionTitle>Your Rights as a Creator</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Content Rights</h4>
                <div className="space-y-3">
                  <ListItem>Download all your uploaded content</ListItem>
                  <ListItem>
                    Delete specific content or your entire account
                  </ListItem>
                  <ListItem>Control content visibility and pricing</ListItem>
                  <ListItem>
                    Restrict access to specific regions or users
                  </ListItem>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Data Rights</h4>
                <div className="space-y-3">
                  <ListItem>Access all data we have about you</ListItem>
                  <ListItem>Correct inaccurate information</ListItem>
                  <ListItem>
                    Request data deletion (right to be forgotten)
                  </ListItem>
                  <ListItem>Data portability to other platforms</ListItem>
                </div>
              </div>
            </div>
          </section>

          {/* --- Earnings & Tax Information --- */}
          <section>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Earnings & Tax Information
              </h3>
              <p className="text-white/90 mb-6">
                We collect the necessary financial information to comply with
                Nigerian tax regulations and provide you with accurate earnings
                reports.
              </p>
              <div className="space-y-3">
                <ListItem>
                  Bank account details for payments (encrypted and secure).
                </ListItem>
                <ListItem>
                  Tax identification numbers as required by law.
                </ListItem>
                <ListItem>
                  Earnings history for tax reporting purposes.
                </ListItem>
                <ListItem>Transaction records for dispute resolution.</ListItem>
              </div>
            </div>
          </section>

          {/* --- Data Sharing & Third Parties --- */}
          <section>
            <SectionTitle>Data Sharing & Third Parties</SectionTitle>
            <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-6">
              <p>We only share your data in these limited circumstances:</p>
            </div>
            <div className="space-y-3">
              <ListItem>
                <strong>Payment processors:</strong> To process your earnings
                (with minimal necessary data).
              </ListItem>
              <ListItem>
                <strong>Legal requirements:</strong> When required by Nigerian
                law or valid legal requests.
              </ListItem>
              <ListItem>
                <strong>Safety measures:</strong> To investigate fraud, abuse,
                or terms of service violations.
              </ListItem>
              <ListItem>
                <strong>Service providers:</strong> Trusted partners who help us
                operate the platform (under strict agreements).
              </ListItem>
            </div>
          </section>

          {/* --- Contact Us --- */}
          <section>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
              <p className="text-white/90 mb-6">
                For privacy-related questions or to exercise your rights,
                contact our privacy team:
              </p>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Email:</strong> privacy@hooks.ng
                </p>
                <p>
                  <strong>Response Time:</strong> Within 48 hours for privacy
                  requests
                </p>
                <p>
                  <strong>Data Protection Officer:</strong> Available for EU
                  residents
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Reusable component for section titles
const Section = ({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <h3 className="text-2xl font-bold text-white mb-6">
      {number}. {title}
    </h3>
    <div className="space-y-6">{children}</div>
  </section>
);

const CheckListItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 size={18} className="text-green-300 flex-shrink-0 mt-1" />
    <p className="text-white/90">{children}</p>
  </div>
);
const CrossListItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <XCircle size={18} className="text-red-300 flex-shrink-0 mt-1" />
    <p className="text-white/90">{children}</p>
  </div>
);

// Reusable component for the glassmorphism info boxes
const InfoBox = ({
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

export default function TermsOfService() {
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

        <main className="max-w-5xl mx-auto flex flex-col gap-12 text-left">
          <section>
            <h2 className="text-4xl md:text-5xl font-bold">Terms of Service</h2>
            <p className="text-sm text-white/70 mt-2">
              Last updated: Aug 2025 | Effective Date: January 1, 2026
            </p>
          </section>

          <Section number={1} title="Agreement to Terms">
            <p className="text-white/90">
              By accessing or using the Hooks platform (&quot;Service&quot;),
              you agree to be bound by these Terms of Service
              (&quot;Terms&quot;). If you do not agree to these Terms, do not
              use our Service.
            </p>
            <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-4">
              <p className="font-semibold text-yellow-200">
                Important: You must be at least 18 years old to use Hooks. By
                using our service, you represent and warrant that you are of
                legal age and competent to enter into this agreement.
              </p>
            </div>
          </Section>

          <Section number={2} title="Platform Overview">
            <p className="text-white/90">
              Hooks is a social and monetization platform that enables creators
              to connect with their fans through:
            </p>
            <div className="space-y-3">
              <CheckListItem>Monthly subscription services</CheckListItem>
              <CheckListItem>Pay-per-view content</CheckListItem>
              <CheckListItem>Direct tips and appreciation</CheckListItem>
              <CheckListItem>Custom content requests</CheckListItem>
              <CheckListItem>Direct messaging and interactions</CheckListItem>
            </div>
          </Section>

          <Section number={3} title="Account Registration & Verification">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Account Requirements</h4>
                <div className="space-y-3">
                  <CheckListItem>
                    Provide accurate, current information
                  </CheckListItem>
                  <CheckListItem>
                    Maintain security of your account credentials
                  </CheckListItem>
                  <CheckListItem>
                    Must be 18+ years old with valid ID
                  </CheckListItem>
                  <CheckListItem>
                    Comply with Nigerian laws and regulations
                  </CheckListItem>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Creator Verification</h4>
                <div className="space-y-3">
                  <CheckListItem>
                    Valid government-issued ID required
                  </CheckListItem>
                  <CheckListItem>
                    Bank account verification for payouts
                  </CheckListItem>
                  <CheckListItem>
                    Profile photo matching ID document
                  </CheckListItem>
                  <CheckListItem>
                    Tax identification for earnings over ₦600,000
                  </CheckListItem>
                </div>
              </div>
            </div>
          </Section>

          <Section number={4} title="Content Guidelines & Restrictions">
            <InfoBox>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">✓ Allowed Content</h4>
                  <div className="space-y-3">
                    <CheckListItem>
                      Original creative content (photography, videos, etc)
                    </CheckListItem>
                    <CheckListItem>
                      Educational and tutorial content
                    </CheckListItem>
                    <CheckListItem>
                      Adult content (18+ only, properly tagged)
                    </CheckListItem>
                    <CheckListItem>Fashion and modeling content</CheckListItem>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">
                    ✗ Prohibited Content
                  </h4>
                  <div className="space-y-3">
                    <CrossListItem>
                      Illegal activities or content violating Nigerian law
                    </CrossListItem>
                    <CrossListItem>
                      Non-consensual intimate content
                    </CrossListItem>
                    <CrossListItem>Content involving minors</CrossListItem>
                    <CrossListItem>
                      Copyright infringement or stolen content
                    </CrossListItem>
                    <CrossListItem>
                      Harassment, hate speech, or discrimination
                    </CrossListItem>
                  </div>
                </div>
              </div>
            </InfoBox>
          </Section>

          <Section number={5} title="Creator Rights & Responsibilities">
            <InfoBox>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">Your Rights</h4>
                  <div className="space-y-3">
                    <CheckListItem>
                      Retain ownership of your original content
                    </CheckListItem>
                    <CheckListItem>
                      Set your own pricing and subscription tiers
                    </CheckListItem>
                    <CheckListItem>Receive 75% of all earnings</CheckListItem>
                    <CheckListItem>
                      Delete or modify content at any time
                    </CheckListItem>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">
                    Your Responsibilities
                  </h4>
                  <div className="space-y-3">
                    <CheckListItem>
                      Comply with all applicable laws
                    </CheckListItem>
                    <CheckListItem>Provide content as advertised</CheckListItem>
                    <CheckListItem>
                      Respect fan privacy and boundaries
                    </CheckListItem>
                    <CheckListItem>
                      Report inappropriate user behavior
                    </CheckListItem>
                  </div>
                </div>
              </div>
            </InfoBox>
          </Section>

          <Section number={6} title="Payment Terms & Revenue Sharing">
            <InfoBox>
              <div className="grid grid-cols-3 gap-6 text-center mb-8">
                <div>
                  <p className="text-4xl font-bold text-green-300">75%</p>
                  <p className="text-xs text-white/70 mt-1">Creator Share</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">20%</p>
                  <p className="text-xs text-white/70 mt-1">Platform Fee</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">5%</p>
                  <p className="text-xs text-white/70 mt-1">
                    Payment Processing
                  </p>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-4">Payment Schedule</h4>
              <div className="space-y-3">
                <CheckListItem>
                  Weekly payouts every Friday (minimum ₦1,000)
                </CheckListItem>
                <CheckListItem>
                  7-day hold period for new creators (fraud prevention)
                </CheckListItem>
                <CheckListItem>
                  Instant Payouts available for a small fee for eligible
                  creators
                </CheckListItem>
              </div>
            </InfoBox>
          </Section>

          <Section number={7} title="Fan Terms & Conduct">
            <InfoBox>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">✓ Fan Rights</h4>
                  <div className="space-y-3">
                    <CheckListItem>
                      Access purchased content as advertised
                    </CheckListItem>
                    <CheckListItem>
                      Engage with creators respectfully
                    </CheckListItem>
                    <CheckListItem>Report policy violations</CheckListItem>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">
                    ✗ Prohibited Fan Conduct
                  </h4>
                  <div className="space-y-3">
                    <CrossListItem>
                      Harassment or abuse of creators
                    </CrossListItem>
                    <CrossListItem>
                      Sharing/distributing content without permission
                    </CrossListItem>
                    <CrossListItem>
                      Chargebacks without valid reason
                    </CrossListItem>
                    <CrossListItem>
                      Attempting to solicit creators for other platforms
                    </CrossListItem>
                  </div>
                </div>
              </div>
            </InfoBox>
          </Section>

          <Section number={8} title="Intellectual Property & DMCA">
            <InfoBox>
              <p className="text-white/90">
                Hooks respects intellectual property rights and expects our
                users to do the same. We comply with the Nigerian Copyright Act
                and DMCA. To report copyright infringement, please contact us at{" "}
                <a
                  href="mailto:legal@hooks.ng"
                  className="font-semibold underline"
                >
                  legal@hooks.ng
                </a>{" "}
                with a valid DMCA notice.
              </p>
            </InfoBox>
          </Section>

          <Section number={9} title="Platform Policies & Enforcement">
            <InfoBox>
              <div className="space-y-3">
                <CheckListItem>
                  We reserve the right to suspend or terminate accounts for
                  violating these Terms.
                </CheckListItem>
                <CheckListItem>
                  Content may be removed if it violates our guidelines.
                </CheckListItem>
                <CheckListItem>
                  Users can appeal decisions through our support channels.
                </CheckListItem>
              </div>
              <div className="mt-6 bg-red-500/20 border border-red-400/50 rounded-lg p-4">
                <p className="font-semibold text-red-200">
                  Violation Consequences: Warnings, temporary suspension,
                  permanent ban, and withholding of earnings may result from
                  policy violations. Serious violations will be reported to law
                  enforcement.
                </p>
              </div>
            </InfoBox>
          </Section>

          <Section number={10} title="Limitation of Liability">
            <InfoBox>
              <p className="text-white/90 mb-4">
                Hooks provides the platform &ldquo;as-is&ldquo; and is not
                liable for:
              </p>
              <div className="space-y-3">
                <CheckListItem>
                  Content quality or accuracy provided by creators.
                </CheckListItem>
                <CheckListItem>
                  Interactions or disputes between users.
                </CheckListItem>
                <CheckListItem>Any loss of earnings or data.</CheckListItem>
              </div>
              <div className="mt-6 bg-red-500/20 border border-red-400/50 rounded-lg p-4">
                <p className="font-semibold text-red-200">
                  Our liability is limited to the maximum extent permitted by
                  Nigerian law. In no case shall our liability exceed the total
                  amount you have paid to Hooks in the past six months.
                </p>
              </div>
            </InfoBox>
          </Section>

          <Section number={11} title="Governing Law & Disputes">
            <InfoBox>
              <p className="text-white/90">
                These Terms are governed by Nigerian law. Any disputes will be
                resolved through binding arbitration in Lagos, Nigeria.
              </p>
            </InfoBox>
          </Section>

          <Section number={12} title="Contact Information">
            <InfoBox>
              <div className="space-y-3 text-sm">
                <p>
                  <strong className="text-white">Legal Inquiries:</strong>{" "}
                  legal@hooks.ng
                </p>
                <p>
                  <strong className="text-white">Address:</strong> Hooks Digital
                  Services Ltd, 123 Ikoyi, Lagos, Nigeria.
                </p>
              </div>
            </InfoBox>
          </Section>
        </main>
      </div>
    </div>
  );
}

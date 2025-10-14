"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Shield,
  BadgeCheck,
  CheckCircle2,
  XCircle,
  MessageSquareWarning,
  UserX,
  Ban,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-white text-center">{children}</h2>
);

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

export default function CommunityGuidelines() {
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
          <section className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              Community Guidelines
            </h1>
            <p className="text-lg text-white/80 mt-4 max-w-3xl mx-auto">
              Building a safe, respectful, and empowering community where
              creators and fans can connect authentically.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard className="text-center">
              <Heart className="mx-auto w-8 h-8 text-pink-300 mb-3" />
              <h3 className="font-bold mb-1">Respect</h3>
              <p className="text-sm text-white/80">
                Treat all community members with dignity, kindness, and respect
                regardless of background.
              </p>
            </InfoCard>
            <InfoCard className="text-center">
              <Shield className="mx-auto w-8 h-8 text-blue-300 mb-3" />
              <h3 className="font-bold mb-1">Safety</h3>
              <p className="text-sm text-white/80">
                Creating a secure environment where everyone feels protected and
                can express themselves.
              </p>
            </InfoCard>
            <InfoCard className="text-center">
              <BadgeCheck className="mx-auto w-8 h-8 text-green-300 mb-3" />
              <h3 className="font-bold mb-1">Authenticity</h3>
              <p className="text-sm text-white/80">
                Encouraging genuine connections and authentic content creation
                within our community.
              </p>
            </InfoCard>
          </section>

          <section>
            <InfoCard>
              <SectionTitle>Creator Guidelines</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-200">
                    ✓ Best Practices
                  </h4>
                  <div className="space-y-3 text-sm">
                    <CheckListItem>
                      Create original, high-quality content that provides value
                      to your fans.
                    </CheckListItem>
                    <CheckListItem>
                      Be authentic and transparent in your interactions.
                    </CheckListItem>
                    <CheckListItem>
                      Respond to fan questions and comments in a timely and
                      respectful manner.
                    </CheckListItem>
                    <CheckListItem>
                      Clearly communicate what subscribers can expect.
                    </CheckListItem>
                    <CheckListItem>
                      Respect fan privacy and never share private information.
                    </CheckListItem>
                    <CheckListItem>
                      Foster a positive and inclusive community around your
                      content.
                    </CheckListItem>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-200">
                    ✗ Prohibited Behavior
                  </h4>
                  <div className="space-y-3 text-sm">
                    <CrossListItem>
                      Posting content you don&apos;t own the rights to.
                    </CrossListItem>
                    <CrossListItem>
                      Spamming or sending unsolicited messages to fans.
                    </CrossListItem>
                    <CrossListItem>
                      Misleading fans about content or offerings.
                    </CrossListItem>
                    <CrossListItem>
                      Engaging in any form of harassment or bullying.
                    </CrossListItem>
                    <CrossListItem>
                      Discriminating against any user or group.
                    </CrossListItem>
                    <CrossListItem>
                      Requesting content or interactions that violate our
                      policies.
                    </CrossListItem>
                  </div>
                </div>
              </div>
            </InfoCard>
          </section>

          <section>
            <InfoCard>
              <SectionTitle>Fan Guidelines</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-200">
                    ✓ Respectful Engagement
                  </h4>
                  <div className="space-y-3 text-sm">
                    <CheckListItem>
                      Interact with creators and other fans respectfully at all
                      times.
                    </CheckListItem>
                    <CheckListItem>
                      Keep conversations constructive and on-topic.
                    </CheckListItem>
                    <CheckListItem>
                      Respect creators&apos; boundaries and content guidelines.
                    </CheckListItem>
                    <CheckListItem>
                      Report any content or behavior that violates our policies.
                    </CheckListItem>
                    <CheckListItem>
                      Understand that creators are not obligated to fulfill
                      every request.
                    </CheckListItem>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-200">
                    ✗ Unacceptable Behavior
                  </h4>
                  <div className="space-y-3 text-sm">
                    <CrossListItem>
                      Posting harassing, abusive, or sexually explicit comments.
                    </CrossListItem>
                    <CrossListItem>
                      Sharing a creator&apos;s paid content without permission.
                    </CrossListItem>
                    <CrossListItem>
                      Demanding free content or personal information from
                      creators.
                    </CrossListItem>
                    <CrossListItem>
                      Creating multiple accounts to evade suspension.
                    </CrossListItem>
                    <CrossListItem>
                      Initiating fraudulent chargebacks or payment disputes.
                    </CrossListItem>
                  </div>
                </div>
              </div>
            </InfoCard>
          </section>

          <section>
            <InfoCard>
              <SectionTitle>Content Standards</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">
                    Adult Content Policy
                  </h4>
                  <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-4 mb-4 text-sm">
                    <p className="text-yellow-200">
                      Sexually explicit content is allowed but must be properly
                      tagged and accessible only to users 18+ who have passed
                      age verification.
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <CheckListItem>
                      All parties must be 18+ with valid documentation.
                    </CheckListItem>
                    <CheckListItem>Content must be consensual.</CheckListItem>
                    <CheckListItem>
                      Provide clear content warnings for sensitive material.
                    </CheckListItem>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">
                    General Content Rules
                  </h4>
                  <div className="space-y-3 text-sm">
                    <CheckListItem>
                      Profile information must be original and properly
                      represent you.
                    </CheckListItem>
                    <CheckListItem>
                      No hate speech, violence, or illegal content.
                    </CheckListItem>
                    <CheckListItem>
                      Account descriptions and appropriate profile materials.
                    </CheckListItem>
                    <CheckListItem>
                      Content must not promote self-harm.
                    </CheckListItem>
                    <CheckListItem>
                      The platform should not be used for illegal activities.
                    </CheckListItem>
                  </div>
                </div>
              </div>
            </InfoCard>
          </section>

          <section>
            <InfoCard>
              <SectionTitle>Reporting & Enforcement</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">
                    How to Report Violations
                  </h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2 rounded-full font-bold">
                        1.
                      </div>{" "}
                      In-App Reporting: Use the report button on profiles,
                      messages, or content.
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2 rounded-full font-bold">
                        2.
                      </div>{" "}
                      Email Support: Contact support@hooks.ng with details and
                      evidence.
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2 rounded-full font-bold">
                        3.
                      </div>{" "}
                      Emergency Situations: Contact local law enforcement for
                      immediate threats.
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">
                    Enforcement Actions
                  </h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <MessageSquareWarning className="w-5 h-5 text-yellow-300" />{" "}
                      <strong>Warning:</strong> For minor infractions, a warning
                      may be issued.
                    </div>
                    <div className="flex items-center gap-3">
                      <UserX className="w-5 h-5 text-orange-400" />{" "}
                      <strong>Temporary Suspension:</strong> For repeat or more
                      serious violations.
                    </div>
                    <div className="flex items-center gap-3">
                      <Ban className="w-5 h-5 text-red-400" />{" "}
                      <strong>Permanent Ban:</strong> For severe violations like
                      illegal content or harassment.
                    </div>
                  </div>
                </div>
              </div>
            </InfoCard>
          </section>

          <section>
            <InfoCard>
              <SectionTitle>Appeals Process</SectionTitle>
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-center">
                <div
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-white/20 hidden md:block"
                  style={{ transform: "translateY(-50%)", zIndex: -1 }}
                ></div>
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-2xl mb-3 border-2 border-white/30">
                    1
                  </div>
                  <h4 className="font-bold">Submit Appeal</h4>
                  <p className="text-sm text-white/80">
                    Users can appeal a decision within 14 days via the automated
                    system.
                  </p>
                </div>
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-2xl mb-3 border-2 border-white/30">
                    2
                  </div>
                  <h4 className="font-bold">Review Process</h4>
                  <p className="text-sm text-white/80">
                    Our trust and safety team will conduct a human review of the
                    appeal.
                  </p>
                </div>
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-2xl mb-3 border-2 border-white/30">
                    3
                  </div>
                  <h4 className="font-bold">Final Decision</h4>
                  <p className="text-sm text-white/80">
                    We&apos;ll notify you of the final decision and outcome of
                    your appeal.
                  </p>
                </div>
              </div>
            </InfoCard>
          </section>

          <section>
            <InfoCard className="text-center">
              <h3 className="text-2xl font-bold mb-2">
                Questions About Our Guidelines?
              </h3>
              <p className="text-sm text-white/80 max-w-lg mx-auto mb-6">
                Our community team is here to help clarify any guidelines and
                support you in creating a positive and successful experience on
                Hooks.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="text-white border-white/50 hover:bg-white/10 hover:text-white font-bold"
                >
                  <Link href="/terms">Terms of Service</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="text-white border-white/50 hover:bg-white/10 hover:text-white font-bold"
                >
                  <Link href="/fan-privacy">Privacy Policy</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="text-white border-white/50 hover:bg-white/10 hover:text-white font-bold"
                >
                  <a href="mailto:support@hooks.ng">Contact support@hooks.ng</a>
                </Button>
              </div>
            </InfoCard>
          </section>
        </main>
      </div>
    </div>
  );
}

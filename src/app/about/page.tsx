"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Heart,
  Percent,
  Shield,
  Globe,
  SlidersHorizontal,
  BadgeCheck,
  MessageSquare,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
    {children}
  </h2>
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

const FeatureCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <InfoCard className="text-center flex flex-col items-center">
    <div className="bg-white/10 p-3 rounded-full mb-4">
      <Icon className="w-6 h-6 text-pink-200" />
    </div>
    <h4 className="font-bold text-white mb-2">{title}</h4>
    <p className="text-sm text-white/80">{children}</p>
  </InfoCard>
);

export default function AboutHooks() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(160deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex justify-between items-center mb-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Hooks Logo"
              width={32}
              height={32}
              unoptimized
            />
            <span className="text-3xl font-bold">Hooks</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/80">
            <Link href="/creator-privacy" className="hover:text-white">
              Creator Privacy
            </Link>
            <Link href="/fan-privacy" className="hover:text-white">
              Fan Privacy
            </Link>
            <Link href="/earnings" className="hover:text-white">
              Earnings
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/community-guidelines" className="hover:text-white">
              Guidelines
            </Link>
          </nav>
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-white/30 hover:bg-white/10 text-white text-xs rounded-full px-4 py-2"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </header>

        <main className="max-w-5xl mx-auto flex flex-col items-center gap-16 md:gap-24">
          <section className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Hooks</h1>
            <p className="max-w-3xl mx-auto text-white/80">
              Empowering Nigeria&apos;s creator economy with safe, authentic
              connections and fair monetization opportunities for content
              creators and their fans.
            </p>
          </section>

          <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <InfoCard>
              <h3 className="flex items-center gap-3 text-xl font-bold mb-4">
                <Star className="w-6 h-6 text-yellow-300" /> Our Vision
              </h3>
              <p className="text-white/80">
                To become Africa&apos;s leading platform where creators can
                build sustainable businesses while fostering genuine connections
                with their audience. We envision a future where every creative
                individual has the tools and platform to monetize their talent
                fairly.
              </p>
            </InfoCard>
            <InfoCard>
              <h3 className="flex items-center gap-3 text-xl font-bold mb-4">
                <Heart className="w-6 h-6 text-pink-300" /> Our Mission
              </h3>
              <p className="text-white/80">
                To democratize the creator economy by providing a safe,
                transparent platform where creators keep 80% of their earnings,
                build authentic relationships with fans, and have complete
                control over their content and pricing.
              </p>
            </InfoCard>
          </section>

          <section className="w-full">
            <SectionTitle>What Makes Us Different</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <FeatureCard icon={Percent} title="80% Creator Revenue">
                Industry-leading revenue share ensuring creators get maximum
                value for their work.
              </FeatureCard>
              <FeatureCard icon={Shield} title="Safety First">
                Verified profiles, secure payments, and robust content
                moderation for peace of mind.
              </FeatureCard>
              <FeatureCard icon={Globe} title="African Focus">
                Built specifically for the Nigerian market with local payment
                solutions and cultural understanding.
              </FeatureCard>
              <FeatureCard icon={SlidersHorizontal} title="Creator Control">
                Complete autonomy over pricing, content, and fan interactions
                with powerful creator tools.
              </FeatureCard>
            </div>
          </section>

          <section className="w-full">
            <SectionTitle>Platform Safety & Trust</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <FeatureCard icon={BadgeCheck} title="Verified Profiles">
                All creators go through our verification process to ensure
                authenticity and safety.
              </FeatureCard>
              <FeatureCard icon={MessageSquare} title="Content Moderation">
                AI-powered and human-reviewed content moderation to maintain
                community standards.
              </FeatureCard>
              <FeatureCard icon={Lock} title="Secure Payments">
                Bank-grade security for all transactions with transparent fee
                structure.
              </FeatureCard>
            </div>
          </section>

          <section className="w-full">
            <SectionTitle>How We Empower Creators</SectionTitle>
            <InfoCard className="w-full mt-12 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">Revenue Streams</h4>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-300" />{" "}
                      Monthly subscriptions from dedicated fans
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-300" />{" "}
                      Pay-per-view exclusive content
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-300" />{" "}
                      Direct tips and appreciation messages
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-300" />{" "}
                      Custom content requests and commissions
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">Creator Tools</h4>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-300" />{" "}
                      Advanced analytics and earnings dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-300" />{" "}
                      Flexible pricing and subscription tiers
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-300" />{" "}
                      Direct messaging with fans
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-300" />{" "}
                      Content scheduling and management
                    </li>
                  </ul>
                </div>
              </div>
            </InfoCard>
          </section>

          <section className="w-full">
            <InfoCard className="w-full text-center">
              <h3 className="text-2xl font-bold mb-2">
                Questions or Concerns?
              </h3>
              <p className="text-sm text-white/80 max-w-lg mx-auto mb-6">
                We&apos;re here to help. Reach out to our support team or
                explore our comprehensive policy pages.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="text-white border-white/50 hover:bg-white/10 hover:text-white font-bold"
                >
                  <Link href="/creator-policies">Creator Policies</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="text-white border-white/50 hover:bg-white/10 hover:text-white font-bold"
                >
                  <Link href="/earnings">Earnings Info</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="text-white border-white/50 hover:bg-white/10 hover:text-white font-bold"
                >
                  <Link href="/guidelines">Community Guidelines</Link>
                </Button>
              </div>
            </InfoCard>
          </section>
        </main>
      </div>
    </div>
  );
}

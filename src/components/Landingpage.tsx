/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ShieldCheck,
  Zap,
  TrendingUp,
  HeartHandshake,
  CheckCircle2,
  Users,
  GitCommitHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featuredCreators = [
  {
    name: "Amara K.",
    role: "Fashion Creator",
    image:
      "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400",
    isVerified: false,
  },
  {
    name: "Zara M.",
    role: "Artist & Model",
    image:
      "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400",
    isVerified: false,
  },
  {
    name: "Funmi B.",
    role: "Dancer & Stylist",
    image:
      "https://images.pexels.com/photos/2775556/pexels-photo-2775556.jpeg?auto=compress&cs=tinysrgb&w=400",
    isVerified: false,
  },
  {
    name: "Demola A.",
    role: "Travel & Photography",
    image:
      "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=400",
    isVerified: true,
  },
];

const successStories = [
  {
    name: "Kemi A.",
    location: "Lagos Creator",
    image:
      "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
    story:
      "The connections are real. In my first 3 months, Hooks changed my life!",
  },
  {
    name: "Chioma B.",
    location: "Abuja Influencer",
    image:
      "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=400",
    story:
      "The name says it all. Real following, real connections, real support.",
  },
  {
    name: "Adunni C.",
    location: "Port Harcourt Creator",
    image:
      "https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=400",
    story: "Finally, a platform that celebrates and empowers Black creators!",
  },
];

export default function Homepage() {
  return (
    <div
      className="min-h-screen text-white bg-[#FF6B6B]"
      style={{
        background:
          "linear-gradient(135deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
      }}
    >
      {/* --- Top Corner Badges --- */}
      <div className="absolute top-6 left-6 hidden md:flex items-center gap-2 bg-black/20 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
        <Users size={14} className="text-green-300" />
        <span>
          <span className="font-bold">21K+</span> Active Users
        </span>
      </div>
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 bg-black/20 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
        <GitCommitHorizontal size={14} className="text-blue-300" />
        <span>
          <span className="font-bold">1M+</span> Connections Made
        </span>
      </div>

      <main className="container mx-auto px-4 py-16 sm:py-20">
        <div className="flex flex-col items-center gap-16 md:gap-24">
          {/* --- Hero Section --- */}
          <section className="text-center flex flex-col items-center pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Hooks Logo"
                width={32}
                height={32}
                unoptimized
              />
              <h1 className="text-5xl font-bold">Hooks</h1>
            </div>
            <p className="max-w-2xl text-lg text-white/90 leading-relaxed">
              Creating awesome connections and unforgettable moments through
              exclusive content and personalized dating experiences
            </p>
          </section>

          {/* --- For Creators & For Fans Section --- */}
          <section className="w-full max-w-4xl flex flex-col items-center gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="flex flex-col text-center p-8 bg-white/10 border border-white/20 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-2">⭐ For Creators</h3>
                <p className="text-white/80 mb-4 text-sm">
                  Monetize your content and build your audience
                </p>
                <ul className="space-y-2 text-left text-sm text-white/90 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-green-300 flex-shrink-0 mt-0.5"
                    />{" "}
                    Sign up to create, connect, & earn
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-green-300 flex-shrink-0 mt-0.5"
                    />{" "}
                    Keep 80% of your earnings
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-green-300 flex-shrink-0 mt-0.5"
                    />{" "}
                    Direct fan engagement
                  </li>
                </ul>
                <Button
                  asChild
                  className="mt-auto w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:opacity-90 text-black font-bold py-6"
                >
                  <Link href="/creator-verification/kyc-policy">
                    Start Creating
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col text-center p-8 bg-white/10 border border-white/20 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-2">❤️ For Fans</h3>
                <p className="text-white/80 mb-4 text-sm">
                  Connect with amazing creators
                </p>
                <ul className="space-y-2 text-left text-sm text-white/90 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-green-300 flex-shrink-0 mt-0.5"
                    />{" "}
                    Exclusive content
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-green-300 flex-shrink-0 mt-0.5"
                    />{" "}
                    Direct creator interaction
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-green-300 flex-shrink-0 mt-0.5"
                    />{" "}
                    Premium experiences
                  </li>
                </ul>
                <Button
                  asChild
                  className="mt-auto w-full bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 font-bold py-6"
                >
                  <Link href="/fan-signup">Explore Creators</Link>
                </Button>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-white underline hover:text-white/80"
              >
                Sign In
              </Link>
            </p>
          </section>

          {/* --- Featured Creators Section --- */}
          <section className="w-full flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center mb-8">
              Featured Creators
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {featuredCreators.map((creator) => (
                <div
                  key={creator.name}
                  className="relative rounded-2xl overflow-hidden shadow-lg group"
                >
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                    <div className="flex items-center gap-1.5">
                      <p className="text-white font-bold text-base">
                        {creator.name}
                      </p>
                      {creator.isVerified && (
                        <Star
                          size={14}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      )}
                    </div>
                    <p className="text-white/80 text-sm">{creator.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              asChild
              variant="link"
              className="mt-8 text-white/80 hover:text-white"
            >
              <Link href="/earnings">
                Join 1,000+ creators earning on Hooks →
              </Link>
            </Button>
          </section>

          {/* --- Features Section --- */}
          <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <HeartHandshake
                className="mx-auto mb-4 text-pink-300"
                size={32}
              />
              <h4 className="font-semibold text-base mb-1">Smart Matching</h4>
              <p className="text-sm opacity-80">
                Advanced algorithm connecting creators with their ideal audience
              </p>
            </div>
            <div className="text-center p-6">
              <TrendingUp className="mx-auto mb-4 text-green-300" size={32} />
              <h4 className="font-semibold text-base mb-1">Creator Economy</h4>
              <p className="text-sm opacity-80">
                Monetize your content with subscriptions, tips, and exclusive
                access
              </p>
            </div>
            <div className="text-center p-6">
              <ShieldCheck className="mx-auto mb-4 text-blue-300" size={32} />
              <h4 className="font-semibold text-base mb-1">Safe & Secure</h4>
              <p className="text-sm opacity-80">
                Verified profiles and secure payments for peace of mind
              </p>
            </div>
            <div className="text-center p-6">
              <Zap className="mx-auto mb-4 text-yellow-300" size={32} />
              <h4 className="font-semibold text-base mb-1">Instant Connect</h4>
              <p className="text-sm opacity-80">
                Real-time messaging and live interactions with your favorite
                creators
              </p>
            </div>
          </section>

          {/* --- Creator Success Stories Section --- */}
          <section className="w-full flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center mb-8">
              Creator Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story) => (
                <Card
                  key={story.name}
                  className="bg-white/10 border-white/20 shadow-lg rounded-2xl text-center"
                >
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="flex flex-col items-center mb-4">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-16 h-16 rounded-full object-cover mb-3"
                      />
                      <div>
                        <h5 className="font-semibold text-white">
                          {story.name}
                        </h5>
                        <p className="text-white/70 text-xs">
                          {story.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm">
                      &quot;{story.story}&quot;
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="text-center flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2">
              Ready to Join the Movement?
            </h2>
            <p className="opacity-80 mb-8 max-w-md">
              Be part of Nigeria&apos;s premier creator economy platform
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                asChild
                className="bg-white text-pink-600 hover:bg-white/90 font-bold px-8 py-6 text-base"
              >
                <Link href="/creator-verification/kyc-policy">
                  Start as Creator
                </Link>
              </Button>
              <Button
                asChild
                className="bg-white/10 border-2 border-white/20 text-white hover:bg-white/20 font-bold px-8 py-6 text-base"
              >
                <Link href="/fan-signup">Join as Fan</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="container mx-auto text-center py-8 mt-16 border-t border-white/20">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/80">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link
              href="/creator-privacy"
              className="hover:text-white transition-colors"
            >
              Creator Policy
            </Link>
            <Link
              href="/creator-privacy"
              className="hover:text-white transition-colors"
            >
              Fan Policy
            </Link>
            <Link
              href="/community-guidelines"
              className="hover:text-white transition-colors"
            >
              Guidelines
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-xs text-white/70">
            &copy; {new Date().getFullYear()} Hooks. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

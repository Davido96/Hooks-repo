import { Crown, Star, Heart, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HomepageProps {
  onNavigate: (page: string) => void;
}

export default function Homepage({ onNavigate }: HomepageProps) {
  const featuredCreators = [
    {
      name: "Emma S.",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      age: 24,
    },
    {
      name: "Alex M.",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      age: 28,
    },
    {
      name: "Sarah J.",
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
      age: 26,
    },
    {
      name: "Marcus T.",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      age: 30,
    },
  ];

  const successStories = [
    {
      name: "Sarah A.",
      image:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100",
      story:
        "I've been able to connect with amazing fans and build a community that supports my content creation journey.",
    },
    {
      name: "Christina M.",
      image:
        "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=100",
      story:
        "Hooks has transformed my creative process and helped me monetize my passion in ways I never thought possible.",
    },
    {
      name: "Adrian C.",
      image:
        "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=100",
      story:
        "The platform's secure environment and instant connection features have made content creation both safe and profitable.",
    },
  ];

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(135deg, #FF6B6B 0%, #FF8E9B 50%, #C44E88 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-center p-4 md:p-6">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Hooks Logo"
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
          />
          <span className="text-xl md:text-2xl font-bold">Hooks</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center px-4 md:px-8 mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
          Creating awesome connections and unforgettable memories through
          <br className="hidden md:block" />
          exclusive content and personalized dating experiences
        </h1>
      </div>

      {/* For Creators & For Fans */}
      <div className="flex flex-col sm:flex-row gap-4 px-4 md:px-8 mb-8 md:mb-12">
        <div className="flex-1 text-center">
          <Star className="text-yellow-300 mx-auto mb-3" size={28} />
          <h3 className="text-lg font-semibold mb-2">For Creators</h3>
          <p className="text-sm opacity-90 mb-4">
            Monetize your content and build meaningful connections
          </p>
          <Button
            onClick={() => onNavigate("creator-signup")}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-semibold"
          >
            Start Creating
          </Button>
        </div>
        <div className="flex-1 text-center">
          <Star className="text-yellow-300 mx-auto mb-3" size={28} />
          <h3 className="text-lg font-semibold mb-2">For Fans</h3>
          <p className="text-sm opacity-90 mb-4">
            Discover and connect with your favorite creators
          </p>
          <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 font-semibold">
            Follow Creators
          </Button>
        </div>
      </div>

      {/* Featured Creators */}
      <div className="px-4 md:px-8 mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
          Featured Creators
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {featuredCreators.map((creator, index) => (
            <Card
              key={index}
              className="overflow-hidden border border-white/20 shadow-lg"
            >
              <CardContent className="p-0 relative">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                  <p className="text-white font-semibold text-sm md:text-base">
                    {creator.name}
                  </p>
                  <p className="text-white/80 text-xs md:text-sm">
                    {creator.age}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4 md:px-8 mb-8 md:mb-12">
        <div className="text-center bg-white/10 border border-white/20 rounded-lg p-4 shadow-lg">
          <Heart className="mx-auto mb-2 md:mb-3 text-pink-200" size={28} />
          <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">
            Smart Matching
          </h4>
          <p className="text-xs md:text-sm opacity-90">
            AI-powered connections based on interests and preferences
          </p>
        </div>
        <div className="text-center bg-white/10 border border-white/20 rounded-lg p-4 shadow-lg">
          <Crown className="mx-auto mb-2 md:mb-3 text-yellow-300" size={28} />
          <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">
            Create Content
          </h4>
          <p className="text-xs md:text-sm opacity-90">
            Share exclusive content and build your personal brand
          </p>
        </div>
        <div className="text-center bg-white/10 border border-white/20 rounded-lg p-4 shadow-lg">
          <Shield className="mx-auto mb-2 md:mb-3 text-green-300" size={28} />
          <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">
            Safe & Secure
          </h4>
          <p className="text-xs md:text-sm opacity-90">
            Advanced security features to protect your privacy
          </p>
        </div>
        <div className="text-center bg-white/10 border border-white/20 rounded-lg p-4 shadow-lg">
          <Zap className="mx-auto mb-2 md:mb-3 text-blue-300" size={28} />
          <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">
            Instant Connect
          </h4>
          <p className="text-xs md:text-sm opacity-90">
            Real-time messaging and instant notifications
          </p>
        </div>
      </div>

      {/* Creator Success Stories */}
      <div className="px-4 md:px-8 mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
          Creator Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {successStories.map((story, index) => (
            <Card key={index} className="bg-white/10 border-white/20 shadow-lg">
              <CardContent className="p-4 flex items-start gap-3">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <h5 className="font-semibold text-white mb-1 text-sm md:text-base">
                    {story.name}
                  </h5>
                  <p className="text-white/90 text-xs md:text-sm">
                    {story.story}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center px-4 md:px-8 pb-8 md:pb-12">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Ready to Join the Movement?
        </h2>
        <p className="opacity-90 mb-6 text-sm md:text-base">
          Be part of Nigeria's premier creator economy platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => onNavigate("creator-signup")}
            className="flex-1 bg-white text-pink-500 hover:bg-white/90 font-semibold"
          >
            Start as Creator
          </Button>
          <Button className="flex-1 bg-transparent border-2 border-white hover:bg-white/10 font-semibold">
            Join as Fan
          </Button>
        </div>
      </div>
    </div>
  );
}

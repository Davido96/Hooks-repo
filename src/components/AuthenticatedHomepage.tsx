import React, { useState } from "react";
import {
  Heart,
  X,
  Star,
  MessageCircle,
  User,
  LogOut,
  Crown,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Match } from "../types";
import { ROUTES, RouteType } from "../routes";

interface AuthenticatedHomepageProps {
  onNavigate: (route: RouteType) => void;
}

const AuthenticatedHomepage: React.FC<AuthenticatedHomepageProps> = ({
  onNavigate,
}) => {
  const { user, logout } = useAuth();
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);

  const matches: Match[] = [
    {
      id: "1",
      name: "Anita Campbell",
      age: 30,
      location: "2 km away • Victoria Island Lagos",
      bio: "Love traveling and exploring new cultures. Passionate about photography and good food.",
      interests: ["Sports", "Movies", "Fashion"],
      profilePicture:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      followers: 462,
      subscribers: 271,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      age: 28,
      location: "3 km away • Lekki Lagos",
      bio: "Fitness enthusiast and yoga instructor. Looking for someone who shares my passion for healthy living.",
      interests: ["Fitness", "Yoga", "Cooking"],
      profilePicture:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
      followers: 325,
      subscribers: 198,
    },
    {
      id: "3",
      name: "Emily Davis",
      age: 26,
      location: "5 km away • Ikoyi Lagos",
      bio: "Art lover and creative soul. Always looking for new adventures and meaningful connections.",
      interests: ["Art", "Music", "Travel"],
      profilePicture:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      followers: 542,
      subscribers: 389,
    },
  ];

  const currentMatch = matches[currentMatchIndex];

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setShowMatch(true);
      setTimeout(() => setShowMatch(false), 2000);
    }

    setTimeout(() => {
      setCurrentMatchIndex((prev) => (prev + 1) % matches.length);
    }, 300);
  };

  const handleLogout = () => {
    logout();
    onNavigate(ROUTES.HOMEPAGE);
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(135deg, #FF6B6B 0%, #FF8E9B 50%, #C44E88 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 pb-2">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Hooks Logo"
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
            onError={(e) => {
              // Fallback to Crown icon if logo fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <Crown className="text-yellow-300 w-6 h-6 md:w-8 md:h-8 hidden" />
          <h1 className="text-xl md:text-3xl font-bold text-white">Hooks</h1>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="flex items-center space-x-1 md:space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center">
              <User className="text-gray-600" size={16} />
            </div>
            <span className="text-white font-medium text-sm md:text-base hidden sm:block">
              {user?.fullName || "User"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 md:p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            title="Log out"
            aria-label="Log out"
          >
            <LogOut className="text-white" size={16} />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex px-3 md:px-4 mb-4">
        <button className="text-white text-sm font-medium mr-4 md:mr-6 pb-1 border-b-2 border-white">
          Discover
        </button>
        <button className="text-white/70 text-sm font-medium mr-4 md:mr-6 pb-1">
          Exclusive Content
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-center space-x-2 md:space-x-4 mb-6 md:mb-8 px-2 md:px-4">
        <div className="bg-orange-400 text-white px-2 py-1.5 md:px-3 md:py-2 rounded-lg flex-1 text-center max-w-[80px] md:max-w-none">
          <div className="text-base md:text-lg font-bold">0</div>
          <div className="text-xs">Premium (99)</div>
        </div>
        <div className="bg-green-500 text-white px-2 py-1.5 md:px-3 md:py-2 rounded-lg flex-1 text-center max-w-[80px] md:max-w-none">
          <div className="text-base md:text-lg font-bold">0</div>
          <div className="text-xs">Discover</div>
        </div>
        <div className="bg-blue-500 text-white px-2 py-1.5 md:px-3 md:py-2 rounded-lg flex-1 text-center max-w-[80px] md:max-w-none">
          <div className="text-base md:text-lg font-bold">0/20</div>
          <div className="text-xs">Daily limit</div>
        </div>
        <div className="bg-purple-500 text-white px-2 py-1.5 md:px-3 md:py-2 rounded-lg flex-1 text-center max-w-[80px] md:max-w-none">
          <div className="text-base md:text-lg font-bold">3</div>
          <div className="text-xs">Total matches</div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="flex justify-center px-3 md:px-4">
        <div className="relative w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="relative">
              <img
                src={currentMatch.profilePicture}
                alt={currentMatch.name}
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-pink-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
                Creator
              </div>

              {/* Profile Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4 text-white">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-lg md:text-xl font-bold">
                    {currentMatch.name}
                  </h2>
                  <span className="text-base md:text-lg">
                    {currentMatch.age}
                  </span>
                </div>

                <p className="text-xs md:text-sm mb-2 opacity-90">
                  {currentMatch.location}
                </p>

                <div className="flex items-center space-x-3 md:space-x-4 mb-2 md:mb-3">
                  <div className="flex items-center">
                    <User className="mr-1" size={12} />
                    <span className="text-xs">
                      {currentMatch.followers} followers
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1" size={12} />
                    <span className="text-xs">
                      {currentMatch.subscribers} subscribers
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {currentMatch.interests.map((interest) => (
                    <span
                      key={interest}
                      className="bg-white/20 text-white px-2 py-0.5 md:py-1 rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-3 md:space-x-4 mt-4 md:mt-6">
            <button
              onClick={() => handleSwipe("left")}
              className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
              title="Dislike"
              aria-label="Dislike"
            >
              <X className="text-gray-600 w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
              title="Super Like"
              aria-label="Super Like"
            >
              <Star className="text-yellow-500" size={18} />
            </button>

            <button
              className="w-12 h-12 md:w-14 md:h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
              title="Message"
              aria-label="Message"
            >
              <MessageCircle className="text-white" size={18} />
            </button>

            <button
              onClick={() => handleSwipe("right")}
              className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
              title="Like"
              aria-label="Like"
            >
              <Heart className="text-white" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="text-center mt-4 md:mt-6 text-white px-3 md:px-4">
        <p className="font-medium text-sm md:text-base">
          {matches.length} matches • {matches.length - currentMatchIndex - 1}{" "}
          profiles remaining
        </p>
        <p className="text-xs md:text-sm opacity-75 mt-1">
          You have 3 super likes remaining today
        </p>
      </div>

      {/* Success Match Modal */}
      {showMatch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 md:p-6 max-w-sm mx-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Heart className="text-pink-500 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
              Success
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Like sent, wait for user to accept match
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticatedHomepage;

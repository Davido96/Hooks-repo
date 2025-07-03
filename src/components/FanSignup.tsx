import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FanSignupProps {
  onNavigate: (page: string) => void;
}

export default function FanSignup({ onNavigate }: FanSignupProps) {
  const handleSignUp = () => {
    onNavigate("profile-setup");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6"
      style={{
        background:
          "linear-gradient(135deg, #FF6B6B 0%, #FF8E9B 50%, #C44E88 100%)",
      }}
    >
      {/* Logo - Fixed positioning */}
      <div className="flex items-center gap-2 mb-8 md:mb-12">
        <img
          src="/logo.png"
          alt="Hooks Logo"
          className="w-6 h-6 md:w-8 md:h-8 object-contain"
          onError={(e) => {
            // Fallback to Crown icon if logo fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.nextElementSibling?.classList.add("ml-0");
          }}
        />
        <Crown className="text-yellow-300 w-6 h-6 md:w-8 md:h-8 hidden" />
        <span className="text-2xl md:text-3xl font-bold text-white">Hooks</span>
      </div>

      <Card className="w-full max-w-sm md:max-w-md">
        <CardHeader className="text-center pb-4 md:pb-6">
          <CardTitle className="text-xl md:text-2xl font-bold mb-2">
            Get started!
          </CardTitle>
          <p className="text-gray-600 text-sm md:text-base">Sign Up as a Fan</p>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input id="email" type="email" className="h-10 md:h-11" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm">
              Password
            </Label>
            <Input id="password" type="password" className="h-10 md:h-11" />
            <div className="text-right">
              <button className="text-xs md:text-sm text-gray-500 hover:text-gray-700">
                Forgot Password?
              </button>
            </div>
          </div>

          <Button
            onClick={handleSignUp}
            className="w-full bg-gradient-to-r from-pink-500 to-red-400 hover:from-pink-600 hover:to-red-500 font-semibold text-white h-10 md:h-11"
          >
            Sign Up
          </Button>

          <p className="text-center text-xs md:text-sm text-gray-600">
            Already have an account?{" "}
            <button className="text-pink-500 hover:text-pink-600 font-medium">
              Sign In
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

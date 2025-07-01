import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreatorSignupProps {
  onNavigate: (page: string) => void;
}

export default function CreatorSignup({ onNavigate }: CreatorSignupProps) {
  const handleSignUp = () => {
    onNavigate("profile-setup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-6">
      {/* Logo */}
      <div className="absolute top-8 md:top-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        <Crown className="text-yellow-300" size={28} />
        <span className="text-2xl md:text-3xl font-bold text-white">Hooks</span>
      </div>

      <Card className="w-full max-w-sm md:max-w-md">
        <CardHeader className="text-center pb-4 md:pb-6">
          <CardTitle className="text-xl md:text-2xl font-bold mb-2">
            Get started!
          </CardTitle>
          <p className="text-gray-600 text-sm md:text-base">
            Sign Up as a creator
          </p>
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

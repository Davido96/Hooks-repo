import { useState } from "react";
import { Crown, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfileSetupProps {
  onNavigate: (page: string) => void;
}

export default function ProfileSetup({ onNavigate }: ProfileSetupProps) {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onNavigate("homepage");
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Basic Information";
      case 2:
        return "Location and Preferences";
      case 3:
        return "Interest";
      default:
        return "";
    }
  };

  const interests = [
    "Social Networking",
    "Dancing",
    "Fun Times",
    "Social",
    "Career",
    "Business",
    "Environment",
    "Fitness",
    "Nature Walks",
    "Sports & Recreation",
    "Running",
    "Cycling",
    "Comedy",
    "Coffee",
    "Night Walks",
    "Foodie",
    "Dating & Relationships",
  ];

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-6 py-8">
      {/* Logo */}
      <div className="absolute top-8 md:top-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        <Crown className="text-yellow-300" size={28} />
        <span className="text-2xl md:text-3xl font-bold text-white">Hooks</span>
      </div>

      <Card className="w-full max-w-sm md:max-w-md">
        <CardHeader className="text-center pb-4 md:pb-6">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                  num === step ? "bg-pink-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold mb-2">
            Set up your profile
          </CardTitle>
          <p className="text-gray-600 text-sm md:text-base">{getStepTitle()}</p>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {step === 1 && (
            <>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <Camera className="text-gray-400" size={20} />
                </div>
                <p className="text-xs md:text-sm text-gray-500">
                  Profile picture
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm">
                  Full Name
                </Label>
                <Input id="fullName" className="h-10 md:h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm">
                  Age
                </Label>
                <Input id="age" type="number" className="h-10 md:h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm">
                  Bio
                </Label>
                <Textarea id="bio" rows={3} className="resize-none" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm">
                  Gender
                </Label>
                <Select>
                  <SelectTrigger className="h-10 md:h-11">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interested" className="text-sm">
                  Interested In
                </Label>
                <Select>
                  <SelectTrigger className="h-10 md:h-11">
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="race" className="text-sm">
                  Race
                </Label>
                <Select>
                  <SelectTrigger className="h-10 md:h-11">
                    <SelectValue placeholder="Select race" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="hispanic">Hispanic</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm">
                  City
                </Label>
                <Input id="city" className="h-10 md:h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">
                  Phone number
                </Label>
                <Input id="phone" type="tel" className="h-10 md:h-11" />
              </div>
            </>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs md:text-sm text-gray-600 text-center">
                Select Interests To Help Us Connect You With Like-Minded People
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-2 py-1 md:px-3 md:py-2 rounded-full text-xs md:text-sm border transition-colors ${
                      selectedInterests.includes(interest)
                        ? "bg-pink-500 text-white border-pink-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={nextStep}
            className="w-full font-semibold text-white bg-gradient-to-r from-pink-500 to-red-400 hover:from-pink-600 hover:to-red-500 h-10 md:h-11"
          >
            {step === 3 ? "Complete Setup" : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

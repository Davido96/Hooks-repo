"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { ROUTES, RouteType } from "@/routes/routes";
import SuccessModal from "./SuccessModal";
import Image from "next/image";

interface ProfileData {
  fullName: string;
  age: string;
  bio: string;
  gender: string;
  interestedIn: string;
  country: string;
  city: string;
  phone: string;
  interests: string[];
  subscriptionFee: string;
  profilePicture?: File;
}
interface FormErrors {
  fullName?: string;
  age?: string;
  gender?: string;
  interestedIn?: string;
  country?: string;
  city?: string;
  phone?: string;
  subscriptionFee?: string;
}

export default function CreatorProfileSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "",
    age: "",
    bio: "",
    gender: "",
    interestedIn: "",
    country: "",
    city: "",
    phone: "",
    interests: [],
    subscriptionFee: "",
  });

  const interests = [
    "Social Networking",
    "Dancing",
    "Fun Times",
    "Social",
    "Career",
    "Business",
    "Fitness",
    "Nature Walks",
    "Sports",
    "Running",
    "Cycling",
    "Comedy",
    "Coffee",
    "Night Walks",
    "Foodie",
    "Dating",
  ];

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};
    if (currentStep === 1) {
      if (!profileData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!profileData.age.trim()) newErrors.age = "Age is required";
      else if (parseInt(profileData.age) < 18)
        newErrors.age = "You must be at least 18 years old";
    }
    if (currentStep === 2) {
      if (!profileData.gender) newErrors.gender = "Gender is required";
      if (!profileData.interestedIn)
        newErrors.interestedIn = "This preference is required";
      if (!profileData.country) newErrors.country = "Country is required";
      if (!profileData.city.trim()) newErrors.city = "City is required";
      if (!profileData.phone.trim())
        newErrors.phone = "Phone number is required";
    }
    if (currentStep === 3) {
      if (!profileData.subscriptionFee.trim())
        newErrors.subscriptionFee = "Subscription fee is required";
      else if (
        isNaN(Number(profileData.subscriptionFee)) ||
        Number(profileData.subscriptionFee) < 10
      )
        newErrors.subscriptionFee = "Minimum fee is 10";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        console.log("Profile setup completed:", profileData);
        setShowSuccessModal(true);
      }
    }
  };

  const handleSuccessComplete = () => {
    setShowSuccessModal(false);
    router.push(ROUTES.CREATOR_PROFILE);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  const updateProfileData = (
    field: keyof ProfileData,
    value: string | string[]
  ) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };
  const toggleInterest = (interest: string) => {
    const newInterests = profileData.interests.includes(interest)
      ? profileData.interests.filter((i) => i !== interest)
      : [...profileData.interests, interest];
    updateProfileData("interests", newInterests);
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileData((prev) => ({ ...prev, profilePicture: file }));
    }
  };
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Basic Information";
      case 2:
        return "Location & Preferences";
      case 3:
        return "Interests & Pricing";
      default:
        return "";
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col justify-between text-white"
        style={{
          background:
            "linear-gradient(160deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
        }}
      >
        <header className="absolute top-0 right-0 p-6 z-10">
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

        <main className="w-full flex-grow flex items-center justify-center p-4">
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-lg">
            <div className="text-center mb-8">
              <Link
                href="/"
                className="flex items-center justify-center mb-4 gap-3"
              >
                <Image src="/logo.png" alt="Hooks Logo" className="w-8 h-8" />
                <h1 className="text-3xl font-bold text-white">Hooks</h1>
              </Link>
              <h2 className="text-2xl font-bold text-white">
                Set up your profile
              </h2>
              <p className="text-white/70">{getStepTitle()}</p>
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white/60">
                    Step {step} of 3
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                        step >= s
                          ? "bg-gradient-to-r from-pink-500 to-red-400"
                          : "bg-white/20"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                nextStep();
              }}
            >
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex flex-col items-center space-y-2">
                    <label
                      htmlFor="pfp-upload"
                      className="relative cursor-pointer"
                    >
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20">
                        {profileData.profilePicture ? (
                          <img
                            src={URL.createObjectURL(
                              profileData.profilePicture
                            )}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera className="text-white/60" size={32} />
                        )}
                      </div>
                      <input
                        id="pfp-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0"
                      />
                    </label>
                    <p className="text-sm text-white/70">
                      Profile picture (optional)
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="fullName" className="text-white/80">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) =>
                        updateProfileData("fullName", e.target.value)
                      }
                      className={`text-white bg-white/10 border-white/20 placeholder:text-white/60 focus:ring-white/50 ${
                        errors.fullName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="age" className="text-white/80">
                      Age *
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={profileData.age}
                      onChange={(e) => updateProfileData("age", e.target.value)}
                      className={`text-white bg-white/10 border-white/20 placeholder:text-white/60 focus:ring-white/50 ${
                        errors.age ? "border-red-500" : ""
                      }`}
                    />
                    {errors.age && (
                      <p className="text-red-400 text-xs mt-1">{errors.age}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-white/80">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => updateProfileData("bio", e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="text-white bg-white/10 border-white/20 placeholder:text-white/60 focus:ring-white/50 resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <Label className="text-white/80">Gender *</Label>
                    <Select
                      value={profileData.gender}
                      onValueChange={(v) => updateProfileData("gender", v)}
                    >
                      <SelectTrigger
                        className={`text-white bg-white/10 border-white/20 focus:ring-white/50 ${
                          errors.gender ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-white/20 text-white">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/80">Interested In *</Label>
                    <Select
                      value={profileData.interestedIn}
                      onValueChange={(v) =>
                        updateProfileData("interestedIn", v)
                      }
                    >
                      <SelectTrigger
                        className={`text-white bg-white/10 border-white/20 focus:ring-white/50 ${
                          errors.interestedIn ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-white/20 text-white">
                        <SelectItem value="Men">Men</SelectItem>
                        <SelectItem value="Women">Women</SelectItem>
                        <SelectItem value="Everyone">Everyone</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.interestedIn && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.interestedIn}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/80">Country *</Label>
                    <Select
                      value={profileData.country}
                      onValueChange={(v) => updateProfileData("country", v)}
                    >
                      <SelectTrigger
                        className={`text-white bg-white/10 border-white/20 focus:ring-white/50 ${
                          errors.country ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-white/20 text-white">
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/80">City *</Label>
                    <Input
                      value={profileData.city}
                      onChange={(e) =>
                        updateProfileData("city", e.target.value)
                      }
                      className={`text-white bg-white/10 border-white/20 placeholder:text-white/60 focus:ring-white/50 ${
                        errors.city ? "border-red-500" : ""
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/80">Phone Number *</Label>
                    <Input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        updateProfileData("phone", e.target.value)
                      }
                      className={`text-white bg-white/10 border-white/20 placeholder:text-white/60 focus:ring-white/50 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <Label className="text-white/80">
                      Monthly subscription fee (Minimum: 10) *
                    </Label>
                    <Input
                      type="number"
                      min="10"
                      value={profileData.subscriptionFee}
                      onChange={(e) =>
                        updateProfileData("subscriptionFee", e.target.value)
                      }
                      className={`text-white bg-white/10 border-white/20 placeholder:text-white/60 focus:ring-white/50 ${
                        errors.subscriptionFee ? "border-red-500" : ""
                      }`}
                    />
                    {errors.subscriptionFee && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.subscriptionFee}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/80 text-center block mb-2">
                      Select interests to connect with like-minded people
                    </Label>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {interests.map((interest) => (
                        <Button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          variant="outline"
                          size="sm"
                          className={`rounded-full transition-colors ${
                            profileData.interests.includes(interest)
                              ? "bg-pink-500 border-pink-500 text-white hover:bg-pink-600"
                              : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
                          }`}
                        >
                          {interest}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 border-white/50 text-black bg-white/10 hover:bg-white/10 hover:text-white"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  className={`font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 ${
                    step === 1 ? "w-full" : "flex-1"
                  }`}
                >
                  {step === 3 ? "Complete Setup" : "Continue"}
                </Button>
              </div>
            </form>
          </div>
        </main>

        <footer className="w-full container mx-auto text-center py-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/80">
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/guidelines"
                className="hover:text-white transition-colors"
              >
                Guidelines
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <p className="text-xs text-white/70">
              &copy; {new Date().getFullYear()} Hooks. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onComplete={handleSuccessComplete}
        role="Creator"
      />
    </>
  );
}

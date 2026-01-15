"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera } from "lucide-react";
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
import { ROUTES } from "@/routes/routes";
import SuccessModal from "../../components/SuccessModal";
import Image from "next/image";

interface ProfileData {
  fullName: string;
  age: string;
  bio: string;
  gender: string;
  interestedIn: string;
  state: string;
  city: string;
  phone: string;
  interests: string[];
  profilePicture?: File;
}
interface FormErrors {
  fullName?: string;
  age?: string;
  gender?: string;
  interestedIn?: string;
  state?: string;
  city?: string;
  phone?: string;
}

export default function FanProfileSetup() {
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
    state: "",
    city: "",
    phone: "",
    interests: [],
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
    "Sports & Recreation",
    "Running",
    "Cycling",
    "Comedy",
    "Coffee",
    "Night Walks",
    "Foodie",
    "Dating & Relationships",
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
      if (!profileData.state) newErrors.state = "State is required";
      if (!profileData.city.trim()) newErrors.city = "City is required";
      if (!profileData.phone.trim())
        newErrors.phone = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        console.log("Fan profile setup completed:", profileData);
        setShowSuccessModal(true);
      }
    }
  };

  const handleSuccessComplete = () => {
    setShowSuccessModal(false);
    router.push(ROUTES.AUTHENTICATED_HOMEPAGE);
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
        return "Location and Preferences";
      case 3:
        return "Interest";
      default:
        return "";
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{
          background:
            "linear-gradient(160deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
        }}
      >
        <header className="w-full max-w-md mb-4">
          <div className="relative flex justify-center items-center">
            <button
              onClick={step > 1 ? prevStep : () => router.back()}
              className="absolute left-0 text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Hooks Logo" className="w-8 h-8" />
              <span className="text-3xl font-bold text-white">Hooks</span>
            </Link>
          </div>
        </header>

        <main className="bg-white text-black rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                    step >= s
                      ? "bg-gradient-to-r from-pink-500 to-red-500"
                      : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-black">
              Set up your profile
            </h2>
            <p className="text-gray-500">{getStepTitle()}</p>
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
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                      {profileData.profilePicture ? (
                        <Image
                          src={URL.createObjectURL(profileData.profilePicture)}
                          alt="Profile preview"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="text-gray-400" size={32} />
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
                  <p className="text-sm text-gray-500">Display picture</p>
                </div>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) =>
                      updateProfileData("fullName", e.target.value)
                    }
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profileData.age}
                    onChange={(e) => updateProfileData("age", e.target.value)}
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => updateProfileData("bio", e.target.value)}
                    className="resize-none"
                    rows={4}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <Label>Gender</Label>
                  <Select
                    value={profileData.gender}
                    onValueChange={(v) => updateProfileData("gender", v)}
                  >
                    <SelectTrigger
                      className={errors.gender ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
                <div>
                  <Label>Interested In</Label>
                  <Select
                    value={profileData.interestedIn}
                    onValueChange={(v) => updateProfileData("interestedIn", v)}
                  >
                    <SelectTrigger
                      className={errors.interestedIn ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Men">Men</SelectItem>
                      <SelectItem value="Women">Women</SelectItem>
                      <SelectItem value="Everyone">Everyone</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.interestedIn && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.interestedIn}
                    </p>
                  )}
                </div>
                <div>
                  <Label>State</Label>
                  <Select
                    value={profileData.state}
                    onValueChange={(v) => updateProfileData("state", v)}
                  >
                    <SelectTrigger
                      className={errors.state ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lagos">Lagos</SelectItem>
                      <SelectItem value="Abuja">Abuja</SelectItem>
                      <SelectItem value="Rivers">Rivers</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                  )}
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    value={profileData.city}
                    onChange={(e) => updateProfileData("city", e.target.value)}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => updateProfileData("phone", e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in text-center">
                <p className="text-sm text-gray-600">
                  Select interests to help us connect you with like-minded
                  people
                </p>
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
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6">
              <Button
                type="submit"
                className="w-full font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90"
              >
                {step === 3 ? "Complete Setup" : "Continue"}
              </Button>
            </div>
          </form>
        </main>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onComplete={handleSuccessComplete}
        role="Fan"
      />
    </>
  );
}

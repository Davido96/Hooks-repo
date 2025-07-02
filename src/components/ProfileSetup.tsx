import { useState } from "react";
import { Camera } from "lucide-react";
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

interface ProfileData {
  fullName: string;
  age: string;
  bio: string;
  gender: string;
  interestedIn: string;
  race: string;
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
  city?: string;
  phone?: string;
}

export default function ProfileSetup({ onNavigate }: ProfileSetupProps) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "",
    age: "",
    bio: "",
    gender: "",
    interestedIn: "",
    race: "",
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

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!profileData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!profileData.age.trim()) {
        newErrors.age = "Age is required";
      } else if (
        parseInt(profileData.age) < 18 ||
        parseInt(profileData.age) > 100
      ) {
        newErrors.age = "Age must be between 18 and 100";
      }
    }

    if (currentStep === 2) {
      if (!profileData.gender) {
        newErrors.gender = "Gender is required";
      }
      if (!profileData.interestedIn) {
        newErrors.interestedIn = "Interest preference is required";
      }
      if (!profileData.city.trim()) {
        newErrors.city = "City is required";
      }
      if (!profileData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[\d\s-()]+$/.test(profileData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        // Handle profile completion
        console.log("Profile setup completed:", profileData);
        onNavigate("homepage");
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const updateProfileData = (
    field: keyof ProfileData,
    value: string | string[]
  ) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
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
      setProfileData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Basic Information";
      case 2:
        return "Location and Preferences";
      case 3:
        return "Interests";
      default:
        return "";
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-8"
      style={{
        background:
          "linear-gradient(135deg, #FF6B6B 0%, #FF8E9B 50%, #C44E88 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6 md:mb-8">
        <img
          src="/logo.png"
          alt="Hooks Logo"
          className="w-6 h-6 md:w-8 md:h-8 object-contain"
          onError={(e) => {
            // Fallback to Crown icon if logo fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        <span className="text-2xl md:text-3xl font-bold text-white">Hooks</span>
      </div>

      <Card className="w-full max-w-sm md:max-w-md">
        <CardHeader className="text-center pb-4 md:pb-6">
          {/* Progress Line */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">Step {step} of 3</span>
              <span className="text-xs text-gray-500">
                {Math.round((step / 3) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-red-400 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <CardTitle className="text-xl md:text-2xl font-bold mb-2">
            Set up your profile
          </CardTitle>
          <p className="text-gray-600 text-sm md:text-base">{getStepTitle()}</p>
        </CardHeader>

        <CardContent className="space-y-4 md:space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
          >
            {step === 1 && (
              <>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                      {profileData.profilePicture ? (
                        <img
                          src={URL.createObjectURL(profileData.profilePicture)}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="text-gray-400" size={20} />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      aria-label="Upload profile picture"
                    />
                  </div>
                  <p className="text-xs md:text-sm text-gray-500">
                    Profile picture (optional)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    className={`h-10 md:h-11 ${
                      errors.fullName ? "border-red-500" : ""
                    }`}
                    value={profileData.fullName}
                    onChange={(e) =>
                      updateProfileData("fullName", e.target.value)
                    }
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="text-red-500 text-xs">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="100"
                    className={`h-10 md:h-11 ${
                      errors.age ? "border-red-500" : ""
                    }`}
                    value={profileData.age}
                    onChange={(e) => updateProfileData("age", e.target.value)}
                    aria-describedby={errors.age ? "age-error" : undefined}
                  />
                  {errors.age && (
                    <p id="age-error" className="text-red-500 text-xs">
                      {errors.age}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    rows={3}
                    className="resize-none"
                    value={profileData.bio}
                    onChange={(e) => updateProfileData("bio", e.target.value)}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm">
                    Gender *
                  </Label>
                  <Select
                    value={profileData.gender}
                    onValueChange={(value) =>
                      updateProfileData("gender", value)
                    }
                  >
                    <SelectTrigger
                      className={`h-10 md:h-11 ${
                        errors.gender ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs">{errors.gender}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interested" className="text-sm">
                    Interested In *
                  </Label>
                  <Select
                    value={profileData.interestedIn}
                    onValueChange={(value) =>
                      updateProfileData("interestedIn", value)
                    }
                  >
                    <SelectTrigger
                      className={`h-10 md:h-11 ${
                        errors.interestedIn ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="everyone">Everyone</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.interestedIn && (
                    <p className="text-red-500 text-xs">
                      {errors.interestedIn}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="race" className="text-sm">
                    Race/Ethnicity
                  </Label>
                  <Select
                    value={profileData.race}
                    onValueChange={(value) => updateProfileData("race", value)}
                  >
                    <SelectTrigger className="h-10 md:h-11">
                      <SelectValue placeholder="Select race/ethnicity (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">
                        Black/African American
                      </SelectItem>
                      <SelectItem value="white">White/Caucasian</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
                      <SelectItem value="native">Native American</SelectItem>
                      <SelectItem value="pacific">Pacific Islander</SelectItem>
                      <SelectItem value="mixed">Mixed Race</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm">
                    City *
                  </Label>
                  <Input
                    id="city"
                    className={`h-10 md:h-11 ${
                      errors.city ? "border-red-500" : ""
                    }`}
                    value={profileData.city}
                    onChange={(e) => updateProfileData("city", e.target.value)}
                    placeholder="Enter your city"
                    aria-describedby={errors.city ? "city-error" : undefined}
                  />
                  {errors.city && (
                    <p id="city-error" className="text-red-500 text-xs">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className={`h-10 md:h-11 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    value={profileData.phone}
                    onChange={(e) => updateProfileData("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-red-500 text-xs">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-xs md:text-sm text-gray-600 text-center">
                  Select interests to help us connect you with like-minded
                  people
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Select your interests"
                >
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-2 py-1 md:px-3 md:py-2 rounded-full text-xs md:text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                        profileData.interests.includes(interest)
                          ? "bg-pink-500 text-white border-pink-500"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                      aria-pressed={profileData.interests.includes(interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                {profileData.interests.length > 0 && (
                  <p className="text-xs text-gray-500 text-center">
                    {profileData.interests.length} interest
                    {profileData.interests.length !== 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 h-10 md:h-11"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className={`font-semibold text-white bg-gradient-to-r from-pink-500 to-red-400 hover:from-pink-600 hover:to-red-500 h-10 md:h-11 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                  step === 1 ? "w-full" : "flex-1"
                }`}
                disabled={step === 3 && profileData.interests.length === 0}
              >
                {step === 3 ? "Complete Setup" : "Continue"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

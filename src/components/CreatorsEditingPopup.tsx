"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useProfileStore } from "@/stores/profileStore";
import { interestOptions } from "./modals/EditProfileModal";
import toast from "react-hot-toast";

type Location<T> = {
  name: T;
  cities: T[];
};

const locationData: Location<string>[] = [
  { name: "Lagos", cities: ["Ikeja", "Lekki", "Victoria Island", "Yaba"] },
  { name: "Abuja", cities: ["Garki", "Wuse", "Asokoro", "Maitama"] },
  { name: "Rivers", cities: ["Port Harcourt", "Bonny Island", "Okrika"] },
  { name: "Oyo", cities: ["Ibadan", "Ogbomosho", "Iseyin"] },
];

interface Props {
  onClose: () => void;
}

const CreatorsEditingPopup: React.FC<Props> = ({ onClose }) => {
  const inpRef = useRef<HTMLInputElement>(null);
  const { profile, updateProfile, loading } = useProfileStore();

  const [previewImage, setPreviewImage] = useState<string | null>(
    profile?.display_pic || null
  );

  const [formFields, setFormFields] = useState<{
    full_name: string;
    gender: "Male" | "Female" | "Other" | null;
    age: number | undefined;
    bio: string;
    display_pic?: File;
    interests: string[];
    monthly_sub_keys: string;
  }>({
    full_name: profile?.full_name || "",
    gender: profile?.gender || "Male",
    age: profile?.age || 18,
    bio: profile?.bio || "",
    interests: profile?.interests || [],
    monthly_sub_keys: "",
  });

  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (value: string) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      interests: prevFields.interests.includes(value)
        ? prevFields.interests.filter((item) => item !== value)
        : [...prevFields.interests, value],
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      if (image.size > 2 * 1024 * 1024) {
        toast.error("File is too large. Maximum size is 2MB");
        return;
      }
      setFormFields((prev) => ({
        ...prev,
        display_pic: image,
      }));
      setPreviewImage(URL.createObjectURL(image));
    }
    console.log(image);
  };

  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");

  const handleStateChange = (stateName: string) => {
    const state = locationData.find((s) => s.name === stateName);
    setSelectedState(stateName);
    setCities(state ? state.cities : []);
    setSelectedCity("");
  };

  const handleFormSubmission = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formFields);
      onClose();
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4">
      {/* Modal Content */}
      <div className="h-[90vh] w-full max-w-3xl overflow-y-scroll hide-scrollbar rounded-lg bg-white p-8 scrollbar-thin">
        <div className="flex flex-col gap-8">
          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
          </div>

          {/* Profile Photo Section */}
          <div className="flex flex-col items-center gap-4">
            {previewImage ? (
              <Image
                width={96}
                height={96}
                src={previewImage}
                className="w-24 h-24 pointer-events-none object-cover rounded-full"
                alt={`${formFields.full_name.split(" ")[0]} profile picture`}
              />
            ) : (
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #F472B6, #EF4444)",
                }}
                className="flex size-24 items-center justify-center rounded-full text-4xl font-bold text-white"
              >
                {profile?.full_name[0]}
              </div>
            )}
            <Button
              onClick={() => inpRef.current?.click()}
              variant="outline"
              className="bg-transparent text-sm font-semibold text-slate-800 shadow-none"
            >
              Change Photo
            </Button>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={inpRef}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmission} className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-bold">Basic Information</h3>
              {/* name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <Input
                  type="text"
                  name="full_name"
                  value={formFields.full_name}
                  onChange={handleOnchange}
                  autoComplete="off"
                />
              </div>
              {/* age */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="age">
                  Age
                </label>
                <Input
                  value={formFields.age}
                  onChange={handleOnchange}
                  type="number"
                  min={18}
                  name="age"
                  placeholder="Enter your age"
                />
              </div>
              {/* bio */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="bio">
                  Bio
                </label>
                <Textarea
                  value={formFields.bio}
                  onChange={handleOnchange}
                  className="h-24 resize-none"
                  name="bio"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* location */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-bold">Location</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* State Dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="state" className="text-sm font-medium">
                    State
                  </label>
                  <Select
                    value={selectedState}
                    onValueChange={handleStateChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationData.map((state) => (
                        <SelectItem key={state.name} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* City Dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    City
                  </label>
                  <Select
                    value={selectedCity}
                    onValueChange={setSelectedCity}
                    disabled={!selectedState}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* interests */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-bold">Interests</h3>
              <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg">
                {interestOptions.map((interest) => (
                  <Button
                    type="button"
                    key={interest}
                    variant={
                      formFields.interests.includes(interest)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => handleInterestToggle(interest)}
                    className={`rounded-full capitalize cursor-pointer transition-all duration-200 ${
                      formFields.interests.includes(interest)
                        ? "bg-pink-500 text-white"
                        : ""
                    }`}
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>

            {/* monthly subs */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-bold">Creator Settings</h3>
              <div className="flex flex-col gap-2">
                <label htmlFor="subscription" className="text-sm font-medium">
                  Default Monthly Subscription Rate
                </label>
                <Input
                  type="text"
                  name="subscription"
                  placeholder="e.g 10 (10000 Naira)"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {/* withdrawal pin */}
              <h3 className="text-lg font-bold">Withdrawal PIN</h3>
              <p className="text-sm text-slate-600 -mt-4">
                Set up a 4-digit PIN to secure your withdrawals.
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="new-pin" className="text-sm font-medium">
                    New PIN
                  </label>
                  <Input
                    type="password"
                    name="new-pin"
                    maxLength={4}
                    placeholder="Enter 4-digit PIN"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirm-pin" className="text-sm font-medium">
                    Confirm New PIN
                  </label>
                  <Input
                    type="password"
                    name="confirm-pin"
                    maxLength={4}
                    placeholder="Confirm PIN"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 border-t pt-6">
              <Button
                variant="outline"
                disabled={loading}
                type="button"
                className="font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex-1 text-slate-800"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                type="submit"
                // onClick={handleFormSubmission}
                className="bg-gradient-to-r disabled:opacity-50 disabled:cursor-not-allowed flex-1 from-pink-500 to-red-500 font-semibold text-white"
              >
                {!loading ? "Save Changes" : "Saving..."}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatorsEditingPopup;

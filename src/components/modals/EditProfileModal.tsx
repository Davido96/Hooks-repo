import React, { useState, useEffect, useRef } from "react";
import { useProfileStore } from "@/stores/profileStore";
import { Profile, ProfileUpdatePayload } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: Profile;
}

export const interestOptions = [
  "social networking",
  "dancing",
  "fun times",
  "social",
  "career",
  "business",
  "environment",
  "fitness",
  "nature",
  "sports",
  "recreation",
  "running",
  "cycling",
  "comedy",
  "coffee",
  "night walks",
  "foodie",
  "dating",
  "relationship",
  "others",
];

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const { updateProfile, loading, getProfile } = useProfileStore();
  const [formData, setFormData] = useState<ProfileUpdatePayload>({
    full_name: "",
    bio: "",
    gender: null,
    age: undefined,
    state: "",
    city: "",
    interests: [],
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        full_name: currentUser.full_name || "",
        bio: currentUser.bio || "",
        gender: currentUser.gender || null,
        age: currentUser.age || undefined,
        state: currentUser.state || "",
        city: currentUser.city || "",
        interests: currentUser.interests || [],
      });
      setPreviewImage(currentUser.display_pic || null);
    }
  }, [currentUser]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? (value ? parseInt(value, 10) : undefined) : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          display_pic: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const currentInterests = prev.interests || [];
      const updatedInterests = currentInterests.includes(interest)
        ? currentInterests.filter((i) => i !== interest)
        : [...currentInterests, interest];
      return {
        ...prev,
        interests: updatedInterests,
      };
    });
  };

  const handleSaveChanges = async () => {
    try {
      await updateProfile(formData);
      await getProfile();
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (!isOpen || !currentUser) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-2xl shadow-lg relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-gray-900 scrollbar-thin">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-full bg-pink-500 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  currentUser.full_name?.charAt(0).toUpperCase() || "?"
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
              >
                <Upload size={18} />
                Upload
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="full_name"
                  value={formData.full_name || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <Input
                  type="number"
                  name="age"
                  value={formData.age || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                  className="w-full"
                  min="18"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      gender: (e.target.value as "Male" | "Female" | "Other") || null,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <Textarea
              name="bio"
              value={formData.bio || ""}
              onChange={handleInputChange}
              placeholder="Tell us about yourself..."
              className="w-full h-24 resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <Input
                  type="text"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your state"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-semibold mb-3">Interests</label>
            <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg">
              {interestOptions.map((interest) => (
                <Button
                  key={interest}
                  variant={
                    formData.interests?.includes(interest) ? "default" : "outline"
                  }
                  size="sm"
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`rounded-full transition-all duration-200 ${
                    formData.interests?.includes(interest)
                      ? "bg-pink-500 text-white"
                      : ""
                  }`}
                >
                  {interest}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 p-6 border-t border-gray-200 sticky bottom-0 bg-white z-10">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            disabled={loading}
            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

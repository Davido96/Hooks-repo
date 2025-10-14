// import React, { useState, useEffect, useRef } from "react";
// import { useProfileStore } from "@/stores/profileStore";
// import { Profile, ProfileUpdatePayload } from "@/types";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { X, Upload } from "lucide-react";
// import Image from "next/image";
// import toast from "react-hot-toast";

// interface EditProfileModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   currentUser: Profile;
// }

// export const interestOptions = [
//   "social networking",
//   "dancing",
//   "fun times",
//   "social",
//   "career",
//   "business",
//   "environment",
//   "fitness",
//   "nature",
//   "sports",
//   "recreation",
//   "running",
//   "cycling",
//   "comedy",
//   "coffee",
//   "night walks",
//   "foodie",
//   "dating",
//   "relationship",
//   "others",
// ];

// const EditProfileModal: React.FC<EditProfileModalProps> = ({
//   isOpen,
//   onClose,
//   currentUser,
// }) => {
//   const { updateProfile, loading } = useProfileStore();
//   const [formData, setFormData] = useState<ProfileUpdatePayload>({
//     full_name: "",
//     bio: "",
//     gender: null,
//     state: "",
//     city: "",
//     interests: [],
//   });
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (currentUser) {
//       setFormData({
//         full_name: currentUser.full_name || "",
//         bio: currentUser.bio || "",
//         gender: currentUser.gender || null,
//         state: currentUser.state || "",
//         city: currentUser.city || "",
//         interests: currentUser.interests || [],
//       });
//       setPreviewImage(currentUser.display_pic || null);
//     }
//   }, [currentUser]);

//   if (!isOpen) return null;

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         toast.error("File is too large. Maximum size is 2MB.");
//         return;
//       }
//       setFormData((prev) => ({ ...prev, display_pic: file }));
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleInterestToggle = (interest: string) => {
//     setFormData((prev) => {
//       const currentInterests = prev.interests || [];
//       const newInterests = currentInterests.includes(interest)
//         ? currentInterests.filter((i) => i !== interest)
//         : [...currentInterests, interest];
//       return { ...prev, interests: newInterests };
//     });
//   };

//   const handleSaveChanges = async () => {
//     try {
//       await updateProfile(formData);
//       onClose();
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0  flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto shadow-2xl animate-in fade-in-0 zoom-in-95">
//         {/* Header */}
//         <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200 sticky top-0 bg-white z-10">
//           <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={onClose}
//             className="rounded-full"
//           >
//             <X className="h-5 w-5" />
//           </Button>
//         </div>

//         <div className="p-6 space-y-8">
//           {/* Profile Photo */}
//           <div className="text-center">
//             <Image
//               src={previewImage || "/default-avatar.png"}
//               alt="Profile Preview"
//               width={96}
//               height={96}
//               className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-gray-100 shadow-sm"
//             />
//             <input
//               type="file"
//               title="profile picture"
//               accept=".jpg,.jpeg,.png"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               className="hidden"
//             />
//             <Button
//               variant="outline"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <Upload className="w-4 h-4 mr-2" />
//               Change Photo
//             </Button>
//           </div>

//           {/* Form Fields */}
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Name
//               </label>
//               <Input
//                 type="text"
//                 name="full_name"
//                 value={formData.full_name || ""}
//                 onChange={handleInputChange}
//                 placeholder="Enter your name"
//                 className="w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Bio
//               </label>
//               <Textarea
//                 name="bio"
//                 value={formData.bio || ""}
//                 onChange={handleInputChange}
//                 placeholder="Tell us about yourself..."
//                 rows={3}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Gender
//                 </label>
//                 <select
//                   name="gender"
//                   title="gender"
//                   value={formData.gender || ""}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-lg bg-white"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   State
//                 </label>
//                 <Input
//                   type="text"
//                   name="state"
//                   value={formData.state || ""}
//                   onChange={handleInputChange}
//                   placeholder="Enter your state"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   City
//                 </label>
//                 <Input
//                   type="text"
//                   name="city"
//                   value={formData.city || ""}
//                   onChange={handleInputChange}
//                   placeholder="Enter your city"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Interests
//               </label>
//               <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg">
//                 {interestOptions.map((interest) => (
//                   <Button
//                     key={interest}
//                     variant={
//                       formData.interests?.includes(interest)
//                         ? "default"
//                         : "outline"
//                     }
//                     size="sm"
//                     onClick={() => handleInterestToggle(interest)}
//                     className={`rounded-full transition-all duration-200 ${
//                       formData.interests?.includes(interest)
//                         ? "bg-pink-500 text-white"
//                         : ""
//                     }`}
//                   >
//                     {interest}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-4 p-6 border-t border-gray-200 sticky bottom-0 bg-white z-10">
//           <Button variant="outline" onClick={onClose} className="flex-1">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSaveChanges}
//             disabled={loading}
//             className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
//           >
//             {loading ? "Saving..." : "Save Changes"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfileModal;
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
  const { updateProfile, loading } = useProfileStore();
  const [formData, setFormData] = useState<ProfileUpdatePayload>({
    full_name: "",
    bio: "",
    gender: null,
    state: "",
    city: "",
    interests: [],
    age: undefined,
    country: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        full_name: currentUser.full_name || "",
        bio: currentUser.bio || "",
        gender: currentUser.gender || null,
        state: currentUser.state || "",
        city: currentUser.city || "",
        interests: currentUser.interests || [],
        age: currentUser.age || undefined,
        country: currentUser.country || "",
      });
      setPreviewImage(currentUser.display_pic || null);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File is too large. Maximum size is 2MB.");
        return;
      }
      setFormData((prev) => ({ ...prev, display_pic: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const currentInterests = prev.interests || [];
      const newInterests = currentInterests.includes(interest)
        ? currentInterests.filter((i) => i !== interest)
        : [...currentInterests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleSaveChanges = async () => {
    if (formData.age && formData.age < 18) {
      toast.error("Age must be 18 or above.");
      return;
    }

    try {
      await updateProfile(formData);
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto shadow-2xl animate-in fade-in-0 zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Profile Photo */}
          <div className="text-center">
            <Image
              src={previewImage || "/default-avatar.png"}
              alt="Profile Preview"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-gray-100 shadow-sm"
            />
            <input
              type="file"
              title="profile picture"
              accept=".jpg,.jpeg,.png"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                type="text"
                name="full_name"
                value={formData.full_name || ""}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <Textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  title="gender"
                  value={formData.gender || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <Input
                  type="number"
                  name="age"
                  value={formData.age || ""}
                  onChange={handleInputChange}
                  min={18}
                  placeholder="Enter your age"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <Input
                  type="text"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your state"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <Input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleInputChange}
                placeholder="Enter your country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interests
              </label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg">
                {interestOptions.map((interest) => (
                  <Button
                    key={interest}
                    variant={
                      formData.interests?.includes(interest)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
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

"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormFields {
  fullName: string;
  dob: string;
  address: string;
  phoneNumber: string;
}

export default function Verification({ isOpen, onClose }: Props) {
  const [formFields, setFormFields] = useState<FormFields>({
    fullName: "",
    dob: "",
    address: "",
    phoneNumber: "",
  });

  const [idLivePicture, setIdLivePicture] = useState<File | null>(null);
  const [govtId, setGovtId] = useState<File | null>(null);

  const idLivePictureRef = useRef<HTMLInputElement>(null);
  const govtIdRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { fullName, dob, address, phoneNumber } = formFields;

    // validation
    if (
      !fullName ||
      !dob ||
      !address ||
      !phoneNumber ||
      !govtId ||
      !idLivePicture
    ) {
      toast.error("Kindly fill out all required fields");
      return;
    }

    // check if age >= 18
    const birthDate = new Date(dob);
    const today = new Date();
    const age =
      today.getFullYear() -
      birthDate.getFullYear() -
      (today <
      new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
        ? 1
        : 0);

    if (age < 18) {
      toast.error("You must be at least 18 years old to verify.");
      return;
    }

    if (!/^[0-9]+$/.test(phoneNumber) || phoneNumber.length <= 7) {
      toast.error("Kindly put in a valid phone number (no codes allowed)");
      return;
    }

    console.log({ ...formFields, govtId, idLivePicture });
    toast.success("Verification submitted successfully!");
    onClose();
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const reasons = [
    "Get priority in matching algorithms",
    "Build trust with other verified users",
    "Access exclusive verified-only features",
    "Increase your profile credibility",
  ];

  const privacy = [
    "Your documents are encrypted and stored securely",
    "Information is only used for verification purposes",
    "We comply with all data protection regulations",
    "Documents are permanently deleted after verification",
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4">
      <div className="w-[685px] overflow-scroll hide-scrollbar h-[90vh] rounded-[8px]">
        {/* HEADER */}
        <div className="bg-verification-header border border-verification-header-border min-h-[174px] p-6 rounded-[8px] flex flex-col md:flex-row items-center md:items-start gap-4">
          <Image
            src={"/blueVerification.svg"}
            alt="blue verification"
            className="size-8"
            width={32}
            height={32}
          />
          <div>
            <h1 className="font-bold text-verification-blue-heading leading-[24px] mb-2">
              Why verify your identity?
            </h1>
            <ul className="flex flex-col gap-y-1">
              {reasons.map((reason, i) => (
                <li
                  className="text-verification-blue-text text-sm leading-[20px]"
                  key={i}
                >
                  • {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FORM */}
        <div className="mt-6 p-6 bg-verification-main-bg rounded-[8px]">
          <Image
            src={"/pinkVerification.svg"}
            alt="pink verification icon"
            className="block mx-auto"
            width={48}
            height={48}
          />
          <h1 className="text-center text-verification-darkBlue-heading text-xl font-bold leading-[28px] mt-2">
            Complete your verification
          </h1>
          <p className="text-verification-dull-text text-center text-sm leading-[20px]">
            All information is kept secure and confidential
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-y-5">
            {/* Personal Info */}
            <div className="flex gap-2 items-center">
              <Image
                src={"/dropDownUser.svg"}
                alt="user"
                width={20}
                height={20}
              />
              <h3 className="font-bold leading-[24px]">Personal Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm mb-1 leading-[14.7px]"
                >
                  Full Name*
                </label>
                <Input
                  name="fullName"
                  value={formFields.fullName}
                  onChange={handleOnChange}
                  className="bg-white"
                  placeholder="Enter your full legal name"
                />
              </div>
              <div>
                <label htmlFor="dob" className="text-sm mb-1 leading-[14.7px]">
                  Date of Birth*
                </label>
                <Input
                  type="date"
                  className="bg-white"
                  name="dob"
                  value={formFields.dob}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="text-sm mb-1 leading-[14.7px]"
              >
                Phone number*
              </label>
              <Input
                className="bg-white"
                value={formFields.phoneNumber}
                onChange={handleOnChange}
                name="phoneNumber"
                placeholder="08123456789"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="text-sm mb-1 leading-[14.7px]"
              >
                Address*
              </label>
              <Textarea
                className="resize-none bg-white h-20"
                name="address"
                value={formFields.address}
                onChange={handleOnChange}
                placeholder="Enter your full address"
              />
            </div>

            {/* Document Uploads */}
            <div className="flex gap-2 items-center">
              <Image src={"/document.svg"} alt="doc" width={20} height={20} />
              <h3 className="font-bold leading-[24px]">Document Uploads</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Live Picture */}
              <div>
                <input
                  type="file"
                  title="ID Live Picture"
                  className="hidden"
                  onChange={(e) => {
                    if (!e.target.files)
                      return toast.error("Kindly select an image");
                    setIdLivePicture(e.target.files[0]);
                  }}
                  accept="image/*"
                  ref={idLivePictureRef}
                />
                <div className="flex mb-2 gap-x-2 items-center">
                  <Image
                    src={"/camera.svg"}
                    alt="camera"
                    width={16}
                    height={16}
                  />
                  <p className="leading-[14.7px] text-sm">Live Picture*</p>
                </div>
                {!idLivePicture ? (
                  <div
                    onClick={() => idLivePictureRef.current?.click()}
                    className="h-24 cursor-pointer p-[18px] border-dashed border-2 rounded-[8px] border-verification-dashed-border"
                  >
                    <Image
                      src={"/upload.svg"}
                      className="block mx-auto"
                      alt="upload"
                      width={32}
                      height={32}
                    />
                    <p className="text-center text-xs leading-[20px] mt-2 text-verification-upload-text">
                      Upload a current photo of yourself
                    </p>
                  </div>
                ) : (
                  <div className="h-24 cursor-pointer text-green-600 flex items-center justify-center flex-col border-dashed border-2 rounded-[8px] border-verification-dashed-border">
                    <CheckCircle className="h-10 w-10" />
                    <p className="font-semibold text-sm">Photo Added</p>
                    <p className="text-xs text-gray-500 break-all">
                      {idLivePicture.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Govt ID */}
              <div>
                <input
                  type="file"
                  title="Government ID"
                  className="hidden"
                  onChange={(e) => {
                    if (!e.target.files)
                      return toast.error("Kindly select an image");
                    setGovtId(e.target.files[0]);
                  }}
                  accept="image/*"
                  ref={govtIdRef}
                />
                <div className="flex mb-2 gap-x-2 items-center">
                  <Image
                    src={"/document.svg"}
                    alt="doc"
                    width={16}
                    height={16}
                  />
                  <p className="leading-[14.7px] text-sm">National ID Card*</p>
                </div>
                {!govtId ? (
                  <div
                    onClick={() => govtIdRef.current?.click()}
                    className="h-24 cursor-pointer p-[18px] border-dashed border-2 rounded-[8px] border-verification-dashed-border"
                  >
                    <Image
                      src={"/upload.svg"}
                      className="block mx-auto"
                      alt="upload"
                      width={32}
                      height={32}
                    />
                    <p className="text-center text-xs leading-[20px] mt-2 text-verification-upload-text">
                      Upload your government ID
                    </p>
                  </div>
                ) : (
                  <div className="h-24 cursor-pointer text-green-600 flex items-center justify-center flex-col border-dashed border-2 rounded-[8px] border-verification-dashed-border">
                    <CheckCircle className="h-10 w-10" />
                    <p className="font-semibold text-sm">Photo Added</p>
                    <p className="text-xs text-gray-500 break-all">
                      {govtId.name}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-[#F9FAFB] p-4 rounded-[8px] text-verification-dull-text">
              <h3 className="text-sm">Privacy & Security:</h3>
              <ul className="mt-2 text-xs flex flex-col gap-y-1">
                {privacy.map((term, i) => (
                  <li className="leading-[20px]" key={i}>
                    • {term}
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              style={{
                background: "linear-gradient(90deg, #EC4899 0%, #EF4444 100%)",
              }}
              className="text-white w-full"
            >
              Submit Verification
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

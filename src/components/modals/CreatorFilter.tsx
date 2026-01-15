"use client";

import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Gender = "Male" | "Female" | "Other" | null;
type UserType = "Creator" | "Member" | null;

export default function Filter({ isOpen, onClose }: Props) {
  const genderOptions: Exclude<Gender, null>[] = ["Male", "Female", "Other"];
  const userTypes: Exclude<UserType, null>[] = ["Creator", "Member"];
  const stateOptions = ["Oyo", "Edo", "Lagos", "Abuja", "Jos"];

  const [gender, setGender] = useState<Gender>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [distanceRange, setDistanceRange] = useState<number[]>([50]);
  const [ageRange, setAgeRange] = useState<number[]>([18]);

  if (!isOpen) return null;

  const resetFilters = () => {
    setAgeRange([18]);
    setDistanceRange([50]);
    setSelectedState(null);
    setGender(null);
    setUserType(null);
  };

  const isResetBtnDisabled =
    !gender &&
    !userType &&
    !selectedState &&
    ageRange[0] === 18 &&
    distanceRange[0] === 50;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white w-[448px] rounded-[8px] p-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg leading-[28px] font-bold">
            Filter Preference
          </h1>
          <Image
            onClick={onClose}
            src={"/cancelBlack.svg"}
            className="cursor-pointer"
            alt="cancel"
            width={32}
            height={32}
          />
        </div>

        {/* form */}
        <div className="mt-6 flex flex-col gap-y-[25px]">
          {/* Distance */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-filter-dull-heading text-sm">
              Distance: {distanceRange[0]} km
            </h3>
            <Slider
              max={100}
              step={1}
              min={0}
              value={distanceRange}
              onValueChange={setDistanceRange}
            />
          </div>

          {/* Age */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-filter-dull-heading text-sm">
              Age Range: {ageRange[0]}
            </h3>
            <Slider
              max={60}
              step={1}
              min={18}
              value={ageRange}
              onValueChange={setAgeRange}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-filter-dull-heading text-sm">
              Gender Preference
            </h3>
            <Select
              value={gender ?? ""}
              onValueChange={(val) => setGender(val as Gender)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((g, i) => (
                  <SelectItem key={i} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* User Type */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-filter-dull-heading text-sm">User Type</h3>
            <Select
              value={userType ?? ""}
              onValueChange={(val) => setUserType(val as UserType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a user type" />
              </SelectTrigger>
              <SelectContent>
                {userTypes.map((u, i) => (
                  <SelectItem key={i} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* State */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-filter-dull-heading text-sm">State</h3>
            <Select
              value={selectedState ?? ""}
              onValueChange={(val: string) => setSelectedState(val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {stateOptions.map((st, i) => (
                  <SelectItem key={i} value={st}>
                    {st}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              disabled={isResetBtnDisabled}
              onClick={resetFilters}
              className="border hover:text-white border-[#D1D5DB] text-sm bg-transparent text-[#374151] disabled:cursor-not-allowed"
            >
              Reset
            </Button>
            <Button className="bg-[#F43F5E] text-white">Apply Filters</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Switch } from "../ui/switch";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CircleCheckBig } from "lucide-react";

export default function Upload({ onClose }: { onClose: () => void }) {
  const [caption, setCaption] = useState<string>("");
  const [isPostAccessible, setIsPostAccessible] = useState<boolean>(false);
  const [shouldPayPerView, setShouldPayView] = useState<boolean>(false);
  const [media, setMedia] = useState<File | null>(null);

  const mediaRef = useRef<HTMLInputElement>(null);

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedMedia = e.target.files?.[0];
    if (!selectedMedia) return;

    if (
      selectedMedia.type.startsWith("image/") ||
      selectedMedia.type.startsWith("video/")
    ) {
      return setMedia(selectedMedia);
    } else {
      toast.error("Kindly select a valid image or video");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4">
      <div className="w-[640px] text-[#374151] bg-white rounded-[8px] h-[90vh] overflow-y-auto hide-scrollbar p-6">
        <h1 className="text-sm leading-[20px]">Upload Media</h1>
        {/* upload card */}
        <input
          type="file"
          ref={mediaRef}
          onChange={handleMediaChange}
          className="hidden"
        />
        {!media ? (
          <div className="border-dashed flex items-center flex-col mt-3 rounded-[8px] py-[34px] border-2 border-[#D1D5DB] h-[248px]">
            <div className="size-[56px] bg-[#F3F4F6] flex justify-center items-center rounded-full">
              <Image src={"/upload.svg"} alt="upload" width={32} height={32} />
            </div>
            <h2 className="text-[#4B5563] mt-4 text-[15px] leading-[24px]">
              Click to browse
            </h2>
            <p className="text-[#6B7280] leading-[20px] mt-2 text-sm">
              Images or Videos
            </p>

            <button
              onClick={() => mediaRef.current?.click()}
              className="px-5 border border-[#E2E8F0] rounded-[6px] h-10 mt-4 text-sm cursor-pointer text-black hover:bg-black hover:text-white"
            >
              Choose Files
            </button>
          </div>
        ) : (
          <div className="border-dashed flex items-center flex-col mt-3 rounded-[8px] py-[34px] border-2 border-[#D1D5DB] h-[248px]">
            <CircleCheckBig className="text-green-600" size={60} />
            <p className="text-xl mt-5">{media.name}</p>
            <button
              onClick={() => mediaRef.current?.click()}
              className="border px-5  border-[#E2E8F0] rounded-[6px] h-10 mt-4 text-sm cursor-pointer text-black hover:bg-black hover:text-white"
            >
              Edit Image
            </button>
          </div>
        )}

        {/* caption */}
        <div className="mt-6">
          <h2 className="text-sm leading-[20px]">Caption</h2>
          <textarea
            className="resize-none mt-2 block w-full h-30 text-black placeholder:text-[#64748B] text-sm outline-none rounded-[6px] border border-[#E2E8F0] py-2 px-3"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {/* make post accessible */}
        <div className="flex mt-6 items-center cursor-pointer gap-x-3">
          <Switch
            checked={isPostAccessible}
            className="cursor-pointer"
            id="isAccessible"
            onCheckedChange={setIsPostAccessible}
          />
          <span className="text-xs leading-[20px]">
            Make this post public (visible to everyone)
          </span>
        </div>
        {/* should pay per view */}
        <div className="flex mt-3 items-center cursor-pointer gap-x-3">
          <Switch
            checked={shouldPayPerView}
            className="cursor-pointer"
            id="isAccessible"
            onCheckedChange={setShouldPayView}
          />
          <span className="text-xs leading-[20px]">Pay per view content</span>
        </div>
        {shouldPayPerView && (
          <div className="mt-6">
            <div>
              <label className="text-sm leading-[20px]" htmlFor="keys">
                Price (Keys)
              </label>
              <input
                className="block mt-2 w-full p-3 border border-[#E2E8F0] outline-none rounded-[6px] text-sm"
                type="number"
                name="keys"
                placeholder="e.g., 10"
              />
            </div>
            <div className="mt-6">
              <label
                className="text-sm leading-[20px]"
                htmlFor="accessDuration"
              >
                Access Duration
              </label>
              <Select>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10 days">10 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        <div className="mt-13 gap-x-3 flex">
          <button
            className="text-sm flex-1 border border-[#E2E8F0] h-10 rounded-[6px] cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="text-sm text-white cursor-pointer flex-1 h-10 rounded-[8px] bg-[#F43F5E]">
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}

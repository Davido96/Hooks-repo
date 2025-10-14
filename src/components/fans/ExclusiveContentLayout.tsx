"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Lock, Eye } from "lucide-react";
import Image from "next/image";

// ------------------ Subscription Modal ------------------
interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance?: string; // optional props for future hookup
  amount?: string;
  duration?: string;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  balance = "₦10,000",
  amount = "₦2,500",
  duration = "30 days",
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    >
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Subscribe</h2>
          <button onClick={onClose} aria-label="Close subscription modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Wallet Balance</span>
            <span className="font-semibold">{balance}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration</span>
            <span className="font-semibold">{duration}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="font-semibold">{amount}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-100">
            <span className="font-semibold">Total</span>
            <span className="font-bold">{amount}</span>
          </div>
        </div>

        <Button className="w-full mt-4">Send</Button>
      </div>
    </div>
  );
};

// ------------------ Image Viewer ------------------
interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ isOpen, onClose, src }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <button
        className="absolute top-4 right-4 text-white"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-[90%] h-[80%]">
        {/*
          next/image with `fill` requires the parent to be position:relative
          (it already is), and `object-contain` will center the image while
          preserving aspect ratio.
        */}
        <Image
          src={src}
          alt="post image"
          fill
          className="object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

// ------------------ Creator Profile ------------------
const CreatorProfile: React.FC<{ onSubscribeClick: () => void }> = ({
  onSubscribeClick,
}) => {
  return (
    <div className="flex flex-col items-center text-center py-6 border-b border-gray-200">
      <div className="w-20 h-20 rounded-full overflow-hidden">
        <Image
          src="/avatar.png"
          alt="avatar"
          width={80}
          height={80}
          className="object-cover"
        />
      </div>

      <h2 className="mt-3 text-lg font-bold">Jane Doe, 24</h2>
      <p className="text-gray-600 text-sm">Model | Fitness | Lifestyle</p>

      <div className="flex gap-6 mt-3">
        <div>
          <p className="font-semibold">1.2k</p>
          <p className="text-sm text-gray-500">Followers</p>
        </div>
        <div>
          <p className="font-semibold">500</p>
          <p className="text-sm text-gray-500">Following</p>
        </div>
      </div>

      <Button className="mt-4" onClick={onSubscribeClick}>
        Subscribe ₦2,500
      </Button>
    </div>
  );
};

// ------------------ Content Feed ------------------
type Post = {
  id: number;
  type: "public" | "locked" | "ppv";
  src: string;
  price?: string;
};

const ContentFeed: React.FC<{ onImageClick: (src: string) => void }> = ({
  onImageClick,
}) => {
  const posts: Post[] = [
    { id: 1, type: "public", src: "/post1.jpg" },
    { id: 2, type: "locked", src: "/post2.jpg" },
    { id: 3, type: "ppv", src: "/post3.jpg", price: "₦1,000" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative group cursor-pointer rounded-lg overflow-hidden"
        >
          {/* We wrap Image with a button to guarantee clickable semantics across browsers */}
          <button
            onClick={() => post.type === "public" && onImageClick(post.src)}
            className="block w-full h-full"
            aria-label={post.type === "public" ? "Open image" : "Post"}
            type="button"
          >
            <Image
              src={post.src}
              alt={`post-${post.id}`}
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-full"
            />
          </button>

          {post.type === "locked" && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white">
              <Lock className="w-6 h-6 mb-1" />
              <p>Subscribers only</p>
            </div>
          )}

          {post.type === "ppv" && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
              <Eye className="w-6 h-6 mb-2" />
              <Button className="px-3 py-1">Unlock {post.price}</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ------------------ Main Layout ------------------
const ExclusiveContentLayout: React.FC = () => {
  const [isSubscribeOpen, setSubscribeOpen] = useState<boolean>(false);
  const [isImageViewerOpen, setImageViewerOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Profile */}
      <CreatorProfile onSubscribeClick={() => setSubscribeOpen(true)} />

      {/* Feed */}
      <ContentFeed
        onImageClick={(src) => {
          setSelectedImage(src);
          setImageViewerOpen(true);
        }}
      />

      {/* Modals */}
      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setSubscribeOpen(false)}
      />
      <ImageViewer
        isOpen={isImageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
        src={selectedImage}
      />
    </div>
  );
};

export default ExclusiveContentLayout;

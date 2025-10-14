// "use client";
// import React from "react";
// import Image from "next/image";

// export function ActionButtons({
//   onLike,
//   onDislike,
// }: {
//   onLike: () => void;
//   onDislike: () => void;
// }) {
//   return (
//     <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6">
//       <button
//         onClick={onDislike}
//         className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
//         title="Action"
//       >
//         <Image
//           src="/fans/x.png"
//           alt="Dislike"
//           width={32}
//           height={32}
//           unoptimized
//         />
//       </button>
//       <button
//         className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
//         title="Action"
//       >
//         <Image
//           src="/fans/union.png"
//           alt="Action"
//           width={32}
//           height={32}
//           unoptimized
//         />
//       </button>
//       <button
//         className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
//         title="Action"
//       >
//         <Image
//           src="/fans/back.png"
//           alt="Super Like"
//           width={32}
//           height={32}
//           unoptimized
//         />
//       </button>
//       <button
//         title="Action"
//         onClick={onLike}
//         className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
//       >
//         <Image
//           src="/fans/heart.png"
//           alt="Like"
//           width={32}
//           height={32}
//           unoptimized
//         />
//       </button>
//     </div>
//   );
// }
"use client";
import React from "react";
import Image from "next/image";

export function ActionButtons({
  onLike,
  onDislike,
  onDailyLimitReached,
  dailyLikesRemaining,
  onViewProfile,
}: {
  onLike: () => void;
  onDislike: () => void;
  onDailyLimitReached: () => void;
  dailyLikesRemaining: number;
  onViewProfile: () => void;
}) {
  // handle like with daily-limit logic
  const handleLikeClick = () => {
    if (dailyLikesRemaining <= 0) {
      onDailyLimitReached();
      return;
    }
    onLike();
  };

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6">
      {/* Dislike */}
      <button
        onClick={onDislike}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
        title="Dislike"
      >
        <Image
          src="/fans/x.png"
          alt="Dislike"
          width={32}
          height={32}
          unoptimized
        />
      </button>

      {/* View Profile */}
      <button
        onClick={onViewProfile}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
        title="View Profile"
      >
        <Image
          src="/fans/union.png"
          alt="View Profile"
          width={32}
          height={32}
          unoptimized
        />
      </button>

      {/* Super Like (placeholder action for now) */}
      <button
        className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
        title="Super Like"
      >
        <Image
          src="/fans/back.png"
          alt="Super Like"
          width={32}
          height={32}
          unoptimized
        />
      </button>

      {/* Like */}
      <button
        title="Like"
        onClick={handleLikeClick}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
      >
        <Image
          src="/fans/heart.png"
          alt="Like"
          width={32}
          height={32}
          unoptimized
        />
      </button>
    </div>
  );
}

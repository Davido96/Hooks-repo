"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useProfileStore } from "@/stores/profileStore";

interface Props {
  onLogout: () => void;
  onWalletClick: () => void;
  onMessageClick: () => void;
  onEditProfileClick: () => void;
  onViewProfileClick: () => void;
  onReferralClick: () => void;
  onVerificationClick: () => void;
  onNotificationClick?: () => void;
  onFilterClick: () => void;
}

const Navbar: React.FC<Props> = ({
  onLogout,
  onWalletClick,
  onMessageClick,
  onEditProfileClick,
  onViewProfileClick,
  onReferralClick,
  onVerificationClick,
  onFilterClick,
  onNotificationClick,
}) => {
  type DropDown = {
    name: string;
    img: string;
    onClick: () => void;
  };

  const { profile } = useProfileStore();

  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownLinks: DropDown[] = [
    {
      name: "View Profile",
      img: "dropDownUser",
      onClick: onViewProfileClick,
    },
    {
      name: "Edit Profile",
      img: "dropDownEdit",
      onClick: onEditProfileClick,
    },
    {
      name: "Filter",
      img: "dropDownFilter",
      onClick: onFilterClick,
    },
    {
      name: "Verification",
      img: "dropDownVerification",
      onClick: onVerificationClick,
    },
    {
      name: "Referral Program",
      img: "dropDownGift",
      onClick: onReferralClick,
    },
    {
      name: "Log Out",
      img: "dropDownLogout",
      onClick: onLogout,
    },
  ];

  return (
    <header className="text-white flex items-center h-[82px] sm:px-[50px] px-5 justify-between w-full">
      <div className="flex items-center gap-px">
        <Image
          width={105}
          height={33}
          src="/navbar_logo.svg"
          alt="nav bar logo"
        />
      </div>
      <div className="gap-7 hidden md:flex items-center">
        <div onClick={onMessageClick} className="relative cursor-pointer">
          <Image width={20} height={20} src="/message.svg" alt="" />
          {/* <p className="flex items-center absolute justify-center -top-4 -right-4 bg-countRed size-5 text-xs rounded-full">
            12
          </p> */}
        </div>
        <div className="relative cursor-pointer">
          <Image width={20} height={20} src="/likes.svg" alt="" />
          <p className="flex items-center absolute justify-center -top-4 -right-4 bg-countRed size-5 text-xs rounded-full">
            12
          </p>
        </div>
        <div onClick={onNotificationClick} className="relative cursor-pointer">
          <Image width={20} height={20} src="/notification.svg" alt="" />
          {/* <p className="flex items-center absolute justify-center -top-4 -right-4 bg-countRed size-5 text-xs rounded-full">
            12
          </p> */}
        </div>
        <div className="cursor-pointer" onClick={onWalletClick}>
          <Image width={20} height={20} src="/wallet.svg" alt="" />
        </div>
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => setShowDropDown((prev) => !prev)}
        >
          <div className="size-10 rounded-full bg-grayBorder flex items-center justify-center">
            {profile && profile.display_pic ? (
              <Image
                src={profile.display_pic}
                alt="user profile picture"
                width={40}
                height={40}
                className="rounded-full size-10"
              />
            ) : (
              profile?.full_name[0]
            )}
          </div>
          <h4 className="hidden sm:block">
            {profile?.full_name.split(" ")[0]}
          </h4>
          {/* dropdown */}
          {showDropDown && (
            <div className="absolute top-[62px] z-[999] pt-5 right-[30px]">
              <div className=" w-[211px] rounded-[8px] text-black py-[13px] pl-[29px] bg-white/95">
                <h2 className="text-2xl font-bold leading-[32px]">Anthony</h2>
                <p className="text-grayBorder text-sm leading-[24px]">
                  Creator
                </p>
                <ul className="flex flex-col gap-[10px]">
                  {dropDownLinks.map((item, i) => (
                    <li key={i}>
                      <div
                        onClick={() => item.onClick!()}
                        className="flex cursor-pointer items-center gap-[10px]"
                      >
                        <Image
                          width={16}
                          height={16}
                          src={`/${item.img}.svg`}
                          alt={`${item.name} image`}
                        />
                        <p>{item.name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

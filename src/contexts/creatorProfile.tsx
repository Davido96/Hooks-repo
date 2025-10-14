"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ContextStructure {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  showReferralProgram: boolean;
  setShowReferralProgram: Dispatch<SetStateAction<boolean>>;
  showVerification: boolean;
  setShowVerification: Dispatch<SetStateAction<boolean>>;
  showFilter: boolean;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
  showWallet: boolean;
  setShowWallet: Dispatch<SetStateAction<boolean>>;
  showUploadModal: boolean;
  setShowUploadModal: Dispatch<SetStateAction<boolean>>;
}

export const CreatorProfileContext = createContext<
  ContextStructure | undefined
>(undefined);

export default function CreatorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showReferralProgram, setShowReferralProgram] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div>
      <CreatorProfileContext.Provider
        value={{
          isEditing,
          setIsEditing,
          showReferralProgram,
          setShowReferralProgram,
          showVerification,
          setShowFilter,
          showFilter,
          setShowVerification,
          showWallet,
          setShowWallet,
          showUploadModal,
          setShowUploadModal,
        }}
      >
        {children}
      </CreatorProfileContext.Provider>
    </div>
  );
}

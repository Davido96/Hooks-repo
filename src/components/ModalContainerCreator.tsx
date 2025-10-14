"use client";

import { useCreatorProfileContext } from "@/hooks/useCreatorProfileContext";
import CreatorsEditingPopup from "./CreatorsEditingPopup";
import Filter from "./modals/CreatorFilter";
import Referall_Program from "./Referall_Program";
import Verification from "./modals/Verification";
import WalletCreator from "./modals/WalletCreator";
import Upload from "./modals/uploadPostModal";
import { useEffect } from "react";

export default function ModalContainer() {
  const {
    isEditing,
    setIsEditing,
    showReferralProgram,
    setShowFilter,
    setShowReferralProgram,
    showFilter,
    showVerification,
    showWallet,
    setShowWallet,
    setShowVerification,
    showUploadModal,
    setShowUploadModal,
  } = useCreatorProfileContext();

  useEffect(() => {
    const isModalOpen =
      isEditing ||
      showReferralProgram ||
      showFilter ||
      showUploadModal ||
      showVerification;

    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // disable scrolling
    } else {
      document.body.style.overflow = "auto"; // re-enable scrolling
    }

    // cleanup not strictly needed here, but good practice if the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [
    isEditing,
    showReferralProgram,
    showFilter,
    showUploadModal,
    showVerification,
  ]);

  return (
    <>
      {isEditing && (
        <CreatorsEditingPopup onClose={() => setIsEditing(false)} />
      )}

      {showUploadModal && <Upload onClose={() => setShowUploadModal(false)} />}

      {showFilter && (
        <Filter isOpen={showFilter} onClose={() => setShowFilter(false)} />
      )}

      {showWallet && <WalletCreator onClose={() => setShowWallet(false)} />}

      {showVerification && (
        <Verification
          isOpen={showVerification}
          onClose={() => setShowVerification(false)}
        />
      )}

      {showReferralProgram && (
        <Referall_Program onClose={() => setShowReferralProgram(false)} />
      )}
    </>
  );
}

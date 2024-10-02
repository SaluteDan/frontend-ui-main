import React, { useState } from "react";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

import ConfirmationModal from "./states/confimation-modal";
import InsufficientModal from "./states/insufficient-modal";

export const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // validate wallet has the balance for the transaction
  setIsAlertOpen(true); // Always open a modal
};

export const renderModal = (
  isAlertOpen: boolean,
  setIsAlertOpen: (isOpen: boolean) => void,
  totalStake: number,
  artworkData: ArtworkData,
  balance: number,
  tokentier: number,
  stakedAttributeCount: number,
  stakeValues: number,
  selectedOptions: number,
  canvasImage: string
) => {
  if (!isAlertOpen) return null;

  const hasEnoughBalance =
    Number(totalStake) + Number(artworkData.mint.cost) <= Number(balance);
  const hasRequiredTier = Number(tokentier) >= 1;

  if (hasEnoughBalance && hasRequiredTier) {
    return (
      <ConfirmationModal
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        totalStake={totalStake}
        stakedAttributeCount={stakedAttributeCount}
        stakeValues={stakeValues}
        selectedOptions={selectedOptions}
        artworkData={artworkData}
        balance={balance}
        canvasImage={canvasImage}
      />
    );
  } else {
    return (
      <InsufficientModal
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
      />
    );
  }
};

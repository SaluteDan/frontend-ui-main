import React from "react";
import { Cross1Icon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArtworkData } from "@/components/mint/artworkData";

import { getAttributecount } from "@/components/helpers/collection/collection";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ThumbsDown } from "lucide-react";

interface ConfirmationModalProps {
  totalStake: {} | "N/A";
  stakedAttributeCount: {} | "N/A";
  stakeValues: {} | 0;
  selectedOptions: {} | "N/A";
  artworkData: ArtworkData;
  isAlertOpen: boolean;
  setIsAlertOpen: (isOpen: boolean) => void;
  balance: number | 0;
}

const ConfirmationModal = ({
  totalStake,
  stakedAttributeCount,
  stakeValues,
  selectedOptions,
  artworkData,
  isAlertOpen,
  setIsAlertOpen,
  balance,
}: ConfirmationModalProps) => {
  return (
    <AlertDialog.Root open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black opacity-90 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="space-y-4 data-[state=open]:animate-contentShow backdrop-blur-xl fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white/10 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none text-white">
          <div className="self-stretch rounded-t-[18.91px] rounded-b-none flex flex-col items-start justify-start pt-[1.725rem] px-[1.725rem] pb-[0rem] gap-spacing-3">
            <div className="self-stretch flex flex-row items-center justify-between">
              <AlertDialog.Title className="tracking-[1.89px] leading-[1.891rem] uppercase">
                CONFIRMATION
              </AlertDialog.Title>
              <div className="text-[0.75rem] flex flex-row items-center justify-between gap-x-10">
                <div className="rounded-[10px] flex flex-row items-center justify-end py-[0.5rem] px-[0.75rem]">
                  <div className="flex flex-row items-center justify-start gap-x-4">
                    <div className="tracking-[1px] leading-[1rem] uppercase">
                      DETAILS
                    </div>
                    <ChevronDownIcon />
                  </div>
                </div>
                <AlertDialog.Cancel asChild>
                  <Cross1Icon type="button" className="cursor-pointer" />
                </AlertDialog.Cancel>
              </div>
            </div>
            <div className="flex flex-col items-start justify-star text-5xl py-1">
              <h2 className="tracking-[2.81px] uppercase">MINT EDITION</h2>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-spacing-4 text-[0.625rem]">
              <div className="self-stretch rounded-border-radius-xl bg-gray1 flex flex-col items-center justify-start py-[1.2rem] px-[0rem] box-border gap-[0.6rem]">
                <div className="self-stretch flex flex-row items-center justify-between pt-[0rem] md:px-[1.2rem] pb-[0.6rem]">
                  <div className="flex flex-row items-start justify-start gap-[0.6rem]">
                    <div className="tracking-[0.96px] leading-[0.959rem] uppercase">
                      STAKED ATTRIBUTES PREVIEW
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-center justify-start gap-[0.625rem] text-[1.439rem]">
                  <Image
                    className="object-cover"
                    alt=""
                    // thumbnail or placeholder
                    src={artworkData.thumbnail || "https://loremflickr.com/640/480"}
                    width={120}
                    height={120}
                  />
                  <div className="self-stretch flex flex-col items-start justify-start pt-[0.6rem] md:px-[1.2rem] pb-[0rem]">
                    <div className="self-stretch flex flex-col items-start justify-start gap-[0.718rem]">
                      <h3 className="m-0 w-[8.988rem] text-inherit tracking-[0.96px] uppercase font-normal inline-block">
                        #100
                      </h3>
                      <div className="self-stretch flex flex-row items-center justify-start text-[0.839rem] text-text-text-primary">
                        <div className="flex-1 flex flex-row items-center justify-between">
                          <div className="tracking-[0.96px] uppercase">
                            {Number(totalStake)} ATTR VOLUME
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-4 text-[1rem] md:px-5">
                <div className="leading-[1.846rem]">
                  PLEASE REVIEW SUMMARY BEFORE CONFIRMING
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-y-2 text-[0.875rem] text-gray-100">
                  <div className="self-stretch flex flex-row items-center justify-between">
                    <span className="tracking-[0.36px] uppercase">
                      attributes STAKED:
                    </span>
                    <span className="tracking-[0.36px] uppercase">
                      {Number(stakedAttributeCount)}/{getAttributecount(artworkData.attributes)}
                    </span>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-between">
                    <span className="tracking-[0.36px] uppercase">
                      COINS STAKED:
                    </span>
                    <span className="tracking-[0.36px] uppercase">
                      {Number(totalStake)}
                    </span>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-between">
                    <span className="tracking-[0.36px] uppercase">
                      MINT FEE:
                    </span>
                    <span className="tracking-[0.36px] uppercase text-right">
                      {artworkData.mint.cost}
                    </span>
                  </div>
                  <div className="self-stretch shrink-0 flex flex-row items-start justify-between">
                    <span className="tracking-[0.36px] uppercase">
                      REMAINING BALANCE:
                    </span>
                    <span className="tracking-[0.36px] uppercase text-right">
                    {balance - artworkData.mint.cost - totalStake}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-t-none rounded-b-[18.91px] bg-aliceblue flex flex-row items-center justify-center pt-spacing-4 px-[1.725rem] pb-[1.725rem] text-center text-[1.419rem]">
            <button className="flex-1 rounded-xl bg-gray-100 h-[3.75rem] flex flex-row items-center justify-center py-[0rem] px-[3.543rem] box-border text-gray-800">
              <div className="tracking-[0.22px] leading-[1.891rem] uppercase">
                CONFIRM
              </div>
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ConfirmationModal;

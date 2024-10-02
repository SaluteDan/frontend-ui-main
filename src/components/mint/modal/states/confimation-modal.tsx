import React from "react";
import { Cross1Icon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArtworkData } from "@/components/mint/artworkData";

import { getAttributecount } from "@/components/helpers/collection/collection";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as PopOver from "@radix-ui/react-popover";

import { maskString } from "@/components/helpers/collection/collection";

import Preloader, { imageStyle } from "@/components/ui/icons/pre-loader";

interface ConfirmationModalProps {
  // Mint Props
  totalStake: {} | "N/A";
  stakedAttributeCount: {} | "N/A";
  stakeValues: {} | 0;
  selectedOptions: {} | "N/A";
  // Collection & Contract
  artworkData: ArtworkData;
  // Wallet & Member Props
  balance: number | 0;

  // Modals
  isAlertOpen: boolean;
  setIsAlertOpen: (isOpen: boolean) => void;

  canvasImage: string | null;
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
  canvasImage,
}: ConfirmationModalProps) => {
  return (
    <AlertDialog.Root open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black opacity-90 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="space-y-4 data-[state=open]:animate-contentShow backdrop-blur-xl fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white/10 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none text-white">
          <div className="self-stretch rounded-t-xl rounded-b-none flex flex-col items-start justify-start pt-2 md:pt-[1.725rem] px-4 md:px-[1.725rem] pb-[0rem] gap-y-1">
            <div className="self-stretch flex flex-row items-center justify-between">
              <AlertDialog.Title className="tracking-wide uppercase text-sm flex flex-row items-center justify-between w-full leading-7">
                CONFIRMATION
                <div className="text-[0.75rem] flex flex-row items-center justify-between gap-x-5">
                  <PopOver.Root>
                    <PopOver.Trigger className="rounded-[10px] flex flex-row items-center justify-end py-[0.5rem] px-[0.75rem]">
                      <span className="flex flex-row items-center justify-start gap-x-4">
                        <div className="tracking-[1px] leading-[1rem] uppercase">
                          CONTRACT
                        </div>
                        <ChevronDownIcon />
                      </span>
                    </PopOver.Trigger>
                    <PopOver.Content
                      sideOffset={5}
                      alignOffset={-38}
                      align="end"
                      className="flex flex-row flex-wrap text-xs gap-y-0 shadow-none border-none bg-black opacity-90 text-gray-100 rounded-xl p-4 justify-self-end max-w-xs"
                    >
                      <span className="basis-1/3">ROYALTIES</span>
                      <span className="flex flex-col justify-self-end basis-2/3 *:py-1 *:border-b-[1px] *:border-gray-600">
                        <span className="p-0">PRIMARY</span>
                        <span className="justify-self-end">
                          {artworkData.royalty || "N/A"} ARTIST
                        </span>
                        <span className="justify-self-end basis-1/3">
                          {artworkData.royalty || "N/A"} ATTRIBUTES GALLERY
                        </span>
                        <span className="justify-self-end basis-2/3">
                          SECONDARY
                        </span>
                        <span className="justify-self-end">
                          {artworkData.royalty || "N/A"} ARTIST
                        </span>
                        <span className="justify-self-end basis-1/3">
                          {artworkData.royalty || "N/A"} ATTRIBUTES GALLERY
                        </span>
                      </span>

                      <span className="basis-2/3">ADDRESS:</span>
                      <span className="justify-self-end basis-1/3">
                        {maskString(artworkData.address)}
                      </span>
                      <span className="basis-2/3">CREATION DATE:</span>
                      <span className="justify-self-end basis-1/3">
                        {artworkData.opendate}
                      </span>
                    </PopOver.Content>
                  </PopOver.Root>
                  <AlertDialog.Cancel asChild>
                    <Cross1Icon type="button" className="cursor-pointer" />
                  </AlertDialog.Cancel>
                </div>
              </AlertDialog.Title>
            </div>
            <div className="text-3xl md:text-5xl pb-2">
              <h2 className="tracking-[2.81px] uppercase">MINT EDITION</h2>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-spacing-4 text-[0.625rem]">
              <div className="self-stretch rounded-xl bg-white/10 flex flex-col items-center justify-start p-4 box-border gap-[0.6rem]">
                <div className="self-stretch flex flex-row items-center justify-between pt-[0rem]">
                    <div className="leading-[0.959rem] uppercase">PREVIEW</div>
                </div>
                <div className="self-stretch flex flex-col items-center justify-start gap-4 text-2xl">
                  <Image
                    className="object-cover size-24 md:size-32"
                    alt="Canvas Preview"
                    src={canvasImage || Preloader()} // Fallback image
                    width={180}
                    height={180}
                    placeholder={Preloader()}
                    style={{
                      objectFit: 'contain' 
                    }}
                  />
                  <div className="self-stretch flex flex-col items-start justify-start pt-[0.6rem] pb-[0rem] gap-1">
                    
                    <div className="grid grid-cols-[1fr_0.5fr] items-center justify-between uppercase text-sm w-full">
                      <h4 className="text-sm">VOLUME:</h4>
                      <h4 className="text-sm justify-self-end">
                        {Number(totalStake)} ATTR
                      </h4>
                      <span>attributes STAKED:</span>
                      <span className="text-sm justify-self-end">
                        {Number(stakedAttributeCount)}/
                        {getAttributecount(artworkData.attributes)}
                      </span>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                      <h3 className="tracking-[0.96px] uppercase">#100</h3>
                      <span
                        className={`group-[.grid-cols-2]:hidden p-2 md:py-2 px-3 ${totalStake == 0 ? "bg-amber-100" : totalStake == 1 ? "bg-orange-100" : totalStake == 2 ? "bg-slate-100" : "bg-gray-200"} rounded-xl place-self-end text-[10px] uppercase leading-none`}
                      >
                        {totalStake == 0 && (
                          <span className="inline-block text-amber-600">
                            1st Edition
                          </span>
                        )}
                        {totalStake == 1 && (
                          <span className="inline-block text-orange-600">
                            2nd Edition
                          </span>
                        )}
                        {totalStake == 2 && (
                          <span className="inline-block text-slate-600">
                            Open Edition
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-4 text-[1rem] md:px-5 pt-4">
                <div className="text-xs text-gray-300 tracking-widest">
                  TRANSACTION SUMMARY
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-y-1 text-[0.875rem] text-gray-100 *:tracking-[0.36px] *:uppercase">
                  <div className="self-stretch flex flex-row items-start justify-between">
                    <span>MINT FEE:</span>
                    <span>{artworkData.mint.cost}</span>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-between">
                    <span>TRANSACTION COST:</span>
                    <span>{artworkData.mint.cost + totalStake} ATTR</span>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-between">
                    <span>REMAINING BALANCE:</span>
                    <span>{balance - artworkData.mint.cost - totalStake}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-t-none rounded-b-xl flex flex-row items-center justify-center px-4 md:px-[1.725rem] pb-4 md:pb-[1.725rem] text-center">
            <Button className="flex-1 rounded-xl bg-gray-100 flex flex-row items-center justify-center py-6 px-[3.543rem] box-border text-gray-800 hover:text-white hover:bg-gray-600 transition-all duration-300 text-1xl">
              <div className="tracking-[0.22px] leading-[1.891rem] uppercase">
                CONFIRM
              </div>
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ConfirmationModal;

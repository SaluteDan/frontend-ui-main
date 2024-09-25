import React from "react";
import { Cross1Icon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArtworkData } from "@/components/mint/artworkData";

import { getAttributecount } from "@/components/helpers/collection/collection";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface NonEligibleModalProps {
  isAlertOpen: boolean;
  setIsAlertOpen: (isOpen: boolean) => void;
}

const NonEligibleModal = (
  {
    isAlertOpen,
    setIsAlertOpen,
  }: NonEligibleModalProps
) => {
  return (
    <AlertDialog.Root open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black opacity-90 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="space-y-4 data-[state=open]:animate-contentShow backdrop-blur-xl fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white/10 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none text-white">
          <div className="self-stretch rounded-t-xl rounded-b-none flex flex-col items-start justify-start pt-2 md:pt-[1.725rem] px-4 md:px-[1.725rem] pb-[0rem] gap-y-1">
            <div className="self-stretch flex flex-row items-center justify-between">
              <AlertDialog.Title className="tracking-wide leading-7 text-sm uppercase">
                CONFIRMATION
              </AlertDialog.Title>
              <div className="text-[0.75rem] flex flex-row items-center justify-between gap-x-10">
                <AlertDialog.Cancel asChild>
                  <Cross1Icon type="button" className="cursor-pointer" />
                </AlertDialog.Cancel>
              </div>
            </div>
            <div className="text-3xl md:text-5xl lg:text-8xl pb-2">
              <h2 className="tracking-[2.81px] uppercase">NOT ELIGIBLE</h2>
            </div>
            <div className="self-stretch rounded-xl bg-white/10 flex flex-col items-center justify-start p-4 box-border gap-[0.6rem]">
            <div className="self-stretch flex flex-col items-center justify-start gap-[0.625rem] text-[1.439rem]">
                  <Image
                    className="object-cover blur-md"
                    alt=""
                    // thumbnail or placeholder
                    src={"https://loremflickr.com/220/220"}
                    width={180}
                    height={180}
                  />
                </div>
            </div>
            <div className="self-stretch flex flex-col text-[0.625rem]">
              <div className="self-stretch flex flex-col pt-4 px-[0rem] box-border gap-[0.6rem]">
                <span className="uppercase text-base pb-[0.6rem]">
                  SORRY, YOU ARE NOT ELIGIBLE TO MINT FROM THIS COLLECTION
                </span>
                <span className="text-xs leading-5">
                  This collection is only available to members who have pre-approved and added to the allow list. if you are a member, please check your allow list status.
                </span>
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-t-none rounded-b-xl flex flex-row items-center justify-center pt-spacing-4 px-4 md:px-[1.725rem] pb-4 md:pb-[1.725rem] text-center">
            <Button className="flex-1 rounded-xl bg-gray-100 h-[3.75rem] items-center justify-center py-6 px-[3.543rem] box-border text-gray-800 hover:text-white hover:bg-gray-600 transition-all duration-300 text-1xl">
              <div className="tracking-[0.22px] leading-[1.891rem] uppercase">
                CANCEL
              </div>
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default NonEligibleModal;

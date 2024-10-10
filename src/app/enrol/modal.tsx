"use client";

import React from "react"
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

interface ModalProps {
  title: string;
  headline: string;
  subtitle: string;
  body: string;
  cta: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}


const RenderModal = ({ ModalProps }: { ModalProps: ModalProps }) => {
  const { title, headline, subtitle, body, cta, isModalOpen, setIsModalOpen } = ModalProps;
  return (
    <AlertDialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black opacity-90 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="space-y-4 data-[state=open]:animate-contentShow backdrop-blur-xl fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white/10 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none text-white">
          <div className="self-stretch rounded-t-xl rounded-b-none flex flex-col items-start justify-start pt-4 md:pt-[1.725rem] px-4 md:px-[1.725rem] pb-[0rem] gap-y-1">
            <div className="self-stretch flex flex-row items-center justify-between">
              <AlertDialog.Title className="tracking-wide leading-7 text-sm uppercase">
                {title}
              </AlertDialog.Title>
              <AlertDialog.Cancel asChild>
                <Cross1Icon type="button" className="cursor-pointer" />
              </AlertDialog.Cancel>
            </div>
            <div className="text-3xl md:text-5xl pb-2">
              <h2 className="uppercase">{headline}</h2>
            </div>
            <div className="self-stretch flex flex-col text-[0.625rem]">
              <div className="self-stretch rounded-border-radius-xl flex flex-col px-[0rem] box-border gap-[0.6rem]">
                <span className="leading-6 uppercase text-base pb-[0.6rem]">
                  {subtitle}
                </span>
                <span className="text-xs leading-5">
                  {body}
                </span>
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-t-none rounded-b-xl bg-aliceblue flex flex-row items-center justify-center px-4 md:px-[1.725rem] pb-4 md:pb-[1.725rem] text-center">
            <Button className="flex-1 rounded-xl bg-gray-100 flex flex-row items-center justify-center py-6 px-[3.543rem] box-border text-gray-800 hover:text-white hover:bg-gray-600 transition-all duration-300 text-1xl">
              <div className="tracking-[0.22px] leading-[1.891rem] uppercase">
                {cta}
              </div>
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default RenderModal
import type { NextPage } from "next";
import { FooterItems } from "../list/menus/menus";
import { Fragment } from "react";
import { SocialItems } from "../list/menus/social";
import { SocialIcon } from "react-social-icons";
import { ArrowBottomRightIcon, SizeIcon } from "@radix-ui/react-icons";

import Subscribe from "@/components/core/footer/subscribe";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Footer: NextPage = () => {
  return (
    <footer className="w-full relative bg-gray-400 flex flex-col items-start justify-start p-4 md:p-[2.5rem] box-border gap-[2.5rem_0rem] text-left text-[0.625rem] text-gray-200 font-universnexttypewriterw04-rg">
      <div className="w-full flex justify-between">
        <div className="grid grid-cols-2 items-start gap-4 w-full">
          <div className="text-3xl tracking-wide">ATTR.</div>
          <div className="flex flex-row items-start justify-end gap-2 md:gap-[0rem_2rem]">
          {SocialItems.map((item, index) => (
            <Fragment key={index}>
              <SocialIcon url={item.url} bgColor="none" />
            </Fragment>
          ))}
        </div>
          <div className="text-sm leading-6 tracking-[0.1px] col-span-2">
            A community-curated gallery for collectors & art enthusiasts
          </div>
        </div>
        
      </div>
      <ul className="grid gap-4 grid-cols-2">
        {FooterItems.map((item, index) => (
          <Fragment key={index}>
            <li>
              <a
                href={item.href}
                className="block tracking-[1px] text-lg leading-6 uppercase"
              >
                {item.label}
              </a>
            </li>
          </Fragment>
        ))}
      </ul>
      <AlertDialog>
        <AlertDialogTrigger className="w-full md:w-auto">
          <div className="rounded-xl bg-gray-500 flex flex-row items-end justify-between pt-[1.25rem] pb-[0.75rem] pr-[1rem] pl-[1.5rem] box-border text-left text-[0.75rem] text-white">
            <div className="self-stretch flex flex-col items-start justify-between pt-[0rem] px-[0rem] pb-[0.5rem] gap-3.5">
              <div className="w-[11.875rem] relative uppercase inline-block">
                <p className="m-0 leading-4">
                  STAY UP TO DATE WITH GALLERY NEWS
                </p>
              </div>
              <div className="relative tracking-[0.94px] uppercase">
                SUBSCRIBE
              </div>
            </div>
            <div className="rounded-[50%] bg-slate-400 w-[2.5rem] h-[2.5rem] flex justify-center items-center">
              <ArrowBottomRightIcon />
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogOverlay className="bg-black/60 data-[state=open]:animate-overlayShow fixed inset-0">
        <Subscribe />
        </AlertDialogOverlay>
      </AlertDialog>
      <div className="self-stretch flex flex-row items-start justify-start gap-[0rem_1.25rem] text-[0.75rem] font-text-xs-lineheight-4-font-normal">
        <div className="relative leading-[1rem]">{`PRIVACY `}</div>
        <div className="relative leading-[1rem]">TERMS AND CONDITIONS</div>
      </div>
    </footer>
  );
};

export default Footer;

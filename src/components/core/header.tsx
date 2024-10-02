"use client";

import type { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import React from "react";
import { FooterItems, MenuItems } from "../list/menus/menus";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Fragment } from "react";
import { useEnvironment } from "@/app/env/provider";

const Header: React.FC = () => {
  const { walletAddress, tokenId, balance, tokentier } = useEnvironment();

  return (
    <header className="w-full text-left text-[0.625rem] text-text-text-primary md:pt-2">
      <div className="w-[100%] flex flex-row items-center justify-between py-3 md:py-3 md:px-[2.5rem] p-4 box-border">
        <div className="text-2xl md:text-3xl tracking-wide">
          <a href="/">ATTR.</a>
        </div>

        <div className="self-stretch rounded-[30px] overflow-hidden flex flex-row items-center justify-center text-gray-600">
          <div className="bg-gray-200 flex flex-row items-start justify-items-stretch py-[0.35rem] md:py-[0.55rem] pl-2 pr-1 box-border">
            {/*  if token */}
            <span
              className={`mr-[0.5rem] size-7 rounded-full bg-gradient-to-r ${tokentier == 1 ? 'from-yellow-200 to-yellow-400' : tokentier == 2 ? 'from-orange-200 to-orange-400' : tokentier == 3 ? 'from-slate-200 to-slate-400' : 'bg-gray-300'}`} // Added default class
            />
            <div className="grid grid-rows-2 items-stretch text-xs content-center justify-items-stretch justify-center h-7">
              <span className="tracking-[1px] uppercase">#:{tokenId}</span>
              <span className="tracking-[1px] uppercase">{balance} ATTR.</span>
            </div>
          </div>
          <div className="bg-gray-200 hover:bg-gray-600 flex flex-col items-center justify-center py-[0.456rem] md:py-[0.656rem] pr-4 pl-2 md:pl-3 h-full group">
            <Sheet>
              <SheetTrigger className="active:text-gray-100 focus:text-gray-100 hover:text-gray-100">
                <HamburgerMenuIcon className="group-hover:text-gray-100"/>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full min-w-full bg-gray-300 px-4 md:px-5"
              >
                <SheetHeader></SheetHeader>
                <SheetDescription>
                  <div className="grid justify-between h-[100vh]">
                    
                    <ul className="w-full flex flex-col items-start justify-start gap-[1.25rem_0rem] text-left text-[2.875rem] md:pt-[100px] text-gray-800">
                      {MenuItems.map((item: { href: string; label: string }, index: number) => (
                        <Fragment key={index}>
                          <li>
                            <a
                              href={item.href}
                              className="block py-[0.75rem] tracking-[0.63px] leading-[0.945rem] uppercase hover:text-gray-500"
                            >
                              {item.label}
                            </a>
                          </li>
                        </Fragment>
                      ))}
                    </ul>

                    <ul className="w-full flex flex-col items-start justify-start gap-[0.625rem_0rem] text-left text-[1rem] text-gray-600">
                      {FooterItems.map((item, index) => (
                        <Fragment key={index}>
                          <li>
                            <a
                              href={item.href}
                              className="block tracking-[1px] leading-[1rem] uppercase hover:text-gray-200"
                            >
                              {item.label}
                            </a>
                          </li>
                        </Fragment>
                      ))}
                    </ul>
                  </div>
                </SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

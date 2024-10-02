"use client";

import PropTypes from "prop-types";

import React, { useState } from "react";
import Link from "next/link";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MixerVerticalIcon,
} from "@radix-ui/react-icons";

import { EditionData } from "@/components/mint/Editiondata";
import { ArtworkData } from "@/components/mint/artworkData";
import { maskString } from "@/components/helpers/collection/collection";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ItemProps = {
  editionData: EditionData;
  collectionData: ArtworkData;
};

const EditionBar: React.FC<ItemProps> = ({ editionData, collectionData }) => {
  const tier = collectionData.mint.tier;
  const [openstate, Setopenstate] = useState(true);
  const volume = editionData.mint.cost

  return (
    <div className="w-full text-left lg:text-[8.451rem] text-[3.4rem] text-gray-800 md:space-y-2">
      <h2 className="tracking-[2.46px] uppercase leading-snug md:leading-none">
        #{editionData.name ?? "N/A"}
      </h2>
      <div className="flex flex-col md:flex-row items-start justify-between text-lg md:text-lg lg:text-2xl gap-2 md:gap-0">
        <div className="flex flex-row md:hidden justify-between w-full">
          <div
            className={`p-2 md:py-2 px-3 ${tier == 0 ? "bg-amber-100" : tier == 1 ? "bg-orange-100" : tier == 2 ? "bg-slate-100" : "bg-gray-200"} rounded-xl text-xs uppercase *:align-middle`}
          >
            {tier == 0 && <span className="text-amber-600">1st Edition</span>}
            {tier == 1 && <span className="text-orange-600">2nd Edition</span>}
            {tier == 2 && <span className="text-slate-600">open Edition</span>}
          </div>
          <Button
            onClick={() => Setopenstate(!openstate)}
            className="bg-gray-100 hover:bg-gray-200 active:bg-gray-200 text-gray-600 rounded-xl text-xs space-x-2 uppercase p-2 md:py-2 px-3 flex flex-row gap-2 shadow-none"
          >
            METADATA
            <ChevronDownIcon
              className={`transition-all duration-300 ${openstate ? "" : "rotate-180"}`}
            />
          </Button>
        </div>
        <div
          className={`md:grid place-content-between grid grid-cols-2 md:grid-cols-6 gap-5 md:gap-2 2xl:gap-10 w-full px-2 md:px-0 ${openstate ? "hidden" : ""}`}
        >
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-baseline justify-start gap-1">
                <div className="tracking-[1px] uppercase">
                  {editionData.mint.cost}
                </div>
                <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                  ONE OF {collectionData.mint.count}
                </div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px] uppercase">
                  ATTRIBUTES
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] uppercase">
                  {new Intl.NumberFormat().format(volume ?? 0)}
                </div>
                <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                  8.54%
                </div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px] uppercase">
                  ATTR. POINTS VOLUME
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-baseline justify-start gap-1">
                <div className="tracking-[1px] uppercase">
                  {collectionData.mint.count}
                </div>
                <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                  / {collectionData.mint.limit}
                </div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px] uppercase">
                  MINTED EDITIONS
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start">
                <div className="tracking-[1px] uppercase">
                  {collectionData.royalty}%
                </div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px] uppercase">
                  ARTIST ROYALTY
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] uppercase">
                  {maskString(editionData.mint.transaction)}
                </div>
                <div className="tracking-[0.12px] uppercase text-gray-500"></div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px] uppercase">
                  TRANSACTION ID
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start">
                <div className="tracking-[1px] uppercase">
                  {maskString(editionData.mint.address)}
                </div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px] uppercase">
                  OWNER WALLET
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditionBar;

"use client";

import PropTypes from "prop-types";

import React from "react";
import Link from "next/link";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MixerVerticalIcon,
} from "@radix-ui/react-icons";

import { EditionData } from "@/components/mint/Editiondata";
import { ArtworkData } from "@/components/mint/artworkData";
import { maskString } from "@/components/helpers/collection/collection";

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
  return (
    <div className="w-full text-left lg:text-[8.451rem] text-[3.4rem] text-gray-800 md:space-y-2">
      <h2 className="tracking-[2.46px] uppercase leading-snug md:leading-none">
        #{editionData.name ?? "N/A"}
      </h2>
      <div className="flex flex-col md:flex-row items-start justify-between text-lg md:text-lg lg:text-2xl gap-4 md:gap-0">
      <div className={`group-[.grid-cols-2]:hidden p-2 md:py-2 px-3 ${tier == 0 ? 'bg-amber-100' : tier == 1 ? 'bg-slate-100' : tier == 2 ? 'bg-orange-100' : 'bg-gray-200'} rounded-xl place-self-end text-xs space-x-2`}>
                  {tier == 0 && <span className="inline-block text-amber-600">1st Edition</span>}
                  {tier == 1 && <span className="inline-block text-slate-600">2nd Edition</span>}
                  {tier == 2 && <span className="inline-block text-orange-600">3rd Edition</span>}
                </div>
        <div className="md:grid grid-cols-2 md:grid-cols-6 gap-5 md:gap-2 2xl:gap-10 w-full md:w-auto hidden">
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
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
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
                  {editionData.mint.cost}
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
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
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
        </div>
        <Select>
              <SelectTrigger className="w-auto justify-between border-none shadow-none active:bg-gray-100 text-gray-400 rounded-xl active:ring-0 focus:bg-gray-100 bg-gray-100 focus:ring-0">
                <SelectValue placeholder="METADATA" defaultValue="Null" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hidden" className="hidden">
                  METADATA
                </SelectItem>
                <SelectItem value="Description">DESCRIPTION</SelectItem>
                <SelectItem value="Metadata">METADATA</SelectItem>
                <SelectItem value="Contract">CONTRACT</SelectItem>
              </SelectContent>
              {/* {selectedMetadata !== "Hidden" && (
                <button
                  className="text-gray-300 p-2 self-end bg-gray-100 rounded-xl"
                  onClick={() => setSelectedMetadata("Hidden")}
                >
                  <Cross1Icon className="size-5 md:size-8" />
                </button>
              )} */}
            </Select>
      </div>
    </div>
  );
};

export default EditionBar;

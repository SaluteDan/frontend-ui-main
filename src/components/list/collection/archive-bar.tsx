"use client";

import PropTypes from "prop-types";

import React, { useMemo} from "react";
import Link from "next/link";

import { ArchiveData } from "@/components/helpers/types/lib";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MixerVerticalIcon,
  ViewGridIcon,
} from "@radix-ui/react-icons";

/*
 * ArchiveBar component
 *
 * - Responsable for displaying the archive bar
 * - Doing calculations on the data
 * - Displaying the data
 * - TODO: Add filter functionality
 * - TODO: Add sort functionality
 * - TODO: Add search functionality
 *
 */

interface ArchiveBarProps {
  data: ArchiveData[];
}

const ArchiveBar: React.FC<ArchiveBarProps> = ({ data }) => {

// construct total volume
  const totalMintVolume = useMemo(() => {
    return data.reduce((total, collection) => total + collection.mint.account, 0);
  }, [data]);

// construct total collections
  const totalCollections = useMemo(() => {
    return data.length;
  }, [data]);

// construct total minted editions
  const totalMintedEditions = useMemo(() => {
    return data.reduce((total, collection) => total + collection.mint.count, 0);
  }, [data]);


  return (
    <div className="w-full text-left text-gray-800 md:space-y-2">
      <h2 className="lg:text-[8.451rem] text-[2.4rem] lg:tracking-[2.46px] uppercase leading-snug md:leading-none">
        GALLERY ARCHIVE
      </h2>
      <div className="flex flex-col md:flex-row items-start justify-between text-lg md:text-lg lg:text-2xl gap-4 md:gap-0">
        <div className="text-gray-400 text-xs uppercase flex flex-row items-center justify-start gap-2 md:hidden">
        <ChevronDownIcon className=""></ChevronDownIcon> <span>METADATA</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-5 md:gap-2 2xl:gap-10 w-full md:w-auto hidden md:block">
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start">
                <div className="tracking-[1px] uppercase">
                  {totalCollections ? totalCollections : "N/A"}
                </div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px] uppercase">
                  COLLECTIONS
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] uppercase">
                  {totalMintVolume ? totalMintVolume : "N/A"}
                </div>
                <div className="tracking-[0.12px] uppercase text-gray-500"></div>
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
                  {totalMintedEditions ? totalMintedEditions : "N/A"}
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
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] uppercase">
                  12,453
                </div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px] uppercase">
                  UNIQUE OWNERS
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] uppercase">
                  5,000
                </div>
                <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                  {/* / {collectionData.mint.limit} */}
                </div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px] uppercase">
                  SECONDARY MARKET SALES
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start">
                <div className="tracking-[1px] uppercase">
                  {/* {collectionData.royalty}% */}
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
        <div className="flex flex-row items-start justify-start gap-[0.625rem] text-[0.75rem] order-first md:order-last w-full md:w-auto">
        <div className="rounded-xl bg-gray-100 flex flex-row items-center justify-start py-[0.5rem] px-[0.75rem]  hover:bg-gray-200 md:hidden">
            <ViewGridIcon></ViewGridIcon>
          </div>
          <div className="rounded-xl bg-gray-100 flex flex-row items-center justify-start py-[0.5rem] px-[0.75rem] grow hover:bg-gray-200">
            <div className="flex flex-row items-center justify-start gap-[0.625rem] cursor-pointer">
              <ChevronDownIcon className=""></ChevronDownIcon>
              <div className="tracking-[1px] leading-[1rem] uppercase">
                filter ViA
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-gray-100 flex flex-row items-center justify-start py-[0.5rem] px-[0.75rem] hover:bg-gray-200 cursor-pointer">
            <MixerVerticalIcon></MixerVerticalIcon>
          </div>
          <div className="rounded-xl bg-gray-100 flex flex-row items-center justify-start py-[0.5rem] px-[0.75rem]  hover:bg-gray-200 cursor-pointer">
            <MagnifyingGlassIcon></MagnifyingGlassIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveBar;

"use client";

import PropTypes from "prop-types";

import React, { useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ArchiveData } from "@/components/helpers/types/lib";

import { ListFilter, ArrowUpAZ } from "lucide-react";
import { MagnifyingGlassIcon, ChevronDownIcon } from "@radix-ui/react-icons";

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
    return data.reduce(
      (total, collection) => total + collection.mint.account,
      0
    );
  }, [data]);

  // construct total collections
  const totalCollections = useMemo(() => {
    return data.length;
  }, [data]);

  // construct total minted editions
  const totalMintedEditions = useMemo(() => {
    return data.reduce((total, collection) => total + collection.mint.count, 0);
  }, [data]);

  const [openstate, Setopenstate] = useState(true);

  return (
    <div className="w-full text-left text-gray-800 grid grid-rows-1 gap-4 uppercase">
      <h2 className="lg:text-[8.451rem] text-[2.4rem] lg:tracking-[2.46px] leading-snug md:leading-none">
        GALLERY ARCHIVE
      </h2>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-row items-end justify-between gap-[0.625rem] text-[0.75rem] text-gray-400 sm:order-1 w-full md:w-auto">
          <div className="flex flex-row justify-items-end gap-1 *:size-9 *:md:size-10 *:fill-gray-400">
            <div className="rounded-xl bg-gray-100 flex flex-row items-center justify-start py-[0.5rem] px-[0.75rem] grow hover:bg-gray-200">
              <ListFilter />
            </div>
            <div className="rounded-xl bg-gray-100 flex flex-row items-center justify-start py-[0.5rem] px-[0.75rem] hover:bg-gray-200">
              <ArrowUpAZ />
            </div>
            <div className="rounded-xl bg-gray-100 flex flex-row items-center justify-start py-[0.5rem] px-[0.75rem]  hover:bg-gray-200">
              <MagnifyingGlassIcon />
            </div>
          </div>
          <Button
            onClick={() => Setopenstate(!openstate)}
            className="bg-gray-100 hover:bg-gray-200 active:bg-gray-200 text-gray-400 rounded-xl text-xs space-x-2 p-2 md:py-2 px-3 flex flex-row gap-2 shadow-none md:hidden"
          >
            METADATA
            <ChevronDownIcon
              className={`transition-all duration-300 ${openstate ? "" : "rotate-180"}`}
            />
          </Button>
        </div>

        <div
          className={`md:grid place-content-between text-base grid grid-cols-2 md:grid-cols-6 gap-5 md:gap-2 2xl:gap-10 w-full px-2 md:px-0 lg:text-2xl ${openstate ? "hidden" : ""}`}
        >
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start">
                <div className="tracking-[1px] md:text-1xl">
                  {totalCollections ? totalCollections : "N/A"}
                </div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px]">
                  COLLECTIONS
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] md:text-1xl">
                  {totalMintVolume ? totalMintVolume : "N/A"}
                </div>
                <div className="tracking-[0.12px] text-gray-500"></div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px]">
                  ATTR. VOLUME
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] md:text-1xl">
                  {totalMintedEditions ? totalMintedEditions : "N/A"}
                </div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px]">
                  MINTED EDITIONS
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] md:text-1xl">12,453</div>
              </div>
              <div className="text-gray-500">
                <div className="text-xs lg:text-md tracking-[0.12px]">
                  UNIQUE OWNERS
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start gap-1">
              <div className="tracking-[1px] md:text-1xl">5,000</div>
              <div className="text-xs text-gray-500 lg:text-md tracking-[0.12px]">
                SECONDARY MARKET SALES
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveBar;

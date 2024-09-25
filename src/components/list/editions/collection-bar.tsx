import React, { useState } from "react";

import PropTypes from "prop-types";
import {
  MagnifyingGlassIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import {
  ArrowUpAZ,
  ListFilter,
  LayoutGrid
} from 'lucide-react'
import { useCollection } from "@/app/env/CollectionProvider";
import { ArtworkData } from "@/components/mint/artworkData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// function to format the date to dd/mm/yyyy
function formatDate(date: string): string {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

const CollectionBar: React.FC<{ collectionData: collectionData }> = ({
  collectionData, gridlayout, ongridchange
}) => {
  const [selectedMetadata, setSelectedMetadata] = useState("Hidden");

  const renderMetadataContent = () => {
    switch (selectedMetadata) {
      case "Description":
        return (
          <div className="text-[0.625rem] tracking-[0.1px] leading-5 text-left grid grid-cols-2 md:py-3 w-full gap-2">
            <div className="text-gray-400 col-span-1">
              COLLECTION NAME:
              <br />
              <span className="text-gray-600 text-base uppercase">
                {collectionData["collection"] || "N/A"}
              </span>
            </div>
            <div className="text-gray-400 col-span-1">
              COLLECTION ARTIST:
              <br />
              <span className="text-gray-600 text-base uppercase">
                {collectionData["artist"] || "N/A"}
              </span>
            </div>
            <div className="text-gray-400 col-span-2">
              DESCRIPTION:
              <br />
              <span className="text-gray-600 text-xs">
                {collectionData["description"] || "N/A"}
              </span>
            </div>
          </div>
        );
      case "Metadata":
        return (
          <div className="grid grid-cols-2 md:grid-cols-2 items-start justify-start gap-y-3 w-full md:py-3 text-base">
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start">
                <div className="flex flex-row items-end">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    {collectionData.opendate || "N/A"}
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">
                    COLLECTION OPENNED
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    {collectionData.mint.owners || "N/A"}
                  </div>
                  <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                    56%
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">
                    UNIQUE OWNERS
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    {collectionData.mint.account || "N/A"}
                  </div>
                  <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                    25%
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">
                    ATTR POINTS VOLUME
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    12.632
                  </div>
                  <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                    8.54%
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">
                    ethereum VOLUME
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    {collectionData.mint.count || "N/A"}
                  </div>
                  <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                    / {collectionData.mint.limit || "N/A"}
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">
                    MINTED EDITIONS
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="flex flex-row items-end justify-start">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    {collectionData.royalty || "N/A"}%
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">
                    ARTIST ROYALTY
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Contract":
        return (
          <div className="grid grid-cols-2 md:grid-cols-2 items-start justify-start gap-y-3 w-full md:py-3 text-base">
            {/* Replace with actual contract content */}
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start">
                <div className="flex flex-row items-end">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    {collectionData.opendate || "N/A"}
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">
                    CONTRACT ADDRESS
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    {collectionData.mint.owners || "N/A"}
                  </div>
                  <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                    56%
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">
                    TOKEN STANDARD
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    {collectionData.mint.account}
                  </div>
                  <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                    25%
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">Royalties</div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    12.632
                  </div>
                  <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                    8.54%
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">
                    ethereum VOLUME
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    {collectionData.mint.count}
                  </div>
                  <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                    / {collectionData.mint.limit}
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">
                    MINTED EDITIONS
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="flex flex-row items-end justify-start">
                  <div className="tracking-[1px] uppercase md:text-1xl">
                    {collectionData.royalty}%
                  </div>
                </div>
                <div className="text-xs lg:text-md text-gray-500">
                  <div className="tracking-[0.12px] uppercase">
                    ARTIST ROYALTY
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Hidden":
        return null;
      default:
        return null;
    }
  };
  return (
    <div className="w-full text-left text-gray-800 grid grid-rows-1 gap-4">
      <div className="text-3xl md:text-6xl lg:text-[8.451rem] tracking-[2.46px] lg:leading-[8.451rem] uppercase">
        {collectionData.collection ?? "N/A"}
      </div>
      <div className="flex flex-row items-start justify-between gap-4">
        <div className="md:grid grid-cols-2 md:grid-cols-8 items-start justify-start gap-5 lg:gap-2 md:order-first order-last w-full md:w-auto lg:text-2xl hidden">
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start">
              <div className="flex flex-row items-end justify-start">
                <div className="tracking-[1px] uppercase">
                  {collectionData.opendate}
                </div>
              </div>
              <div className="text-xs lg:text-md text-gray-500">
                <div className="tracking-[0.12px] uppercase">
                  COLLECTION OPENNED
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start">
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] uppercase">
                  {collectionData.mint.owners}
                </div>
                <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                  56%
                </div>
              </div>
              <div className="text-xs lg:text-md text-gray-500">
                <div className="tracking-[0.12px] uppercase">UNIQUE OWNERS</div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start">
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] uppercase">
                  {collectionData.mint.account}
                </div>
                <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                  25%
                </div>
              </div>
              <div className="text-xs lg:text-md text-gray-500">
                <div className="tracking-[0.12px] uppercase">
                  ATTR POINTS VOLUME
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start">
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] uppercase">12.632</div>
                <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                  8.54%
                </div>
              </div>
              <div className="text-xs lg:text-md text-gray-500">
                <div className="tracking-[0.12px] uppercase">
                  ethereum VOLUME
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start">
              <div className="flex flex-row items-end justify-start gap-[0.375rem]">
                <div className="tracking-[1px] uppercase">
                  {collectionData.mint.count}
                </div>
                <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                  / {collectionData.mint.limit}
                </div>
              </div>
              <div className="text-xs lg:text-md text-gray-500">
                <div className="tracking-[0.12px] uppercase">
                  MINTED EDITIONS
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start">
              <div className="flex flex-row items-end justify-start">
                <div className="tracking-[1px] uppercase">
                  {collectionData.royalty}%
                </div>
              </div>
              <div className="text-xs lg:text-md text-gray-500">
                <div className="tracking-[0.12px] uppercase">
                  ARTIST ROYALTY
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start">
              <div className="flex flex-row items-end justify-start">
                <div className="tracking-[1px] uppercase">
                  {collectionData.royalty}%
                </div>
              </div>
              <div className="text-xs lg:text-md text-gray-500">
                <div className="tracking-[0.12px] uppercase">
                  ARTIST ROYALTY
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-col items-start justify-start">
              <div className="flex flex-row items-end justify-start">
                <div className="tracking-[1px] uppercase">
                  {collectionData.royalty}%
                </div>
              </div>
              <div className="text-xs lg:text-md text-gray-500">
                <div className="tracking-[0.12px] uppercase">
                  ARTIST ROYALTY
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-start justify-between gap-[0.625rem] text-[0.75rem] text-gray-400 sm:order-1 w-full md:w-auto">
          <div className="flex flex-row justify-items-end gap-1 *:size-9 *:md:size-10 *:fill-gray-400">
            <div
              onClick={() => ongridchange(!gridlayout)} // Toggle gridlayout state
              className="rounded-xl bg-gray-100 flex flex-row items-center justify-start py-[0.5rem] px-[0.75rem]  hover:bg-gray-200 md:hidden"
            >
              <LayoutGrid />
            </div>
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
          <span className="flex flex-row gap-x-2 md:hidden">
            <Select onValueChange={(value) => setSelectedMetadata(value)}>
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
              {selectedMetadata !== "Hidden" && (
                <button
                  className="text-gray-300 p-2 self-end bg-gray-100 rounded-xl"
                  onClick={() => setSelectedMetadata("Hidden")}
                >
                  <Cross1Icon className="size-5 md:size-8" />
                </button>
              )}
            </Select>
          </span>
        </div>
      </div>
      {renderMetadataContent()}
    </div>
  );
};

export default CollectionBar;

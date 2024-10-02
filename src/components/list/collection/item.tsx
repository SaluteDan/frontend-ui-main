"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Radio, Stamp } from 'lucide-react';

import Preloader, { imageStyle } from "@/components/ui/icons/pre-loader";

/*
 * ArchiveItem component
 *
 * - Responsable for displaying the archive item
 * - Displaying the data
 *
 */

export interface ArchiveItemProps {
  collection?: string;
  artist: string | null;
  account: number | null;
  image?: string;
}

const ArchiveItem: React.FC<ArchiveItemProps> = ({
  collection,
  artist,
  account,
  image,
}) => {
  return (
    <Link href={`/archive/${collection}`}>
      <div className="rounded-xl bg-white uppercase flex-col items-start justify-start pt-[1.25rem] px-[0rem] pb-[0rem] box-border gap-[1.25rem] col-span-1 text-left text-[0.75rem] hover:bg-gray-100">
        <div className="self-stretch overflow-hidden flex flex-col items-center justify-start pt-[0rem] px-[0rem] pb-[1.25rem] gap-2 text-[1.5rem]">
          <div className="self-stretch flex flex-row items-center justify-center pt-[0rem] px-[1.25rem] pb-[1.25rem]">
            <Image
              alt="Artwork"
              src={image}
              width={400}
              height={400}
              placeholder={Preloader()}
              style={imageStyle}
            />
          </div>
          <div className="w-full flex flex-col items-start py-[0rem] px-6 gap-1 text-gray-800">
            <h3 className="m-0 text-inherit tracking-[1px] font-normal">
              {collection}
            </h3>
            <p className="m-0 text-[0.75rem] tracking-[1px] text-text-brand-light">
              {artist}
            </p>
          </div>
          <div className="self-stretch flex flex-row items-end justify-between px-[1.25rem] pb-[0rem]">
            <div className="flex flex-col items-start justify-start align-text-bottom">
              <h3 className="m-0 text-inherit tracking-[1px] font-normal align-text-bottom">
                {account}
              </h3>
              <h3 className="m-0 text-[0.75rem] tracking-[1px] font-normal text-text-brand-light">
                ATTR. Volume
              </h3>
            </div>
            <Link href={`/mint`}>
              <Button
                className="rounded-md bg-green-100 hover:bg-green-200 h-[2rem] flex flex-row shadow-none items-center justify-center py-[0rem] px-[0.75rem] gap-[0.5rem] text-[0.875rem] text-green-800 hover:text-green-600"
              >
                OPEN
                <Radio className="animate-pulse text-green-800 hover:text-green-600" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArchiveItem;

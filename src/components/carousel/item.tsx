"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import Link from "next/link";

import { EditionData } from "../mint/Editiondata";
import Placeholder, { imageStyle } from "@/components/ui/icons/pre-loader"

const List_item = ({
  edition,
  title,
  artist,
  image,
  attributes,
  collection,
  i,
}: EditionData) => {
  return (
    <CarouselItem key={i} className="flex flex-col justify-start md:text-[1.5rem] text-lg">
      <div className="flex flex-col justify-start gap-6 w-auto md:w-full">
        <div className="self-stretch flex flex-col justify-between">
          <h3 className="m-0 text-inherit tracking-[1px] uppercase flex flex-row justify-between items-start">
            <span className="flex flex-col md:flex-row gap-1 *:leading-none">
              <span className="">{collection}</span>
              <span className="md:order-last order-first">#{title}</span>
            </span>
            <div className="group-[.grid-cols-2]:hidden p-2 md:py-2 px-3 bg-gray-200 rounded-xl text-xs space-x-2">
              <span className="inline-block text-amber-600">1st Edition</span>
            </div>
          </h3>
          <p className="m-0 text-[0.75rem] tracking-[1px] uppercase">
            {artist}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between py-[0rem] md:px-[1.25rem] w-auto md:w-full">
          <CarouselPrevious className="bg-gray-200/30 text-gray-200 border-none min-w-8" />
          <Link
            href={`archive/${collection}/${title}`}
          >
            <Image
              className=""
              alt="Artwork"
              src={image || Placeholder()}
              width={500}
              height={500}
              placeholder={Placeholder()}
              style={{
                maxWidth: "65%",
                height: "auto",
                margin: "auto",
              }}
            />
          </Link>
          <CarouselNext className="bg-gray-200/30 text-gray-200 border-none min-w-8" />
        </div>
        <div className="text-[0.625rem] text-gray-400 w-full">
          <div className="grid grid-cols-1 justify-start gap-2 md:gap-5">
            <p className="tracking-[1px] uppercase">
              ATTRIBUTES ({attributes.length})
            </p>
            <div className="grid grid-cols-1 justify-between gap-0 md:gap-1 text-[0.75rem]">
              {attributes.map((attribute, i) => {
                return (
                  <div
                    key={i}
                    className="tracking-[0.12px] uppercase grid grid-cols-2 auto-cols-max justify-items-stretch text-base"
                  >
                    <p className="row-span-1">{attribute.trait_type}:</p>
                    <div className="grid grid-cols-1 row-span-1">
                      <p>{attribute.value}</p>
                      {/* {attribute.rarity !== null && (
                        <p>Rarity: {attribute.rarity}</p>
                      )}
                      {attribute.cost !== null && <p>Cost: {attribute.cost}</p>}
                      {attribute.won !== null && (
                        <p>Won: {attribute.won ? "Yes" : "No"}</p>
                      )} */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};

export default List_item;

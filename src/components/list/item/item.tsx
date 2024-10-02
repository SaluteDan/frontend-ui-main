import Image from "next/image";
import Link from "next/link";

import Preloader, { imageStyle } from "@/components/ui/icons/pre-loader";

import { EditionData } from "@/components/mint/Editiondata";
import { ArtworkData } from "@/components/mint/artworkData";

import { Share1Icon, PersonIcon } from "@radix-ui/react-icons";

import OpenSea from "@/components/ui/icons/OpenSea";
import Blur from "@/components/ui/icons/Blur";
import Solana from "@/components/ui/icons/Solana";

/*
 * Edition Item
 *
 * - Responsable for displaying the edition item
 * - Displaying the properties of the edition item
 *
 */

type ItemProps = {
  editionData: EditionData;
  collectionData: ArtworkData;
};

const EditionItem: React.FC<ItemProps> = ({ editionData, collectionData }) => {
  return (
    <div className="w-full rounded-xl bg-white flex flex-col items-center justify-start py-5 px-6 box-border gap-[1.25rem] text-left text-[1.5rem] text-gray-600">
      <div className="self-stretch flex flex-row justify-between py-[0rem] md:px-6 items-center">
        <div className="flex flex-col items-start justify-start md:pt-2 px-[0rem] pb-[0rem] box-border">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="grid items-start justify-start">
              <Link href={`/archive/${editionData.collection}`} passHref>
                <h3 className="m-0 text-inherit tracking-[1px] uppercase font-normal font-[inherit]">
                  {editionData.collection ?? "N/A"}
                </h3>
              </Link>
              <p className="m-0 self-stretch text-[0.75rem] tracking-[1px] uppercase">
                {editionData.artist ?? "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-row items-center gap-2 uppercase tracking-[1px] text-xs">
          <div
            className={`py-2 px-3 ${collectionData.mint.tier == 0 ? "bg-amber-100" : collectionData.mint.tier == 1 ? "bg-slate-100" : collectionData.mint.tier == 2 ? "bg-orange-100" : "bg-gray-200"} rounded-xl`}
          >
            {collectionData.mint.tier == 0 && (
              <span className="inline-block text-amber-600">1st Edition</span>
            )}
            {collectionData.mint.tier == 1 && (
              <span className="inline-block text-slate-600">2nd Edition</span>
            )}
            {collectionData.mint.tier == 2 && (
              <span className="inline-block text-orange-600">3rd Edition</span>
            )}
          </div>
          <div className="rounded-xl text-gray-200 bg-gray-800 flex-row items-center justify-start py-2 px-3 gap-[0.312rem] flex">
            <PersonIcon />
            <span>ATTR.{editionData.mint.membership ?? "N/A"}</span>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-[0.6fr,_1fr] items-end justify-center pt-[0rem] lg:px-6 pb-[0.625rem] gap-[1.25rem] text-[0.75rem]">
        <div className="flex-auto w-full md:w-auto flex flex-col items-start justify-start gap-6">
          <div className="leading-[160%] order-2 md:order-first">
            {editionData.description ?? "N/A"}
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-5 text-[1rem]">
            <div className="self-stretch flex flex-row items-start justify-between text-[0.625rem] uppercase">
              <div>ATTRIBUTES ({editionData.attributes.length})</div>
              <div className="text-gray-500">
                (ONE OF {collectionData.mint.count})
              </div>
            </div>
            <div className="flex flex-col w-full">
              {editionData.attributes.map((attribute, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row mb-4 text-sm md:text-base w-full tracking-[0.12px] uppercase"
                  >
                    <div className="flex flex-row items-start justify-between w-full">
                      <div className="flex-1">
                        {attribute.trait_type ?? "N/A"}:
                      </div>
                      <div className="flex-1 flex flex-col items-start justify-start gap-spacing-3">
                        <div className="self-stretch flex flex-row justify-between">
                          <div>{attribute.value ?? "N/A"}</div>
                          <div className="text-[10px] md:text-sm text-gray-400">
                            one of{" "}
                            {attribute.rarity
                              ? `1 OF ${Math.round(1 / attribute.rarity)}`
                              : "N/A"}
                          </div>
                        </div>
                        <div className="self-stretch flex flex-row items-start justify-between text-[10px] md:text-sm text-gray-400">
                          <div className="">
                            VOLUME: {new Intl.NumberFormat().format(attribute.cost ?? 0)}
                          </div>
                          <div className="">
                            {attribute.won !== null
                              ? attribute.won
                                ? "Won"
                                : "Not Won"
                              : "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-gray-200 border-t-[1px] border-solid box-border h-[0.063rem]" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-between text-gray-800 order-3 *:cursor-pointer">
            <div className="rounded-xl text-gray-200 bg-gray-800 flex-row items-center justify-start py-2 px-3 gap-[0.312rem] flex md:hidden">
              <PersonIcon />
              <span>ATTR.{editionData.mint.membership ?? "N/A"}</span>
            </div>
            <div className="self-stretch bg-gray-100 flex flex-row items-center justify-start p-3 rounded-xl hover:bg-gray-200">
              <Share1Icon></Share1Icon>
            </div>
            <div className="self-stretch *:rounded-xl *:bg-gray-100 flex-row items-center justify-center *:p-3 gap-[0.75rem] hidden">
              <div className="text-gray-400 hover:bg-gray-200">
                <OpenSea className="size-5" />
              </div>
              <div className="text-gray-400 hover:bg-gray-200">
                <Blur className="size-5" />
              </div>
              <div className="text-gray-400 hover:bg-gray-200">
                <Solana />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex-auto flex flex-row items-center justify-center md:p-5 order-first md:order-last">
          <Image
            className="object-cover"
            alt=""
            src={editionData.image}
            width={400}
            height={400}
            placeholder={Preloader()}
            style={imageStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default EditionItem;

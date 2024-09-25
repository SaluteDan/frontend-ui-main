import type { NextPage } from "next";
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

const Card: React.FC = ({ edition, volume, image, tier }: Props) => {
  return (
    <div className="h-full flex-1 w-full rounded-xl bg-white flex flex-col items-center justify-start p-5 group-[.grid-cols-2]:p-3 md:p-4 box-border text-left text-[0.75rem] hover:bg-gray-100 ">
      <Link href={`/archive/collection/${edition}`}>
        <div className="self-stretch flex flex-col items-center justify-start gap-[0.625rem]">
          <div className="self-stretch flex flex-row"></div>
          <div className="self-stretch overflow-hidden flex flex-col items-center justify-start md:gap-[1.125rem] text-[1.5rem] text-pink-gray-800">
            <div className="flex flex-row items-center justify-start md:pt-[0rem] md:px-[1.25rem]">
              <Image
                className="object-fill"
                alt={`Artwork for edition #${edition}`}
                src={image}
                width={400}
                height={400}
              />
            </div>
            <div className="self-stretch flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem] text-gray-800 text-base">
              <div className="flex justify-between w-full">
                <h3 className="m-0 tracking-[1px] uppercase text-xl">
                  #{edition}
                </h3>
                <div className={`group-[.grid-cols-2]:hidden p-2 md:py-2 px-3 ${tier == 0 ? 'bg-amber-100' : tier == 1 ? 'bg-slate-100' : tier == 2 ? 'bg-orange-100' : 'bg-gray-200'} rounded-xl place-self-end text-xs space-x-2 uppercase`}>
                  {tier == 0 && <span className="inline-block text-amber-600">1st Edition</span>}
                  {tier == 1 && <span className="inline-block text-slate-600">2nd Edition</span>}
                  {tier == 2 && <span className="inline-block text-orange-600">Open Edition</span>}
                </div>
              </div>
              <div className="tracking-[1px] uppercase text-[0.875rem] basis-full text-gray-400">
                {volume} ATTR.
              </div>

            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

Card.propTypes = {
  edition: PropTypes.string,
  volume: PropTypes.string,
  image: PropTypes.string,
};

export default Card;

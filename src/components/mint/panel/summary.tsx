"use client";

import React from "react";

// import type helpers
import { summary } from "@/components/helpers/mint/summary";
import { getAttributecount } from "@/components/helpers/collection/collection";

import { useEnvironment } from "@/app/env/provider";
import { ArtworkData } from "../artworkData";

const MintSummary = ({
  artworkData,
  totalStake,
  stakedAttributeCount,
  stakeValues,
}) => {
  function getstaked(artworkData: ArtworkData) {
    // return the input value for each option for all attributes the artworkdata
    const attributeOptions = artworkData.attributes;
    let staked = 0;
    // for each attibute Option in the current attribute
    for (const option of Object.keys(attributeOptions)) {
      for (const [key, value] of Object.entries(attributeOptions[option])) {
        if (value.input) {
          staked += value.input;
        }
      }
    }
    return staked;
  }

  const { walletAddress, tokenId, balance, tokentier, tokendiscount } =
    useEnvironment();
  const attrbuitecount = getAttributecount(artworkData.attributes);

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem] box-border gap-1 text-[0.75rem]">
        <div className="text-[0.625rem] tracking-[0.06em] uppercase text-gray-400">
          SUMMARY:
        </div>
        <div className="self-stretch flex flex-row items-end justify-between">
          <div className="tracking-[0.36px] uppercase">MINT FEE:</div>
          <div className="tracking-[0.36px] uppercase text-right text-lg">
            {artworkData["mint"]["cost"]}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-end justify-between pt-[0rem] px-[0rem] pb-[1.25rem]">
          <div className="tracking-[0.36px] uppercase text-gray-800">
            TRANSACTION COST:
          </div>
          <div className="tracking-[0.36px] uppercase text-right text-lg">
            {artworkData.mint.cost + totalStake} ATTR
          </div>
        </div>
        {/* <div className="self-stretch flex flex-row items-start justify-between">
          <div className="tracking-[0.36px] uppercase">MEMBER ID:</div>
          <div className="tracking-[0.36px] uppercase">{tokenId}</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="tracking-[0.36px] uppercase">WALLECT ADDRESS:</div>
          <div className="tracking-[0.36px] uppercase">{walletAddress}</div>
        </div> */}
        <div className="self-stretch flex flex-row items-start justify-between text-gray-400">
          <div className="tracking-[0.36px] uppercase">TIER DISCOUNT:</div>
          <div className="tracking-[0.36px] uppercase text-right">
            {tokendiscount}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between text-gray-400">
          <div className="tracking-[0.36px] uppercase">attributes STAKED:</div>
          <div className="tracking-[0.36px] uppercase">
            {stakedAttributeCount}/{attrbuitecount}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between text-gray-400">
          <div className="tracking-[0.36px] uppercase">POINTS STAKED:</div>
          <div className="tracking-[0.36px] uppercase text-right">
            {totalStake}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between pt-[0rem] px-[0rem] pb-[1.25rem] text-gray-400">
          <div className="tracking-[0.36px] uppercase">REMAINING BALANCE:</div>
          <div className="tracking-[0.36px] uppercase text-right">
            {balance - artworkData.mint.cost - totalStake}
          </div>
        </div>
      </div>
    </>
  );
};

export default MintSummary;

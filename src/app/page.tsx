"use client";

// Import React libraries
import React, { useState, useRef, useCallback, useEffect } from "react";

// Import Next.js libraries
import * as Img from "next/image";
import Link from "next/link";

// Import loading skeleton
import LoadingSkeleton from "@/app/loading";

// Import the components
import AttributesAccordion from "@/components/mint/panel/attributes";
import MintSummary from "@/components/mint/panel/summary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Popover from "@radix-ui/react-popover";
import { PopoverContent } from "@/components/ui/popover";
import { renderModal } from "@/components/mint/modal/modalrender";
import MintBanner from "@/lib/svgmaker";

import { Attributespopver } from "@/components/mint/panel/popover";

// Import the icons
import { InfoCircledIcon, Cross1Icon } from "@radix-ui/react-icons";

// Import the utility function from the collection helper
import { maskString } from "@/components/helpers/collection/collection";

// Import the DataProvider and useCollection hook from the CollectionProvider
import { DataProvider, useCollection } from "./env/CollectionProvider";
import { useEnvironment } from "./env/provider";

/* Mint Page
 *
 * - Responable for minting an edition
 * - Fetching the artwork data from the collection
 * - Handling the staking of attributes
 * - Drawing the canvas
 * - Rendering the mint summary
 *
 */

export function Home() {
  const { collectionData, error, isLoading } = useCollection();
  const [totalStake, setTotalStake] = useState(0);
  const [stakedAttributeCount, setStakedAttributeCount] = useState(0);
  const [stakeValues, setStakeValues] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedMetadata, setSelectedMetadata] = useState("Hidden");
  const [resetStakeValues, setResetStakeValues] = useState(false);
  const [canvasImage, setCanvasImage] = useState<string | null>(null); // Define canvasImage state
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const { walletAddress, balance, tokendiscount, tokentier } = useEnvironment();

  const artworkData = collectionData ? collectionData[0] : null;
  const attributes = artworkData?.attributes || null;

  const canvasSize = {
    width: 160,
    height: 230,
  };

  const initializeSelectedOptions = useCallback((attrs) => {
    if (!attrs) return {};
    const initialOptions = {};
    Object.entries(attrs).forEach(([key, value]) => {
      initialOptions[key] = getSelectedOption(value.options);
    });
    return initialOptions;
  }, []);

  // Initialize selected options
  useEffect(() => {
    if (attributes) {
      const options = initializeSelectedOptions(attributes);
      console.log("Initialized selected options:", options);
      setSelectedOptions(options);
    }
  }, [attributes, initializeSelectedOptions]);

  const drawCanvas = useCallback((attrs, selectedOpts) => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas is available

    const context = canvas.getContext("2d");
    if (!context) return; // Ensure context is available

    context.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // Temporary: Draw a simple rectangle to test drawing functionality
    context.fillStyle = "blue"; // Change color as needed
    context.fillRect(10, 10, 100, 100); // Draw a rectangle

    // Log the selected options before loading images
    console.log("Drawing canvas with selected options:", selectedOpts);

    // Create an array of promises for loading images
    const imagePromises = Object.entries(selectedOpts).map(
      ([attributeKey, optionKey]) => {
        return new Promise((resolve) => {
          const option = attrs[attributeKey]?.options[optionKey];
          if (option && option.image) {
            const img = new Image();
            img.onload = () => resolve({ attributeKey, img });
            img.src = option.image;
          } else {
            resolve(null);
          }
        });
      }
    );

    // Wait for all images to load, then draw them in reverse order
    Promise.all(imagePromises).then((images) => {
      context.clearRect(0, 0, canvasSize.width, canvasSize.height); // Clear before drawing
      images.reverse().forEach((imageData) => {
        if (imageData) {
          context.globalCompositeOperation = "destination-over";
          context.drawImage(
            imageData.img,
            0,
            0,
            canvasSize.width,
            canvasSize.height
          );
        }
      });
      setCanvasImage(canvas.toDataURL()); // Capture the canvas image after drawing
    });
  }, []);

  // Check if canvas is ready
  useEffect(() => {
    console.log("Checking if canvas is ready..."); // Log to see if this effect runs
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        setIsCanvasReady(true);
        console.log("Canvas is ready for drawing."); // Log when canvas is ready
      } else {
        console.log("Canvas context is not available."); // Log if context is not available
      }
    } else {
      console.log("Canvas element is not available."); // Log if canvas is not found
    }
  }, [canvasRef]);

  // Draw on canvas when attributes, selected options, and canvas are ready
  useEffect(() => {
    if (attributes && selectedOptions && isCanvasReady) {
      console.log("Attributes and selected options are ready for drawing."); // Log before drawing
      drawCanvas(attributes, selectedOptions);
    } else {
      console.log(
        "Waiting for attributes, selected options, or canvas to be ready."
      ); // Log if not ready
    }
  }, [attributes, selectedOptions, drawCanvas, isCanvasReady]);

  const getSelectedOption = (attributeOptions) => {
    let totalWeight = 0;
    const optionMap = {};
    let inputValues = [];

    for (const option of Object.keys(attributeOptions)) {
      const optionWeight =
        attributeOptions[option].Weight + (attributeOptions[option].input || 0);
      optionMap[option] = optionWeight;
      totalWeight += optionWeight;
      if (attributeOptions[option].input !== undefined) {
        inputValues.push(attributeOptions[option].input);
      }
    }

    let random = Math.floor(Math.random() * totalWeight);
    for (const option of Object.keys(optionMap)) {
      random -= optionMap[option];
      if (random < 0) {
        return option;
      }
    }
  };

  useEffect(() => {
    if (attributes && selectedOptions) {
      drawCanvas(attributes, selectedOptions);
    }
  }, [attributes, selectedOptions, drawCanvas]);

  const handleStakeChange = (
    newTotalStake,
    newStakedAttributeCount,
    newStakeValues,
    newSelectedOptions
  ) => {
    setTotalStake(newTotalStake);
    setStakedAttributeCount(newStakedAttributeCount);
    setStakeValues(newStakeValues);
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // validate wallet has the balance for the transaction
    setIsAlertOpen(true); // Always open a modal
  };

  const renderMetadataContent = () => {
    switch (selectedMetadata) {
      case "Description":
        return (
          <div className="text-[0.625rem] tracking-[0.1px] leading-5 text-left grid grid-cols-2 md:py-3 w-full gap-2">
            <div className="text-gray-400 col-span-1">
              COLLECTION NAME:
              <br />
              <span className="text-gray-600 text-base uppercase">
                {artworkData["collection"]}
              </span>
            </div>
            <div className="text-gray-400 col-span-1">
              COLLECTION ARTIST:
              <br />
              <span className="text-gray-600 text-base uppercase">
                {artworkData["artist"]}
              </span>
            </div>
            <div className="text-gray-400 col-span-2">
              DESCRIPTION:
              <br />
              <span className="text-gray-600 text-xs">
                {artworkData["description"]}
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
                    {artworkData.opendate}
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
                    {artworkData.mint.owners}
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
                    {artworkData.mint.account}
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
                    {artworkData.mint.count}
                  </div>
                  <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                    / {artworkData.mint.limit}
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
                    {artworkData.royalty}%
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
                    {artworkData.opendate}
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
                    {artworkData.mint.owners}
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
                    {artworkData.mint.account}
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
                    {artworkData.mint.count}
                  </div>
                  <div className="text-[0.75rem] tracking-[0.12px] uppercase text-gray-500">
                    / {artworkData.mint.limit}
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
                    {artworkData.royalty}%
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

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <p>Error loading data</p>;

  if (!artworkData) return <p>No artwork data available</p>;

  return (
    <main className="flex flex-col items-center justify-between lg:px-10 md:pb-20 px-4 pb-6 md:gap-4">
      {/* <div className="w-full flex flex-row items-start justify-start gap-3 text-xs text-gray-200">
        <div className="rounded-xl flex flex-row items-center justify-center py-[0.5rem] px-[0.75rem] border-[1px] border-solid border-gray-200 leading-[1rem] uppercase">
          ERC721
        </div>
        <div className="rounded-xl flex truncate flex-row items-center justify-center py-[0.5rem] px-[0.75rem] border-[1px] border-solid border-gray-200 leading-[1rem] uppercase">
          {artworkData && maskString(artworkData.address)}
        </div>
        <div className="rounded-xl flex flex-row items-center justify-center py-[0.5rem] px-[0.75rem] border-[1px] border-solid border-gray-200 leading-[1rem] uppercase">
          TIER 1 CONTRACT
        </div>
        <div />
      </div> */}
      <div className="w-full tracking-[0.04em] uppercase relative -z-10">
        {/* For Desktop */}
        <Img.default
            src="img/Edition.svg"
            alt="MINT"
            width={100}
            height={100}
            className="w-full opacity-40 hidden md:block"
          />
        {/* For Mobile */}
          <Img.default
            src="img/mint.svg"
            alt="MINT"
            width={100}
            height={100}
            className="w-full opacity-40 md:hidden"
          />
      </div>
      <div className="grid grid-row-1 md:grid-cols-[1fr,2fr] lg:gap-x-3 gap-y-4 md:gap-y-0 justify-items-center w-full mt-4 md:mt-0">
        <div className="w-full flex flex-col items-start justify-start gap-y-4 text-left text-[0.75rem]">
          <div className="flex flex-col items-center justify-between w-full">
            <div className="flex flex-col items-start justify-end gap-4 md:gap-[1.25rem_0rem] w-full">
              <div
                id="desktop-metadta"
                className="md:flex flex-col items-start justify-start hidden gap-y-3"
              >
                <div className="text-5xl">
                  <Link href={`archive/${artworkData.collection}`}>
                    {artworkData && artworkData.collection}
                  </Link>
                </div>
                <div className="items-start tracking-[0.12px] uppercase text-1xl">
                  {artworkData && artworkData.artist}
                </div>
              </div>
              <div className="grid grid-cols-2 justify-between w-full gap-10">
                <div className="text-[1.5rem] tracking-[0.12px] uppercase text-gray-600">
                  <div className="tracking-[0.12px] uppercase text-xs">
                    EDITION:
                  </div>
                  {artworkData["mint"]["count"]}/{artworkData["mint"]["limit"]}
                </div>
                <span className="flex flex-row gap-1 justify-end">
                  {/* icon button used to select the metadata value to hiddn && shows when selectedMetadata is not hidden */}

                  <Select onValueChange={(value) => setSelectedMetadata(value)}>
                    <SelectTrigger className="w-auto self-end border-none shadow-none active:bg-gray-100 text-gray-400 rounded-xl active:ring-0 focus:bg-gray-100 bg-gray-50 focus:ring-0 justify-start gap-2">
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
                        <Cross1Icon className="size-5" />
                      </button>
                    )}
                  </Select>
                </span>
              </div>
              {renderMetadataContent()}
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-start gap-1 text-[0.875rem] text-gray-600">
            <div className="self-stretch flex flex-col items-center justify-start pt-[0rem] px-[0rem] pb-[1.25rem] gap-[0.5rem_0rem]">
              <div className="self-stretch flex flex-row items-center justify-between py-[0rem] text-[0.625rem]">
                <div className="flex flex-row gap-4 items-center min-h-8">
                  {/* <Attributespopver /> */}
                  <div className="tracking-[0.34px] leading-[1rem] uppercase col-start-1">
                    ATTRIBUTES
                  </div>
                </div>
                {totalStake > 0 && (
                  <button
                    className="text-gray-400 p-2 self-end bg-gray-100 rounded-xl flex flex-row gap-x-3 items-center focus:bg-gray-200"
                    onClick={() => {
                      setStakeValues(
                        Object.keys(attributes).reduce(
                          (acc, key) => {
                            acc[key] = 0;
                            return acc;
                          },
                          {} as Record<string, number>
                        )
                      );
                      setTotalStake(0);
                      setStakedAttributeCount(0);
                      setResetStakeValues(true);
                      setTimeout(() => setResetStakeValues(false), 100);
                    }}
                  >
                    RESET STAKES
                    <Cross1Icon className="size-3 text-gray-300" />
                  </button>
                )}
              </div>
              <AttributesAccordion
                attributes={attributes}
                onStakeChange={handleStakeChange}
                selectedOptions={selectedOptions}
                resetStakeValues={resetStakeValues}
              />
            </div>
            <MintSummary
              artworkData={artworkData}
              totalStake={totalStake}
              stakedAttributeCount={stakedAttributeCount}
              stakeValues={stakeValues}
            />
            <form
              onSubmit={(e) =>
                handleSubmit(e, {
                  balance: Number(balance) || 0,
                  tokentier: Number(tokentier) || 0,
                  totalStake: Number(totalStake) || 0,
                })
              }
              className="w-full"
            >
              <button
                type="submit"
                className="w-full rounded-xl bg-gray-200 py-4 text-lg hover:bg-gray-300"
              >
                <p className="tracking-[1px] leading-[1.5rem]">MINT EDITION</p>
              </button>
            </form>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className="order-first md:order-last lg:max-w-3xl lg:max-h-96"
          width={canvasSize.width}
          height={canvasSize.height}
        />
      </div>
      {renderModal(
        isAlertOpen,
        setIsAlertOpen,
        totalStake,
        artworkData,
        balance,
        tokendiscount,
        stakedAttributeCount,
        stakeValues,
        selectedOptions,
        canvasImage // Pass the canvas image here
      )}
    </main>
  );
}

export default function PageWithProvider() {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
}

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect, useState } from "react";

// Import the minting components from the mint folder
import Canvas from "@/components/mint/canvas/canvas";
import { ArtworkData, imageSource } from "@/components/mint/artworkData";
import AttributesAccordion from "@/components/mint/panel/attributes";
import MintSummary from "@/components/mint/panel/summary";

async function fetchArtworkData(): Promise<ArtworkData> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collection`);
  const data = await response.json();
  return data;
}

type Props = {
  artworkData: ArtworkData;
  imageSource: imageSource;
};

export default function Home(props: Props) {
  const [artworkData, setArtworkData] = useState<ArtworkData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchArtworkData();
        console.log(data);
        setArtworkData(data);
      } catch (error) {
        console.error("Error fetching artwork data:", error);
      }
    };

    fetchData().catch(console.error);
  }, []);

  // What to show when the collection metadata is still being fetched
  if (!artworkData) {
    return <div>Loading...</div>;
  }

  const { attributes } = artworkData;
  console.log("artworkData", attributes);

  const draw = (context: object, attributes: object) => {
    
    context.clearRect(0, 0, 800, 600);

    function getSelectedOption(
      attributeOptions: AttributeOptions
    ): string | undefined {
      let totalWeight = 0;
      const optionMap: { [key: string]: number } = {};
      let inputValues: number[] = [];

      for (const option of Object.keys(attributeOptions)) {
        const optionWeight =
          attributeOptions[option].Weight +
          (attributeOptions[option].input || 0);
        optionMap[option] = optionWeight;
        totalWeight += optionWeight;
        if (attributeOptions[option].input !== undefined) {
          inputValues.push(attributeOptions[option].input);
        }
        console.log(inputValues, optionMap);
      }

      let random = Math.floor(Math.random() * totalWeight);
      for (const option of Object.keys(optionMap)) {
        random -= optionMap[option];
        if (random < 0) {
          return option;
        }
      }
    }

    // For each attribute in the artworkData, get the options key and value
    Object.entries(attributes).forEach(([key, value]) => {
      const selectedOption = getSelectedOption(value.options);
      console.log("Selected", key + selectedOption);

      const imageSources = (attributes: ArtworkData) => {
        const imageSources = {};
        Object.entries(attributes).forEach(([attributeKey, attributeValue]) => {
          const options = {};
          Object.entries(attributeValue.options).forEach(
            ([optionKey, optionValue]) => {
              options[optionKey] = optionValue.image;
            }
          );
          imageSources[attributeKey] = options;
        });
        return imageSources;
      };

      // map over imageSources and use the selectedOption as a key to draw right image
      const drawImage = (
        context: CanvasRenderingContext2D,
        imageSources: { [key: string]: { [key: string]: string } },
        selectedOption: string
      ) => {
        for (const attributeKey of Object.keys(imageSources)) {
          const image = new Image();
          image.src = imageSources[attributeKey][selectedOption];
          image.onload = () => {
            context.drawImage(image, 0, 0, 800, 600);
            context.globalCompositeOperation = "destination-under";
            console.log("Attribute", attributeKey + "image", image);
            return context
          };
        }
      };

      drawImage(context, imageSources(attributes), selectedOption);
      console.log("Image Sources", imageSources(attributes));

      // update the attriutes ArtworkData with the selected option for each attribute
      attributes[key].selected = selectedOption;
    });
  };

  function maskString(input) {
    if (input.length > 8) {
      return input.substring(0, 4) + "...." + input.substring(input.length - 4);
    }
    return input;
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between px-[40px] pb-20">
        <div className="w-full flex flex-row items-start justify-start gap-[0rem_0.75rem] text-[0.75rem] text-gray-200">
          <div className="rounded-xl flex flex-row items-center justify-center py-[0.5rem] px-[0.75rem] border-[1px] border-solid border-gray-200 tracking-[1px] leading-[1rem] uppercase">
            ERC721
          </div>
          <div className="rounded-xl flex truncate flex-row items-center justify-center py-[0.5rem] px-[0.75rem] border-[1px] border-solid border-gray-200 tracking-[1px] leading-[1rem] uppercase">
            {artworkData && maskString(artworkData.address)}
          </div>
          <div className="rounded-xl flex flex-row items-center justify-center py-[0.5rem] px-[0.75rem] border-[1px] border-solid border-gray-200 tracking-[1px] leading-[1rem] uppercase">
            TIER 1 CONTRACT
          </div>
          <div />
        </div>
        <div className="w-full text-[12.2vw] tracking-[0.04em] leading-[12.275rem] uppercase text-gray-200 text-left">
          MINT EDITION
        </div>
        <div className="w-full grid grid-cols-2 gap-x-3">
          <div className="w-full flex flex-col items-start justify-start gap-[2.125rem_0rem] text-left text-[0.75rem] text-text-brand-light">
            <div className="flex flex-col items-center justify-start">
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-col items-start justify-end gap-[1.25rem_0rem]">
                  <div className="flex flex-col items-start justify-start text-[2.125rem]">
                    <div className="w-[24.313rem] tracking-[0.12px] uppercase inline-block">
                      {artworkData && artworkData.collection}
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <div className="tracking-[0.12px] uppercase">
                      {artworkData && artworkData.artist}
                    </div>
                  </div>
                  <div className="text-[2.125rem] tracking-[0.12px] uppercase text-gray-600">
                    {artworkData["mint"]["count"]}/
                    {artworkData["mint"]["limit"]}
                  </div>
                  <div className="tracking-[0.12px] uppercase">EDITIONS:</div>
                  <div className="flex flex-col items-start justify-end gap-[1.25rem_0rem] text-right text-gray-600">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Description" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Description">Description</SelectItem>
                        <SelectItem value="Metadata">METADATA</SelectItem>
                        <SelectItem value="Contract">CONTRACT</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="w-[21.564rem] text-[0.625rem] tracking-[0.1px] leading-[1rem] text-text-brand-light text-left inline-block">
                      {artworkData["description"]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[24.313rem] flex flex-col items-center justify-start gap-[0.313rem_0rem] text-[0.875rem] text-gray-600">
              <div className="self-stretch flex flex-col items-center justify-start pt-[0rem] px-[0rem] pb-[1.25rem] gap-[0.5rem_0rem]">
                <div className="self-stretch flex flex-row items-center justify-between py-[0rem] px-[0.375rem] text-[0.625rem] text-text-brand-light">
                  <div className="tracking-[0.34px] leading-[1rem] uppercase">
                    ATTRIBUTES
                  </div>
                  <div className="flex flex-row items-center justify-start">
                    <img
                      className="w-[1rem] rounded-3xs h-[1rem]"
                      alt=""
                      src="ic_info_outline copy 2.svg"
                    />
                  </div>
                </div>
                <AttributesAccordion attributes={attributes} />
              </div>
              <MintSummary artworkData={artworkData} />
            </div>
          </div>
          <Canvas
            draw={draw}
            attributes={attributes}
            width="800"
            height="800"
          />
        </div>
      </main>
    </>
  );
}

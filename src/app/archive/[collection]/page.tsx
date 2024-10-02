"use client";

import React, { useState } from "react";
import { notFound } from 'next/navigation'

import CollectionBar from "@/components/list/editions/collection-bar";
import Card from "@/components/list/editions/item";

import { DataProvider, useCollection } from "@/app/env/CollectionProvider";

import { maskString } from "@/components/helpers/collection/collection";
import { ArtworkData } from "@/components/mint/artworkData";
import { EditionData } from "@/components/mint/Editiondata";

// Define the type for a single collection item
type CollectionItem = ArtworkData;

// Define the type for the data returned by useCollection
interface CollectionHookData {
  collectionData: CollectionItem[];
  editionData: EditionData[];
  isLoading: boolean;
  error: Error | null;
}
function CollectionPage() {
  const { collectionData, editionData, isLoading, error } = useCollection() as CollectionHookData;
  const [gridLayout, setGridLayout] = useState(false)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading data: {error.message}</p>

  return (
    <div className="w-full flex flex-col items-center justify-start box-border gap-4 text-left text-gray-400 pb-[2.5rem] px-4 md:px-10">
      {collectionData.map((collection: CollectionItem, index: number) => (
        <div key={collection.id || index} className="w-full">
          {/* <div className="w-full flex flex-row items-start justify-start gap-[0.75rem] text-left text-[0.625rem] text-gray-400 mb-4 hidden md:flex">
            <div className="rounded-xl border-gray-400 border-[1px] border-solid flex flex-row items-center justify-center py-[0.45rem] px-[0.65rem]">
              <span className="tracking-[1px] leading-[1rem] uppercase">
                {maskString(collection.address)}
              </span>
            </div>
            <div className="rounded-xl border-gray-400 border-[1px] border-solid flex flex-row items-center justify-center py-[0.45rem] px-[0.65rem]">
              <span className="tracking-[1px] leading-[1rem] uppercase">
                ERC-1155
              </span>
            </div>
          </div> */}
          <CollectionBar collectionData={collection} gridlayout={gridLayout} ongridchange={setGridLayout}/>
          <section className={`grid group md:grid-cols-4 md:gap-4 gap-2 w-full mt-2 md:mt-4 ${gridLayout === true ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {editionData
              .filter((edition: EditionData) => edition.collectionId === collection.id)
              .map((edition: EditionData, editionIndex: number) => (
                <Card
                  key={edition.id || editionIndex}
                  edition={edition.id}
                  volume={edition.cost}
                  image={edition.url}
                  tier={edition.tier}
                />
              ))}
          </section>
        </div>
      ))}
    </div>
  )
}

export default function PageWithProvider() {
  return (
    <DataProvider>
      <CollectionPage />
    </DataProvider>
  )
}
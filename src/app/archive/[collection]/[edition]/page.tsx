"use client";

import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import EditionBar from "@/components/list/item/item-bar";
import EditionItem from "@/components/list/item/item";
import { EditionData, EditionArray } from "@/components/mint/Editiondata";
import { ArtworkData } from "@/components/mint/artworkData";

import LoadingSkeleton from "@/app/archive/[collection]/[edition]/loading";



/*
 * Edition page
 *
 * - Responsable for displaying the edition page
 * - Fetching data from the database
 * - Displaying the data
 *
 */

// fetch the edition data from the API
async function fetchEditionData(edition: string): Promise<EditionData[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collection/editions/${edition}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// fetch the collection data from the API
async function fetchCollectionData(collection: string): Promise<ArtworkData[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collection`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// create props for the page
interface EditionPageProps {
  params: { edition: string; collection: string };
}

const EditionPage: NextPage<EditionPageProps> = ({ params }) => {
  // get the edition and collection from the params
  const { edition, collection } = params;

  // fetch the edition data from the API
  const {
    data: editionData,
    isLoading,
    error,
  } = useQuery<EditionData[]>({
    queryKey: ["edition", edition],
    queryFn: () => fetchEditionData(edition),
  });

  // fetch the collection data from the API
  const {
    data: collectData,
    isLoading: isLoadingCollect,
    error: errorCollect,
  } = useQuery<ArtworkData[]>({
    queryKey: ["collection", collection],
    queryFn: () => fetchCollectionData(collection),
  });

  // if the data is loading, return a loading message
  if (isLoading || isLoadingCollect) return <LoadingSkeleton />;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  if (errorCollect)
    return <div>An error occurred: {(errorCollect as Error).message}</div>;
  if (!editionData || editionData.length === 0)
    return <div>No edition data available</div>;
  if (!collectData) return <div>No collection data available</div>;

  // get the current edition and collection from the data
  const currentEdition = editionData[0];
  const currentCollection = collectData[0];

  // Get the first item from the array

  return (
    <>
      <section className="w-full px-4 md:px-10 flex flex-col items-center justify-start py-4 lg:pb-7 box-border gap-6 text-left text-gray-400 pt-0">
        <div className="w-full flex flex-row items-start justify-start gap-[0.75rem] text-left text-[10px] lg:text-[0.75rem] text-gray-400 *:py-[0.45rem] *:px-[0.65rem] hidden md:block">
          <div className="rounded-xl border-gray-400 border-[1px] border-solid flex flex-row items-center justify-center py-[0.45rem] px-[0.65rem]">
            <Link href={`/archive/${currentEdition.collection}`} passHref>
              <span className="leading-[1rem] uppercase">
                {currentEdition.collection}
              </span>
            </Link>
          </div>
          <div className="rounded-xl border-gray-400 border-[1px] border-solid flex flex-row items-center justify-center">
            <span className="leading-[1rem] uppercase">FIRST EDITION</span>
          </div>
          <div className="rounded-xl border-gray-400 border-[1px] border-solid flex flex-row items-center justify-center">
            <span className="leading-[1rem] uppercase">0x66...eea7</span>
          </div>
        </div>
        <EditionBar
          editionData={currentEdition}
          collectionData={currentCollection}
        />
        <EditionItem
          editionData={currentEdition}
          collectionData={currentCollection}
        />
      </section>
    </>
  );
};

export default EditionPage;

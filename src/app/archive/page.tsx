"use client";

import type { NextPage } from "next";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import loadingSkeleton from "./loading";

import { ArchiveData } from "@/components/helpers/types/api-lib";
import ArchiveItem from "@/components/list/collection/item";
import ArchiveBar from "@/components/list/collection/archive-bar";

/*
 * Archive page
 *
 * - Responsable for displaying the gallery archive page
 * - Fetching collection archive data from the database
 * - Displaying the data in a grid
 *
 */

// fetch the edition data from the API
async function fetchArchiveData(): Promise<ArchiveData[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archive`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

const ArchivePage: NextPage = () => {
  const {
    data: ArchiveData,
    isLoading,
    error,
  } = useQuery<ArchiveData[]>({
    queryKey: ["archive"],
    queryFn: () => fetchArchiveData(),
  });

  if (isLoading) return loadingSkeleton();
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <>
      <section className="w-full px-4 md:px-10 flex flex-col items-center justify-start py-4 lg:pb-7 box-border text-left text-gray-400 pt-0">
        
        <ArchiveBar data={ArchiveData || []} />
        <section className="grid md:grid-cols-4 grid-cols-1 gap-4 w-full mt-2 md:mt-4">
          {ArchiveData && ArchiveData.map((archive: ArchiveData, archiveIndex: number) => (
            // for each archive item, render an ArchiveItem component
            // calcuate if the collection open or close to mint
            // if open, set boolean to true
            <ArchiveItem
              key={archiveIndex}
              collection={archive.collection}
              artist={archive.artist}
              account={archive.mint.account}
              image={archive.thumbnail}
            />
          ))}
        </section>
      </section>
    </>
  );
};

export default ArchivePage;
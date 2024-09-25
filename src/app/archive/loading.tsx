import ArchiveBar from "@/components/list/collection/archive-bar";
import React from "react";
import { ReactNode } from "react";

// construct the loading skeleton
export default function loadingSkeleton(): ReactNode {
  return (
    <section className="w-full px-4 md:px-10 flex flex-col items-center justify-start py-4 lg:pb-7 box-border gap-6 pt-0">
      <ArchiveBar data={[]} />
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4 w-full mt-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 rounded-lg h-44"
          ></div>
        ))}
      </div>
    </section>
  );
}

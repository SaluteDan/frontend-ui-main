import React, { ReactNode } from "react";

export default function loadingSkeleton(): ReactNode {
  return (
    <section className="w-full px-4 md:px-10 flex flex-col items-center justify-start py-4 lg:pb-7 box-border gap-6 text-left text-gray-400 pt-0">
      <div className="w-full flex flex-row items-start justify-start gap-[0.75rem] text-left text-[10px] lg:text-[0.75rem] text-gray-400 *:py-[0.45rem] *:px-[0.65rem]">
        <div className="rounded-xl border-gray-400 border-[1px] border-solid flex flex-row items-center justify-center py-[0.45rem] px-[0.65rem]">
          <div className="animate-pulse bg-gray-200 h-4 w-24"></div>
        </div>
        <div className="rounded-xl border-gray-400 border-[1px] border-solid flex flex-row items-center justify-center">
          <div className="animate-pulse bg-gray-200 h-4 w-28"></div>
        </div>
        <div className="rounded-xl border-gray-400 border-[1px] border-solid flex flex-row items-center justify-center">
          <div className="animate-pulse bg-gray-200 h-4 w-20"></div>
        </div>
      </div>
      <div className="w-full h-64 animate-pulse bg-gray-200"></div>
      <div className="w-full h-96 animate-pulse bg-gray-200"></div>
    </section>
  );
}

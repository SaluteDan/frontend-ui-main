import React, { ReactNode } from "react";

export default function loadingSkeleton(): ReactNode {
  return (
    <main className="flex flex-col items-center justify-between lg:px-10 md:pb-20 p-4">
      <div className="w-full flex flex-row items-start justify-start gap-3 text-xs text-gray-200">
        <div className="rounded-xl flex flex-row items-center justify-center py-[0.5rem] px-[0.75rem] border-[1px] border-solid border-gray-200 leading-[1rem] uppercase">
          <div className="animate-pulse bg-gray-200 h-4 w-16"></div>
        </div>
        <div className="rounded-xl flex truncate flex-row items-center justify-center py-[0.5rem] px-[0.75rem] border-[1px] border-solid border-gray-200 leading-[1rem] uppercase">
          <div className="animate-pulse bg-gray-200 h-4 w-24"></div>
        </div>
        <div className="rounded-xl flex flex-row items-center justify-center py-[0.5rem] px-[0.75rem] border-[1px] border-solid border-gray-200 leading-[1rem] uppercase">
          <div className="animate-pulse bg-gray-200 h-4 w-28"></div>
        </div>
        <div />
      </div>
      <div className="w-full text-4xl lg:text-[12.2vw] tracking-[0.04em] lg:leading-[12.275rem] uppercase text-gray-200 text-left">
        <div className="animate-pulse bg-gray-200 h-16 w-3/4"></div>
      </div>
      <div className="grid grid-row-1 md:grid-cols-2 lg:gap-x-3 gap-y-4 md:gap-y-0 justify-items-center w-full">
        <div className="w-full flex flex-col items-start justify-start gap-y-4 text-left text-[0.75rem]">
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-start w-full gap-4">
              <div className="animate-pulse bg-gray-200 h-8 w-3/4"></div>
              <div className="animate-pulse bg-gray-200 h-4 w-1/2"></div>
              <div className="animate-pulse bg-gray-200 h-8 w-1/4"></div>
              <div className="animate-pulse bg-gray-200 h-24 w-full"></div>
            </div>
          </div>
          <div className="md:w-[24.313rem] w-full flex flex-col items-center justify-start gap-1 text-[0.875rem] text-gray-600">
            <div className="self-stretch flex flex-col items-center justify-start pt-[0rem] px-[0rem] pb-[1.25rem] gap-[0.5rem_0rem] w-full">
              <div className="self-stretch flex flex-row items-center justify-between py-[0rem] md:px-[0.375rem] text-[0.625rem]">
                <div className="animate-pulse bg-gray-200 h-4 w-24"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-4 rounded-full"></div>
              </div>
              <div className="animate-pulse bg-gray-200 h-64 w-full rounded-xl"></div>
            </div>
            <div className="animate-pulse bg-gray-200 h-32 w-full rounded-xl"></div>
          </div>
        </div>
        <div className="order-first md:order-last size-80 md:size-96 animate-pulse bg-gray-200"></div>
      </div>
    </main>
  );
}

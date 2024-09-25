import React from "react";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";

import * as Popover from "@radix-ui/react-popover";
import * as Accordion from "@radix-ui/react-accordion";
import { PopoverContent } from "@/components/ui/popover";

import { InfoCircledIcon, Cross1Icon, ChevronDownIcon } from "@radix-ui/react-icons";

// Function to fetch questions
const fetchQuestions = async () => {
  const response = await fetch("http://192.168.0.17:1337/api/questions");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function Attributespopver() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["questions"], // Use queryKey as an array
    queryFn: fetchQuestions, // Use queryFn for the fetch function
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching questions</div>;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="text-gray-300 p-2 self-end bg-gray-100 rounded-xl">
          <InfoCircledIcon className="size-5" />
        </button>
      </Popover.Trigger>
      <PopoverContent
        sideOffset={5}
        align="start"
        className="text-sm space-y-2 shadow-none border-none bg-black/60 text-gray-100 backdrop-blur-lg rounded-xl"
      >
        <div className="flex flex-row justify-between">
          <p className="sm text-gray-400">INFORMATIOM</p>
          <Popover.Close>
            <Cross1Icon className="size-5" />
          </Popover.Close>
        </div>
        <Popover.Root>
          <Accordion.Root
            type="single"
            collapsible
            className="gap-y-1 flex flex-col"
          >
            {data.data.map(
              (item: {
                id: number;
                attributes: { answer: string; itemname: string };
              }) => (
                <Accordion.Item key={item.id} value={`item-${item.id}`}>
                  <Accordion.Header>
                    <Accordion.Trigger className="uppercase grid grid-cols-[1fr_0.4fr] justify-between w-full text-left content-start">
                        <span>
                      {item.attributes.itemname}{" "}
                      </span>
                      <ChevronDownIcon
                        className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180 justify-self-end mr-1"
                        aria-hidden
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content side={top} className="text-xs leading-5 text-gray-100 py-1">
                    {item.attributes.answer}
                  </Accordion.Content>
                </Accordion.Item>
              )
            )}
          </Accordion.Root>
          {/* ... existing code ... */}
        </Popover.Root>
        <p className="text-gray-400 text-xs">
          Visit our <Link href="https://www.google.com">FAQ</Link> for more
          information.
        </p>
      </PopoverContent>
    </Popover.Root>
  );
}

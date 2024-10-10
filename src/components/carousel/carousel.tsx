import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import List_item from "./item";

import PropTypes from "prop-types";

import { useEdition } from "@/app/env/EditionProvider";
import { EditionArray } from "../mint/Editiondata";

const Edition_Carousel: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const EditionArray = useEdition(); // Access the context data

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (!EditionArray || EditionArray.length === 0)
    return <p>No editions available</p>;

  // Create a pagination element for each item.
  const pagination = EditionArray.map((_, i) => (
    <span
      key={i}
      className={`flex-1 rounded-[14px] h-[0.5rem] w-2 md:w-[1.5rem] cursor-pointer ${i === current ? "bg-blue-500" : "bg-gray-400"}`}
      onClick={() => api?.scrollTo(i)}
    ></span>
  ));

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={setApi}
      className="rounded-xl bg-gray-100/10 flex flex-col p-4 md:p-6 text-[1.25rem] text-gray-400 w-full"
    >
      <aside className="flex flex-row justify-between mb-2">
        <span className="tracking-[1.16px] uppercase text-sm md:text-base">
          RECENTLY MINTED
        </span>
        <span className="flex flex-row items-start justify-start gap-2 md:gap-3 justify-items-center">
          {pagination}
        </span>
      </aside>
      <CarouselContent className="justify-start p-[0.063rem] box-border">
        {/* Map over EditionArray to create List_item elements */}
        {EditionArray.map((edition, index) => (
          <List_item
            key={index}
            title={edition.name}
            artist={edition.artist}
            image={edition.image}
            attributes={edition.attributes}
            collection={edition.collection}
          />
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Edition_Carousel;

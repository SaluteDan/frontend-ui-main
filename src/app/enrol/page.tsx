"use client";

/*
 * Enrol page
 *
 * - Responsable for displaying the enrol page
 * - Fetching the most recent editions from the database
 * - Displaying membership tiers & membership benefits
 *
 */

import React from "react";
import type { NextPage } from "next";

import PropTypes from "prop-types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

import { BothTable, Tier1Table, Tier2Table } from "@/app/enrol/tables";
import Edition_Carousel from "@/components/carousel/carousel";
import RenderModal from "@/app/enrol/modal";
import { EditionProvider } from "@/app/env/EditionProvider";
// end of imports

const Enrol: NextPage = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const [openItem, setOpenItem] = React.useState<string | undefined>(undefined)

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const ModalProps = {
    title: "Confirmation",
    headline: "MINT TOKEN",
    subtitle: "subtitle",
    body: "body text",
    cta: "CTA",
    isModalOpen: isModalOpen, // Use the state variable here
    setIsModalOpen: setIsModalOpen, // Pass the state updater function
  };

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);

    api.on("select", () => {
      // Do something on select.
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Create pagination element for carousels.
  const paginationindicator = Array.from({ length: count }, (_, i) => (
    <span
      key={i}
      className={`flex-1 rounded-[14px] h-[0.5rem] w-[1.5rem] cursor-pointer ${i === current ? "bg-gray-600" : "bg-gray-400"}`}
      onClick={() => api?.scrollTo(i)}
    ></span>
  ));
  // Create a pagination element for each item.
  const pagination = Array.from({ length: count }, (_, i) => (
    <span
      key={i}
      className={`grow md:grow-0 rounded-xl hover:cursor-pointer flex flex-row items-center justify-center py-[0.5rem] px-[0.75rem] text-gray-200 ${i === current ? "bg-gray-800  text-gray-200" : "bg-gray-200  text-gray-600"}`}
      onClick={() => api?.scrollTo(i)}
    >
      STEP {i + 1}
    </span>
  ));

  return (
    <>
      <section className="w-full flex flex-col items-center justify-start pt-[0rem] pb-[2.5rem] box-border gap-[1.875rem_0rem] text-left text-[0.75rem] text-gray-600 px-4 lg:px-10">
        {/* <div className="self-stretch flex flex-row items-start justify-start">
          <div className="rounded-xl flex flex-row items-center justify-center py-[0.5rem] px-[0.75rem] border-[1px] border-solid tracking-[1px] leading-[1rem] uppercase border-gray-600">
            <span className="tracking-[1px] leading-[1rem] uppercase">
              MEMBERSHIP
            </span>
          </div>
        </div> */}
        <div className="text-3xl lg:text-[3.971rem] flex flex-col w-full text-gray-800 gap-4 md:gap-14">
          <div className="flex flex-row items-start justify-start">
            <h1 className="tracking-[1.51px] w-full uppercase leading-none">
              ASCEND TO INFLUENCE: <br /> EMPOWERMENT & GOVERNANCE AWAIT IN THE
              ATTRIBUTES MEMBERSHIP SYSTEM
            </h1>
          </div>
          <div className="flex flex-row items-end justify-start text-[1rem] text-gray-600">
            <div className="flex-1 flex flex-col items-end justify-start">
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-row items-start pt-[0rem] px-[0rem] gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-6 justify-between items-end gap-8 md:gap-10">
                    <p className="text-inherit leading-[1.25rem] text-xs md:text-base text-gray-600 col-span-1 md:col-span-2">
                      Attributes utilize a 2-tier token system. Each tier grants
                      its own benefits & rewards. Holders are able to stake,
                      propose, and vote on governance proposals. Deciding on
                      collaborations and gallery direction. The growth of the
                      gallery is in the hands of the members themselves.
                      <Button
                        className="bg-gray-100 hover:bg-gray-200 active:bg-gray-200 text-gray-600 rounded-xl text-xs space-x-2 uppercase p-2 md:py-2 px-3 flex-row gap-2 w-max mt-4 hidden md:flex"
                        onClick={() => setOpenItem(openItem === "item-1" ? undefined : "item-1")}
                      >
                        <ChevronDownIcon
                          className={`transition-all duration-300`}
                        />
                        TIER BENEFITS
                      </Button>
                    </p>

                    <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5 uppercase md:col-start-4">
                      <div className="rounded-3xl flex flex-col justify-start flex-auto p-[1.25rem] gap-[1rem] bg-gray-200">
                        <div className="flex flex-col justify-between px-[0rem] md:pb-[1.25rem] gap-4 items-start">
                          <p className=" tracking-[0.02em] leading-none">
                            TIER 1
                          </p>
                          <div className="text-3xl lg:text-[4.125rem] text-gray-800 leading-none">
                            25SOL
                          </div>
                        </div>
                        <p className="m-0 text-[0.75rem] tracking-[0.02em] leading-normal">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit.
                        </p>
                        <Button
                          className="self-stretch tracking-[0.12px] leading-[1rem] rounded-xl bg-gray-800 flex flex-row items-center justify-center py-[1.5rem] px-[2.5rem] text-center text-gray-100"
                          size="lg"
                          onClick={() => setIsModalOpen(true)}
                        >
                          TIER 1 MEMBER
                        </Button>
                        <Tier1Table />
                      </div>
                      <div className="rounded-3xl flex flex-col justify-start flex-auto p-[1.25rem] gap-[1rem] bg-gray-200">
                        <div className="flex flex-col justify-between px-[0rem] md:pb-[1.25rem] gap-4 items-start">
                          <p className=" tracking-[0.02em] leading-none">
                            TIER 2
                          </p>
                          <div className="text-3xl lg:text-[4.125rem] text-gray-800 leading-none">
                            10SOL
                          </div>
                        </div>
                        <p className="m-0 text-[0.75rem] tracking-[0.02em] leading-normal">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit.
                        </p>
                        <Button
                          className="self-stretch tracking-[0.12px] leading-[1rem] uppercase rounded-xl bg-gray-800 flex flex-row items-center justify-center py-[1.5rem] px-[2.5rem] text-center text-gray-100"
                          size="lg"
                          onClick={() => setIsModalOpen(true)}
                        >
                          TIER 2 MEMBER
                        </Button>
                        <Tier2Table />
                      </div>
                    </div>
                    <RenderModal ModalProps={ModalProps} />
                  </div>
                </div>
                <Accordion type="single" className="w-full" collapsible value={openItem}
      onValueChange={setOpenItem}>
                  <AccordionItem value="item-1">
                    <AccordionContent>
                      <BothTable />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full  bg-gray-800 flex flex-col justify-start lg:p-[2.5rem] p-4 py-10 box-border gap-[2.25rem_0rem] text-left text-[0.75rem] text-gray-100 ">
        {/* <section className="self-stretch flex flex-row items-start justify-start">
          <div className="rounded-[10px] flex flex-rowjustify-center py-[0.5rem] px-[0.75rem] border-[1px] border-solid border-gray-100">
            <span className="tracking-[1px] leading-[1rem] uppercase">
              THE GALLERY
            </span>
          </div>
        </section> */}
        <p className="text-3xl lg:text-[3.971rem] tracking-[2.46px] uppercase leading-none">
          ATTRIBUTES is A Customisable Web 3.0 GALLERY.
        </p>
        <section className="grid grid-cols-1 lg:grid-cols-9 text-[1.75rem] gap-8 md:gap-20">
          <div className="col-span-5 grid grid-cols-1 gap-4 md:gap-0">
            <h5 className="text-gray-100 tracking-[0.4px] uppercase text-lg md:text-3xl">
              We are laying the groundwork for web3 — the next generation of the
              internet full of limitless possibilities. In web3, your creativity
              is valued and your digital objects belong to you.
            </h5>
            <div className="flex md:flex-row flex-col gap-4 text-[0.75rem] text-gray-100 items-end">
              <h5 className="m-0 flex-1  text-inherit tracking-[0.4px] leading-[1.25rem]">
                We are laying the groundwork for web3 — the next generation of
                the internet full of limitless possibilities. In web3, your
                creativity is valued and your digital objects belong to you.
              </h5>
              <h5 className="m-0 flex-1 text-inherit tracking-[0.4px] leading-[1.25rem]">
                We are laying the groundwork for web3 — the next generation of
                the internet full of limitless possibilities. In web3, your
                creativity is valued and your digital objects belong to you.
              </h5>
            </div>
          </div>
          <div className="col-span-5 md:col-span-4 order-first md:order-last">
            <EditionProvider>
              <Edition_Carousel />
            </EditionProvider>
          </div>
        </section>
      </section>
      <section className="w-full flex flex-col items-start justify-start p-4 lg:p-[2.5rem] box-border text-left text-[0.75rem] text-gray-800 ">
        <div className="w-full">
          <div className="flex flex-row items-start justify-between pt-[0rem] px-[0rem] pb-[1.25rem] box-border">
            {/* <div className="rounded-xl border-gray-800 border-[1px] border-solid flex flex-row items-center justify-center py-[0.5rem] px-[0.75rem]">
              <div className="tracking-[1px] leading-[1rem] uppercase">
                how it works
              </div>
            </div> */}
            <div className="flex flex-row items-center justify-items-center gap-3">
              {paginationindicator}
            </div>
          </div>
          <Carousel setApi={setApi} className="">
            <CarouselContent>
              {/* Slide 1 */}
              <section className="flex-1 shrink-0 basis-full ml-4 pr-4 h-fit">
                <div className="text-3xl lg:text-[3.971rem] uppercase leading-none">
                  From Random to Refined:The Future of NFT Marketplaces is
                  Curation
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-start-2 text-6xl lg:text-[38.373rem] uppercase text-right">
                    1
                  </div>
                  <div className="col-span-1 col-start-1 grid items-end content-end gap-4">
                    <p className="text-xl lg:text-[1.75rem] tracking-[0.02em] uppercase">
                      It is as easy as connecting your wallet, thus creating
                      your profile in the community.
                    </p>
                    <p className="text-[0.875rem] tracking-[0.02em] leading-5">
                      It is as easy as connecting your wallet, thus creating
                      your profile in the community.
                    </p>
                    <button className="[border:none] rounded-xl flex flex-row box-border justify-center bg-gray-200 hover:bg-gray-400 px-20 py-5 w-full">
                      <div className="text-[0.875rem] tracking-[1px]">
                        CONNECT WALLET
                      </div>
                    </button>
                  </div>
                </div>
              </section>
              {/* Slide 2 */}
              <section className="flex-1 shrink-0 basis-full ml-8 pl-4 h-fit">
                <div className="text-3xl lg:text-[3.971rem] uppercase leading-none">
                  From Random to Refined:The Future of NFT Marketplaces is
                  Curation
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-start-2 text-6xl lg:text-[38.373rem] uppercase text-right">
                    1
                  </div>
                  <div className="col-span-1 col-start-1 grid items-end content-end gap-4">
                    <p className="text-xl lg:text-[1.75rem] tracking-[0.02em] uppercase">
                      It is as easy as connecting your wallet, thus creating
                      your profile in the community.
                    </p>
                    <p className="text-[0.875rem] tracking-[0.02em] leading-5">
                      It is as easy as connecting your wallet, thus creating
                      your profile in the community.
                    </p>
                    <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5 uppercase md:col-start-4">
                      <div className="rounded-3xl flex flex-col justify-start flex-auto p-[1.25rem] gap-[1rem] bg-gray-200">
                        <div className="flex flex-col justify-between px-[0rem] md:pb-[1.25rem] gap-4 items-start">
                          <p className=" tracking-[0.02em] leading-none">
                            TIER 1
                          </p>
                          <div className="text-xl lg:text-[4.125rem] text-gray-800 leading-none">
                            25ETH
                          </div>
                        </div>
                        <p className="m-0 text-[0.75rem] tracking-[0.02em] leading-normal">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit.
                        </p>
                        <Button
                          className="self-stretch tracking-[0.12px] leading-[1rem] rounded-xl bg-gray-800 flex flex-row items-center justify-center py-[1.5rem] px-[2.5rem] text-center text-gray-100"
                          size="lg"
                        >
                          TIER 1 MEMBER
                        </Button>
                      </div>
                      <div className="rounded-3xl flex flex-col justify-start flex-auto p-[1.25rem] gap-[1rem] bg-gray-200">
                        <div className="flex flex-col justify-between px-[0rem] md:pb-[1.25rem] gap-4 items-start">
                          <p className=" tracking-[0.02em] leading-none">
                            TIER 2
                          </p>
                          <div className="text-xl lg:text-[4.125rem] text-gray-800 leading-none">
                            10ETH
                          </div>
                        </div>
                        <p className="m-0 text-[0.75rem] tracking-[0.02em] leading-normal">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit.
                        </p>
                        <Button
                          className="self-stretch tracking-[0.12px] leading-[1rem] uppercase rounded-xl bg-gray-800 flex flex-row items-center justify-center py-[1.5rem] px-[2.5rem] text-center text-gray-100"
                          size="lg"
                        >
                          TIER 2 MEMBER
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Slide 3 */}
              <section className="flex-1 shrink-0 basis-full ml-4 pl-4 h-fit">
                <div className="text-3xl lg:text-[3.971rem] uppercase leading-none">
                  From Random to Refined:The Future of NFT Marketplaces is
                  Curation
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-start-2 text-6xl lg:text-[38.373rem] uppercase text-right">
                    1
                  </div>
                  <div className="col-span-1 col-start-1 grid items-end content-end gap-4">
                    <p className="text-xl lg:text-[1.75rem] tracking-[0.02em] uppercase">
                      It is as easy as connecting your wallet, thus creating
                      your profile in the community.
                    </p>
                    <p className="text-[0.875rem] tracking-[0.02em] leading-5">
                      It is as easy as connecting your wallet, thus creating
                      your profile in the community.
                    </p>
                    <button className="[border:none] rounded-xl flex flex-row box-border justify-center bg-gray-200 hover:bg-gray-400 px-20 py-5 w-full">
                      <div className="text-[0.875rem] tracking-[1px]">
                        CONNECT WALLET
                      </div>
                    </button>
                  </div>
                </div>
              </section>
            </CarouselContent>
          </Carousel>
          <div className="flex flex-row items-end justify-start pt-[1.25rem] px-[0rem] box-border gap-3 text-blackalpha-600">
            {pagination}
          </div>
        </div>
      </section>
    </>
  );
};

Edition_Carousel.propTypes = {
  editionData: PropTypes.array,
};

export default Enrol;

"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";

import { getOptioncount } from "@/components/helpers/collection/collection";

const AttributesAccordion = ({
  attributes,
  onStakeChange,
  selectedOptions: initialSelectedOptions,
  resetStakeValues, // Add this prop
}: {
  attributes: any;
  onStakeChange: any;
  selectedOptions: any;
  resetStakeValues: boolean; // Add this prop type
}) => {
  const [stakeValues, setStakeValues] = useState<Record<string, number>>({});
  const [localSelectedOptions, setLocalSelectedOptions] = useState(
    initialSelectedOptions
  );
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    setLocalSelectedOptions(initialSelectedOptions);
  }, [initialSelectedOptions]);

  useEffect(() => {
    // Initialize stake values with 0
    const initialStakeValues = Object.keys(attributes).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});
    setStakeValues(initialStakeValues);
  }, [attributes]);

  useEffect(() => {
    if (resetStakeValues) {
      const initialStakeValues = Object.keys(attributes).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {});
      setStakeValues(initialStakeValues);
      updateParent(initialStakeValues, localSelectedOptions);
    }
  }, [resetStakeValues]);

  const handleOptionClick = (attributeKey: string, optionKey: string) => {
    setOpenAccordion(attributeKey);
    if (api) {
      const optionIndex = Object.keys(attributes[attributeKey].options).indexOf(
        optionKey
      );
      api.scrollTo(optionIndex);
    }
  };

  // handles staking an option
  const handleStake = (
    e: React.MouseEvent,
    attributeKey: string,
    optionKey: string
  ) => {
    e.preventDefault(); // Prevent form submission
    const newSelectedOptions = {
      ...localSelectedOptions,
      [attributeKey]: optionKey,
    };
    setLocalSelectedOptions(newSelectedOptions);

    const newStakeValues = {
      ...stakeValues,
      [attributeKey]: attributes[attributeKey].cost,
    };

    // Reset all other options in the same attribute to 0
    Object.keys(attributes[attributeKey].options).forEach((key) => {
      if (key !== optionKey) {
        newStakeValues[`${attributeKey}-${key}`] = 0;
      }
    });

    setStakeValues(newStakeValues);
    updateParent(newStakeValues, newSelectedOptions);
  };

  // handles increasing the stake of an option
  const handleIncrease = (e: React.MouseEvent, attributeKey: string) => {
    e.preventDefault(); // Prevent form submission
    const cost = attributes[attributeKey].cost || 0;
    setStakeValues((prev) => {
      const newValue = Math.max((prev[attributeKey] || 0) + cost, cost);
      const newStakeValues = { ...prev, [attributeKey]: newValue };
      updateParent(newStakeValues, localSelectedOptions);
      return newStakeValues;
    });
  };

  // handles decreasing the stake of an option
  const handleDecrease = (e: React.MouseEvent, attributeKey: string) => {
    e.preventDefault(); // Prevent form submission
    const cost = attributes[attributeKey].cost || 0;
    setStakeValues((prev) => {
      const currentValue = prev[attributeKey] || 0;
      const newValue = Math.max(currentValue - cost, 0);
      const newStakeValues = { ...prev, [attributeKey]: newValue };
      updateParent(newStakeValues, localSelectedOptions);
      return newStakeValues;
    });
  };

  const updateParent = (newStakeValues, newSelectedOptions) => {
    const newTotalStake = Object.values(newStakeValues).reduce(
      (sum, value) => sum + value,
      0
    );
    const newStakedAttributeCount = Object.values(newStakeValues).filter(
      (value) => value > attributes[Object.keys(newStakeValues)[0]].cost
    ).length;
    onStakeChange(
      newTotalStake,
      newStakedAttributeCount,
      newStakeValues,
      newSelectedOptions
    );
  };

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-y-2"
        value={openAccordion}
        onValueChange={setOpenAccordion}
      >
        {Object.entries(attributes).map(
          ([attributeKey, attributeValue]: [string, any]) => (
            <AccordionItem
              key={attributeKey}
              value={attributeKey}
              data-attribute-key={attributeKey}
              className="rounded-xl bg-gray-100 flex flex-col px-4 box-border gap-0 hover:bg-gray-200 hover:no-underline"
            >
              <AccordionTrigger className="w-full flex items-center justify-between py-3">
                <div className="flex flex-row w-full justify-between items-center">
                    <span className="leading-[1rem] uppercase text-left">
                      {attributeValue.name}
                    </span>
                  <div className="flex flex-row items-center justify-center gap-x-4">
                    <span
                      className="text-xs leading-[1rem] uppercase text-gray-400 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        const selectedOption =
                          localSelectedOptions[attributeKey] ||
                          attributes[attributeKey].selected;
                        handleOptionClick(attributeKey, selectedOption);
                      }}
                    >
                      {localSelectedOptions[attributeKey]
                        ? attributes[attributeKey].options[
                            localSelectedOptions[attributeKey]
                          ].name
                        : attributes[attributeKey].options[
                            attributes[attributeKey].selected
                          ].name}
                    </span>
                    <div className="rounded-xl flex flex-row items-center justify-center py-[0.45rem] px-[0.75rem] border-[1px] border-solid border-gray-300 text-gray-400 leading-[1rem] uppercase text-xs">
                      {stakeValues[attributeKey] > 0
                        ? `COST: ${stakeValues[attributeKey]}`
                        : `${getOptioncount(attributeValue.options)} Options`}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col items-start justify-start gap-2 pb-3">
                <Carousel opts={{ loop: true }} setApi={setApi}>
                  <CarouselContent>
                    {Object.entries(attributeValue.options).map(
                      ([optionKey, optionValue]: [string, any]) => {
                        const key = `${attributeKey}-${optionKey}`;
                        const isStaked =
                          stakeValues[attributeKey] > 0 &&
                          localSelectedOptions[attributeKey] === optionKey;

                        return (
                          <CarouselItem
                            className="text-center grid grid-cols-2 gap-20"
                            key={optionKey}
                          >
                            <div className="flex flex-row justify-between items-center">
                              <CarouselPrevious variant="ghost" size="icon" />
                              {optionValue.name}
                              <CarouselNext variant="ghost" size="icon" />
                            </div>
                            <div className="flex flex-col items-end">
                              {!isStaked && (
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleStake(e, attributeKey, optionKey)
                                  }
                                  className="uppercase bg-gray-800 text-white rounded-xl hover:bg-gray-600 w-auto px-10 py-2"
                                >
                                  Stake
                                </button>
                              )}
                              {isStaked && (
                                <div className="stake-controls flex flex-row items-center justify-center gap-x-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={(e) =>
                                      handleDecrease(e, attributeKey)
                                    }
                                  >
                                    <MinusIcon className="h-4 w-4" />
                                  </Button>
                                  <Input
                                    type="number"
                                    className="text-center px-0"
                                    value={stakeValues[attributeKey]}
                                    readOnly
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    type="button"
                                    onClick={(e) =>
                                      handleIncrease(e, attributeKey)
                                    }
                                  >
                                    <PlusIcon className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </CarouselItem>
                        );
                      }
                    )}
                  </CarouselContent>
                </Carousel>
                <div className="py-1 text-left text-xs text-muted-foreground">
                  Option {current} of {count}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        )}
      </Accordion>
    </>
  );
};

export default AttributesAccordion;

"use client";

import { NextPage } from "next";
import React from "react";

// Import UI Compnents
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const Subscribe: NextPage = () => {
  return (
    <AlertDialogContent className="*:text-left gap-0 pt-2 pb-4 px-4 md:p-[1.725rem] border-none data-[state=open]:animate-contentShow backdrop-blur-xl fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white/10 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none text-white">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-sm flex flex-row justify-between items-center">
          ENROLMENT
          <AlertDialogCancel className="bg-transparent border-none p-2 py-0 m-0 focus:border-none">
            <Cross1Icon className="cursor-pointer text-gray-100 size-4 md:size-5" />
          </AlertDialogCancel>
        </AlertDialogTitle>
        <AlertDialogDescription className="text-gray-100">
          <div className="space-y-2 flex flex-col">
            <h1 className="text-3xl">EAGER TO COLLECT AND LEARN MORE</h1>
            <p className="text-xs md:text-sm leading-5">
              Leave your details below to subscribe.
            </p>
          </div>
          <div className="my-1 gap-y-4 flex flex-col *:space-y-2 items-start *:w-full *:flex *:flex-row *:items-center *:gap-2 *:border-solid *:border-b-[1px] *:border-gray-600">
            <span className="has-[:active]:border-gray-100 has-[:focus]:border-gray-100">
              <Label htmlFor="subscribe-name" className="text-gray-400">
                NAME:
              </Label>
              <Input
                id="subscribe-name"
                className="pb-3 px-0 rounded-none placeholder:text-gray-300 focus-visible:border-gray-100 text-left shadow-none group/name"
                placeholder="John Doe"
              />
            </span>
            <span className="has-[:active]:border-gray-100 has-[:focus]:border-gray-100">
              <Label htmlFor="subscribe-email" className="text-gray-400">
                EMAIL:
              </Label>
              <Input
                id="subscribe-email"
                className="pb-3 px-0 rounded-none placeholder:text-gray-300 focus-visible:border-gray-100 text-left shadow-none"
                placeholder="Email@Example.com"
              />
            </span>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div className="w-full flex flex-col">
          <div className="grid-cols-[0.05fr,_1fr] grid items-top gap-3 py-4">
            <Checkbox id="terms1" className="col-span-1 border-white" />
            <Label className="text-gray-100 text-xs leading-4 col-span-1">
              I accept the terms and conditions
            </Label>
            <span className="w-full text-gray-300 text-xs leading-4 col-span-2">
              Attribute's Gallery only uses your e-mail address is only used to
              send you our newsletter and information about the activities of
              Attributes Gallery.
            </span>
          </div>

          <AlertDialogAction className="text-base bg-transparent hover:text-gray-100 py-6 w-full bg-white text-gray-800">
            <p>SUBSCRIBE</p>
          </AlertDialogAction>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default Subscribe;

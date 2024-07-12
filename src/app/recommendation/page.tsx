"use client";

import { Button } from "@/components/ui/button";
import Lottie from "react-lottie-player";
import va from "../../../public/lottie/va.json";
import Image from "next/image";

export default function Recommendation() {
  return (
    <div className="bg-bw-light min-h-screen p-6 flex flex-col font-sans">
      {/* title */}
      <div className="text-bw-darkest/50 mb-8">
        You&apos;re gonna be a talented
      </div>
      <h1>Virtual Assistant</h1>
      {/* salary */}
      <div>Rp 50.000- 80.000/hr</div>
      <div className="flex-grow-[2]" />
      {/* image */}
      <div className="flex items-center justify-center">
        <Lottie
          loop
          animationData={va}
          play
          style={{ width: 360, height: 360 }}
        />
      </div>
      <div className="flex-grow" />
      {/* skill */}
      <div className="flex mb-8">
        <div className="text-yellow-main w-24 pr-4 border-r-2 border-bw-darker">
          <p className="text-2xl font-serif">56%</p>
          <p className="font-sans">s k i l l</p>
          <p className="font-sans tracking-wider">match</p>
        </div>
        {/* badges */}
        <div className="flex gap-4 max-w-full overflow-x-scroll pl-4">
          <Image
            src="/badges/comm.png"
            alt="internet"
            className="object-contain"
            width={76}
            height={72}
          />
          <Image
            src="/badges/internet.png"
            alt="internet"
            className="object-contain"
            width={76}
            height={72}
          />
          <Image
            src="/badges/word.png"
            alt="internet"
            className="object-contain"
            width={76}
            height={72}
          />
          <Image
            src="/badges/excel-before.png"
            alt="internet"
            className="object-contain"
            width={76}
            height={72}
          />
          <Image
            src="/badges/writing-before.png"
            alt="internet"
            className="object-contain"
            width={76}
            height={72}
          />
        </div>
      </div>
      {/* <div className="flex-grow" /> */}
      {/* button */}
      <Button className="w-full">Start Learning!</Button>
      <div className="flex w-full items-center gap-4 py-8">
        <div className="h-0.5 bg-bw-darker flex-grow" />
        <p className="font-sans text-bw-darkest/80">or</p>
        <div className="h-0.5 bg-bw-darker flex-grow" />
      </div>
      <Button className="w-full" variant="secondary">
        Browse other jobs
      </Button>
    </div>
  );
}

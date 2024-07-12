"use client";

import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Lottie from "react-lottie-player";
import va from "/lottie/va.json";

export default function Recommendation() {
  return (
    <>
      {/* title */}
      <div>You&apos;re gonna be so good at being a</div>
      <div className="text-3xl">Virtual Assistant</div>
      <DotLottieReact src="/lottie/test.lottie" loop autoplay />
      {/* salary */}
      <div>Rp 50.000- 80.000/hr</div>
      {/* image */}
      <div></div>
      {/* button */}
      <Button>Start Learning!</Button>
    </>
  );
}

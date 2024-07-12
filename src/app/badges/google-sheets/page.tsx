"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BadgeGoogleSheet() {
  const router = useRouter();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  return (
    <div className="bg-bw-light h-screen w-full">
      <div
        className={`absolute bg-bw-main rounded-full size-96 top-32 -right-48 transition-all duration-300 
        `}
      ></div>
      <div
        className={`absolute bg-bw-darker rounded-full size-64 bottom-36 -left-32 transition-all duration-300 `}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: "100vh" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ y: "-100vh" }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.8,
        }}
        className="flex flex-col items-center p-6  min-h-screen justify-between text-bw-darkest overflow-clip z-10"
      >
        <Confetti width={width} height={height} />
        <div className="flex flex-col items-center">
          <Navbar empty />
          <h1>Well done!</h1>
          <p>You have completed the spreadsheets course.</p>
        </div>
        <Image
          src="/badges/excel.png"
          alt="internet"
          className="object-contain"
          width={240}
          height={240}
        />
        <Button
          onClick={() => {
            router.push("/skills/google-sheets");
          }}
          className="w-full"
        >
          Continue learning
        </Button>
      </motion.div>
    </div>
  );
}

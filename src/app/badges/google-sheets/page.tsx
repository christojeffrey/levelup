"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

export default function BadgeGoogleSheet() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: "-100vh" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }}
      className="flex flex-col items-center p-6 bg-bw-light min-h-screen justify-between text-bw-darkest overflow-clip"
    >
      <div
        className={`absolute bg-bw-main rounded-full size-96 top-32 -right-48 transition-all duration-300 -z-10
        `}
      ></div>
      <div
        className={`absolute bg-bw-darker rounded-full size-64 bottom-36 -left-32 transition-all duration-300 -z-10`}
      ></div>
      <Confetti />
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
  );
}

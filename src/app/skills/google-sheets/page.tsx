"use client";
import Graph from "@/app/_components/graph";
import { useState } from "react";

let json: any = {
  nodes: [
    { id: "Basic Questions", link: "/skills/google-sheets/1" },
    { id: "Readings", link: "/skills/google-sheets/2" },
    { id: "Case Study", source: "/fire.gif", link: "/skills/google-sheets/3" },
    { id: "Comic", link: "/skills/google-sheets/4" },
    { id: "Readings2", link: "/skills/google-sheets/5" },
  ],
  links: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 1, target: 3 },
    { source: 2, target: 4 },
  ],
};

import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
export default function JobSkills({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col h-screen min-h-full bg-bw-light">
      <Navbar back={false} />
      <div className="flex-1">
        <Graph json={json} />
      </div>
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
  );
}

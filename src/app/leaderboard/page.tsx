"use client";

import { RevealList, RevealWrapper } from "next-reveal";

const information = [
  { name: "testing", score: 100 },
  { name: "testing2", score: 90 },
  { name: "testing3", score: 80 },
  { name: "testing4", score: 50 },
  { name: "testing4", score: 50 },
  { name: "testing5", score: 50 },
  { name: "testing5", score: 50 },
];

export default function Leaderboard() {
  return (
    <>
      <RevealWrapper className="load-hidden text-xl">Leaderboard</RevealWrapper>
      <RevealList interval={60} delay={500} className="">
        {information.map((info, index) => (
          <div key={index} className="load-hidden flex justify-between bg-green-100 rounded-xl p-8 mb-2">
            <div className="flex gap-4">
              <div>{index + 1}</div>
              <div>{info.name}</div>
            </div>
            <div>{info.score}</div>
          </div>
        ))}
      </RevealList>
    </>
  );
}

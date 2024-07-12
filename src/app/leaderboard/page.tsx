"use client";
import { useState } from "react";

const ranks = [
  { name: "John Doe", score: 100 },
  { name: "Jane Doe", score: 90 },
  { name: "John Smith", score: 80 },
  { name: "Jane Smith", score: 70 },
  { name: "John Johnson", score: 60 },
  { name: "Jane Johnson", score: 50 },
  { name: "John Williams", score: 40 },
  { name: "Jane Williams", score: 30 },
  { name: "John Brown", score: 20 },
  { name: "Jane Brown", score: 10 },
];

export default function Leaderboard() {
  const [currentRank, setCurrentRank] = useState(3);
  return (
    <main className="m-2 min-h-full">
        <nav>&lt;</nav>
      <h1 className="text-bold">Leaderboard</h1>
      <section className="flex flex-1 justify-center">
        <ul className="flex flex-col gap-3 justify-center">
          {ranks.map((rank, index) => {
            let scale = 100;
            let className = "";
            if (index === currentRank) {
              scale = 125;
              className = "bg-[#3C7A6F] scale-" + scale;
            } else if (index - 1 === currentRank || index + 1 === currentRank ) {
              scale = 110;
              className = "bg-[#52988D] scale-" + scale;
            } else if (index - 2 === currentRank || index + 2 === currentRank ) {
              scale = 105;
              className = "bg-[#76BFA1] scale-" + scale;
            }
            return (
              <li
                key={index}
                className={`${className} border-2 text-center`}
              >
                {rank.name} - {rank.score}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

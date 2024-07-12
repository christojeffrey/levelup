"use client";
import { useSearchParams } from "next/navigation";
import { RevealList, RevealWrapper } from "next-reveal";
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
  const [currentRank, setCurrentRank] = useState(0);
  const queryParams = useSearchParams();

  const add = queryParams.get("add");
  const redirect = queryParams.get("redirect");

  return (
    <main className="my-2 mx-4">
      <RevealWrapper>
        <a className="text-bold" href={`/`}>
          &lt;
        </a>
        <div>
          <h1 className="text-bold text-2xl mx-2 my-2">Leaderboard</h1>
          <div className="mx-2 flex flex-row align-middle gap-3 my-2">
            <div className="rounded-full w-8 h-8 bg-[#00DBCE]"></div>
            <span className="my-auto">Diamond Tier</span>
          </div>
        </div>
      </RevealWrapper>
      <RevealList  interval={60} delay={500}>
        <section className="flex flex-1 justify-center mt-3">
          <ul className="flex flex-col gap-3 justify-center w-4/5">
            {ranks.map((rank, index) => {
              let className = "";
              if (index === currentRank) {
                className = `bg-[#3C7A6F] scale-[1.15]`;
              } else if (
                index - 1 === currentRank ||
                index + 1 === currentRank
              ) {
                className = `bg-[#52988D] scale-[1.10]`;
              } else if (
                index - 2 === currentRank ||
                index + 2 === currentRank
              ) {
                className = `bg-[#76BFA1] scale-[1.05]`;
              }
              return (
                <li
                  key={index}
                  className={`flex rounded-2xl px-4 py-3 flex-row align-middle justify-between ${
                    className === "" ? "bg-[#E6E4D7]" : className
                  }`}
                >
                  <span className="flex flex-row align-middle">
                    <span className="my-auto mr-2">{index + 1}</span>
                    <img
                      src="/profile.webp"
                      width={32}
                      height={32}
                      className="rounded-full mr-1"
                    ></img>
                    <span className="my-auto">{rank.name}</span>
                  </span>
                  <span className="my-auto">{rank.score}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </RevealList>
    </main>
  );
}

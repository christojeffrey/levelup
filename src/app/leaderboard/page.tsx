"use client";
import { RevealList, RevealWrapper } from "next-reveal";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";

let ranksDefault = [
  { name: "John Doe", score: 100 },
  { name: "John Smith", score: 80 },
  { name: "John Johnson", score: 60 },
  { name: "John Williams", score: 40 },
  { name: "John Brown", score: 20 },
];

export default function Leaderboard() {
  const router = useRouter();
  const [currentRank, setCurrentRank] = useState(0);
  const queryParams = useSearchParams();
  const [ranks, setRanks] = useState(ranksDefault);

  const add = queryParams.get("add");
  const redirect = queryParams.get("redirect");

  useEffect(() => {
    // reorder
    let myScore = parseInt(localStorage.getItem("score")) || 0;
    if (add) {
      myScore += parseInt(add);
    }

    localStorage.setItem("score", myScore.toString());

    // reoder
    let newRanks = [...ranks, { name: "You", score: myScore }];
    newRanks.sort((a, b) => b.score - a.score);
    setRanks(newRanks);
  }, []);

  return (
    <main className="flex flex-col h-screen bg-bw-light overflow-auto">
      <Navbar />
      <RevealWrapper className="p-6">
        <div className="flex justify-between">
          <h1 className="text-bold text-2xl mx-2 my-2">Leaderboard</h1>
          <div className="flex items-center gap-3 my-2">
            <div className="rounded-full w-8 h-8 bg-blue-light"></div>
            <span className="">Diamond Tier</span>
          </div>
        </div>
      </RevealWrapper>
      <div className="flex-grow">
        <section className="flex flex-1 justify-center mt-3">
          <div className="flex flex-col gap-3 justify-center w-4/5">
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
                <RevealWrapper
                  delay={index * 100}
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
                </RevealWrapper>
              );
            })}
          </div>
        </section>
      </div>
      {/* if has redirect, add continue button */}
      {redirect && (
        <div className="p-6 sticky bottom-0">
          <Button
            className="w-full mt-4"
            onClick={() => {
              // check if localstorage done-list is completed. if yes, direct to /badges/google-sheets
              let previousDoneList =
                JSON.parse(localStorage.getItem("done-list")) || [];
              const completedDoneList = [
                "Readings",
                "Video",
                "Case Study",
                "Comic",
                "Basic Questions",
              ];
              // if previous done list as same as completed done list, then redirect to /badges/google-sheets
              let isCompleted = true;
              completedDoneList.forEach((item) => {
                if (!previousDoneList.includes(item)) {
                  isCompleted = false;
                }
              });
              if (isCompleted) {
                router.push("/badges/google-sheets");
              } else {
                router.push(redirect);
              }
            }}
          >
            Continue
          </Button>
        </div>
      )}
    </main>
  );
}

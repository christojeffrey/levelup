"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnswerOption } from "../1/page";
import { RevealList, RevealWrapper } from "next-reveal";
import { Navbar } from "@/components/ui/navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
// reading
export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [isFinishReading, setIsFinishReading] = useState(false);

  if (isFinishReading) {
    return <QuestionPart />;
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <RevealWrapper className="load-hidden">
        {/* IIFE */}
        {(function () {
          if (page === 1) {
            return <FirstPage />;
          }
          if (page === 2) {
            return <SecondPage />;
          }
          // check understanding
          return <QuestionPart />;
        })()}
      </RevealWrapper>

      <div className="flex justify-center gap-8 p-2 mt-12 sticky bottom-6">
        <Button
          onClick={() => {
            setPage(page - 1);
          }}
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

function FirstPage() {
  return (
    <>
      <Navbar />
      <RevealWrapper className="load-hidden">
        <h1 className="p-6">
          The Art of Communication: Mastering the Key to Success
        </h1>
        <div className="px-6 text-xl leading-loose">
          Communication. It&apos;s a word thrown around often, but its true
          importance can&apos;t be overstated. Effective communication is the
          cornerstone of strong relationships, successful careers, and a
          fulfilling life. Whether you&apos;re explaining a complex idea to a
          colleague, negotiating a deal with a client, or simply catching up
          with a friend, clear and confident communication is essential for
          getting your point across and achieving your goals. The good news?
          Communication is a skill, and like any skill, it can be learned and
          improved. This article equips you with the tools and resources to
          become a more effective communicator in any situation.
        </div>
      </RevealWrapper>
    </>
  );
}
function SecondPage() {
  return (
    <RevealWrapper className="load-hidden">
      <h2 className="px-6 py-2">
        Unlocking the Secrets of Effective Communication: Building a Strong
        Foundation
      </h2>
      <div className="px-6 py-2 text-xl">
        Our journey starts with understanding the core elements of effective
        communication. Here are some key aspects to focus on:
      </div>
    </RevealWrapper>
  );
}

function QuestionPart() {
  const router = useRouter();
  function handleDone() {
    console.log("done");
    let previousDoneLists = JSON.parse(localStorage.getItem("done-list")) || [];
    previousDoneLists.push("Readings");
    localStorage.setItem("done-list", JSON.stringify(previousDoneLists));

    router.push("/leaderboard?add=200&redirect=/skills/google-sheets");
  }

  return (
    <>
      <div className="load-hidden p-2 flex flex-col h-screen justify-between">
        <RevealWrapper>
          <div className=" text-slate-600">
            Question: Importance of Communication
          </div>
          <h1 className="">
            Why is effective communication important according to the passage?
          </h1>
        </RevealWrapper>
        {/* <RevealWrapper>
                <Image src="/sheets.png" width={400} height={400} alt="photo" />
              </RevealWrapper> */}
        {/* grid 2x2 */}
        <RevealList
          interval={60}
          delay={300}
          className="grid grid-cols-2 gap-4 mb-24"
        >
          <div className="h-full w-full load-hidden">
            <AnswerOption>
              It is necessary only for professional success.
            </AnswerOption>
          </div>
          <div className="h-full w-full load-hidden">
            <AnswerOption onClick={handleDone}>
              It helps in explaining complex ideas and negotiating deals.
            </AnswerOption>
          </div>
          <div className="h-full w-full load-hidden">
            <AnswerOption>It cannot be learned or improved.</AnswerOption>
          </div>
          <div className="h-full w-full load-hidden">
            <AnswerOption>
              It is important only in personal relationships.
            </AnswerOption>
          </div>
        </RevealList>
      </div>
    </>
  );
}

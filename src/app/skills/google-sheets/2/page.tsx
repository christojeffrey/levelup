"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnswerOption } from "../1/page";
// reading
export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [isFinishReading, setIsFinishReading] = useState(false);

  if (isFinishReading) {
    return <QuestionPart />;
  }

  function handleDone() {
    console.log("done");
    let previousDoneLists = JSON.parse(localStorage.getItem("done-list")) || [];
    previousDoneLists.push("Readings");
    localStorage.setItem("done-list", JSON.stringify(previousDoneLists));

    router.push("/leaderboard?add=200&redirect=/skills/google-sheets");
  }
  return (
    <div className="flex flex-col h-screen justify-between">
      <div>
        <div className="flex justify-start p-2">
          <div className="text-3xl">Reading</div>
        </div>
        {/* IIFE */}
        {(function () {
          if (page === 1) {
            return <FirstPage />;
          }
          if (page === 2) {
            return <SecondPage />;
          }
          // check understanding
          return (
            <>
              <div className="p-2">
                <div>Question... 1 ?</div>
                {/* grid 2x2 */}
                <div className="grid grid-cols-2 gap-4">
                  <AnswerOption>a</AnswerOption>
                  <AnswerOption onClick={handleDone}>b</AnswerOption>
                  <AnswerOption>c</AnswerOption>
                  <AnswerOption>d</AnswerOption>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      <div className="flex justify-center gap-4 p-2">
        <Button
          onClick={() => {
            setPage(page - 1);
          }}
        >{`<`}</Button>
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
        >{`>`}</Button>
      </div>
    </div>
  );
}

function FirstPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">The Art of Communication: Mastering the Key to Success</h1>
      <div className="text-xl">
        Communication. It's a word thrown around often, but its true importance can't be overstated. Effective communication is the cornerstone of strong relationships, successful careers, and a fulfilling life. Whether you're explaining a
        complex idea to a colleague, negotiating a deal with a client, or simply catching up with a friend, clear and confident communication is essential for getting your point across and achieving your goals. The good news? Communication
        is a skill, and like any skill, it can be learned and improved. This article equips you with the tools and resources to become a more effective communicator in any situation.
      </div>
    </div>
  );
}
function SecondPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Unlocking the Secrets of Effective Communication:</h2>
      <h3 className="text-xl font-bold">Building a Strong Foundation</h3>
      <div>Our journey starts with understanding the core elements of effective communication. Here are some key aspects to focus on:</div>
    </div>
  );
}

function QuestionPart() {
  const router = useRouter();
  return (
    <>
      test your understnding
      <div>question ...?</div>
      <div>
        <div>a</div>
        <div
          onClick={() => {
            router.push("/leaderboard?add=200&redirect=/skills/google-sheets");
          }}
        >
          b
        </div>
        <div>c</div>
        <div>d</div>
      </div>
    </>
  );
}

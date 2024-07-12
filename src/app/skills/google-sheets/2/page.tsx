"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
// reading
export default function Page() {
  const [page, setPage] = useState(1);
  const [isFinishReading, setIsFinishReading] = useState(false);

  if (isFinishReading) {
    return <QuestionPart />;
  }
  return (
    <div>
      <div className="flex">
        <div>Reading</div>
        <Button
          onClick={() => {
            setIsFinishReading(true);
          }}
        >
          Finish Reading
        </Button>
      </div>
      {/* IIFE */}
      {(function () {
        if (page === 1) {
          return <FirstPage />;
        }
        if (page === 2) {
          return <SecondPage />;
        }
        return <></>;
      })()}
      <div className="flex just ify-center gap-4">
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
      <div>
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
        <div onClick={() => {router.push("/leaderboard?add=200&redirect=/")}}>b</div>
        <div>c</div>
        <div>d</div>
      </div>
    </>
  );
}

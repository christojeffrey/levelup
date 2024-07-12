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

  function handleDone() {
    let previousDoneLists = JSON.parse(localStorage.getItem("done-list")) || [];
    previousDoneLists.push("Video");
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
    <div className="mx-auto ">
      {/* youtube iframe https://www.youtube.com/watch?v=GCnQ9nvfLvY */}
      <iframe
        className="p-2"
        width="410"
        height="226"
        src="https://www.youtube.com/embed/GCnQ9nvfLvY"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="text-xl p-2 mt-6">
        {/* a bit of prompt */}
        watch this video and answer the question next to test your understanding!
      </div>
    </div>
  );
}

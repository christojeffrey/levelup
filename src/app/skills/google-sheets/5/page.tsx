"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnswerOption } from "../1/page";
import { Navbar } from "@/components/ui/navbar";
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
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col p-6">
        <div className="flex justify-start">
          <h1 className="text-3xl mb-8">Add add-ons in Google Sheets</h1>
        </div>
        {/* IIFE */}
        {(function () {
          if (page === 1) {
            return <FirstPage />;
          }

          // check understanding
          return (
            <>
              <div className="">
                <div>If you want to add an add-ons in Google Sheets, how do you do it?</div>
                {/* grid 2x2 */}
                <div className="grid grid-cols-2 gap-4">
                  <AnswerOption>You can not add add-ons</AnswerOption>
                  <AnswerOption onClick={handleDone}>Go to the add-ons tab and choose the add-ons we need</AnswerOption>
                  <AnswerOption>Upload a file with an add-on installed</AnswerOption>
                  <AnswerOption>Go to settings and download the file</AnswerOption>
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
        className="rounded-2xl"
        width="410"
        height="226"
        src="https://www.youtube.com/embed/GCnQ9nvfLvY"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="text-xl mt-8">
        {/* a bit of prompt */}
        Watch this video and answer the question next to test your
        understanding!
      </div>
    </div>
  );
}

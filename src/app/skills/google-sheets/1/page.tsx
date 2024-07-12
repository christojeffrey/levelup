"use client";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
// basic question
export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  function handleRightAnswer() {
    if (page === 3) {
      console.log("done");
      // add done list to local storage
      // get the prevoius
      const doneList = JSON.parse(localStorage.getItem("done-list")) || [];
      doneList.push("Basic Questions");
      localStorage.setItem("done-list", JSON.stringify(doneList));
      router.push("/leaderboard?add=200&redirect=/skills/google-sheets");
      return;
    }
    setPage(page + 1);
  }

  return (
    <div>
      {(function () {
        if (page === 1) {
          return <QuestionOne onDone={handleRightAnswer} />;
        }
        if (page === 2) {
          return <QuestionTwo onDone={handleRightAnswer} />;
        }
        if (page === 3) {
          return <QuestionThree onDone={handleRightAnswer} />;
        }
        return <></>;
      })()}
      a question
      <Progress value={((page - 1) * 100) / 3} />
    </div>
  );
}

function QuestionOne({ onDone }) {
  return (
    <>
      <div>Question...?</div>
      <div>
        <div>a</div>
        <div onClick={onDone}>b</div>
        <div>c</div>
        <div>d</div>
      </div>
    </>
  );
}

function QuestionTwo({ onDone }) {
  return (
    <>
      <div>Question...?</div>
      <div>
        <div>a</div>
        <div onClick={onDone}>b</div>
        <div>c</div>
        <div>d</div>
      </div>
    </>
  );
}

function QuestionThree({ onDone }) {
  return (
    <>
      <div>Question...?</div>
      <div>
        <div>a</div>
        <div onClick={onDone}>b</div>
        <div>c</div>
        <div>d</div>
      </div>
    </>
  );
}

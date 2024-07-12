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
    <div className="h-screen flex flex-col justify-between">
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
      <Progress value={((page - 1) * 100) / 3} />
    </div>
  );
}

function QuestionOne({ onDone }) {
  return (
    <div className="p-2">
      <div>Question... 1 ?</div>
      {/* grid 2x2 */}
      <div className="grid grid-cols-2 gap-4">
        <AnswerOption>a</AnswerOption>
        <AnswerOption onClick={onDone}>b</AnswerOption>
        <AnswerOption>c</AnswerOption>
        <AnswerOption>d</AnswerOption>
      </div>
    </div>
  );
}
export function AnswerOption({ children, onClick = () => {} }) {
  return (
    <div onClick={onClick} className="hover:border-green-500 border-2 border-black rounded-xl bg-slate-100 p-4">
      {children}
    </div>
  );
}

function QuestionTwo({ onDone }) {
  return (
    <>
      <div className="p-2">
        <div>Question 2..?</div>
        {/* grid 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          <AnswerOption>a</AnswerOption>
          <AnswerOption onClick={onDone}>b</AnswerOption>
          <AnswerOption>c</AnswerOption>
          <AnswerOption>d</AnswerOption>
        </div>
      </div>
    </>
  );
}

function QuestionThree({ onDone }) {
  return (
    <div className="p-2">
      <div>Question 3...?</div>
      {/* grid 2x2 */}
      <div className="grid grid-cols-2 gap-4">
        <AnswerOption>a</AnswerOption>
        <AnswerOption onClick={onDone}>b</AnswerOption>
        <AnswerOption>c</AnswerOption>
        <AnswerOption>d</AnswerOption>
      </div>
    </div>
  );
}

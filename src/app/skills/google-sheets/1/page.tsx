// basic questions
"use client";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RevealList, RevealWrapper } from "next-reveal";
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
    <div className="load-hidden p-2 flex flex-col h-screen justify-between">
      <RevealWrapper>
        <div className=" text-slate-600">Question 1: Basic Data Entry</div>
        <h1 className="">How do you enter data into a cell in a spreadsheet?</h1>
      </RevealWrapper>
      <RevealWrapper>
        <Image src="/sheets.png" width={400} height={400} alt="photo" />
      </RevealWrapper>
      {/* grid 2x2 */}
      <RevealList interval={60} delay={300} className="grid grid-cols-2 gap-4 mb-24">
        <div className="h-full w-full load-hidden">
          <AnswerOption>Right-click on the cell and select "Insert Data"</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption onClick={onDone}>Click on the cell and start typing</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption>Press "Ctrl + D"</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption>Double-click on the cell and then type</AnswerOption>
        </div>
      </RevealList>
    </div>
  );
}
export function AnswerOption({ children, onClick = () => {} }) {
  return (
    <div onClick={onClick} className="h-full w-full hover:border-green-500 border-2 border-black rounded-xl p-4">
      {children}
    </div>
  );
}

function QuestionTwo({ onDone }) {
  return (
    <div className="load-hidden p-2 flex flex-col h-screen justify-between">
      <RevealWrapper>
        <div className=" text-slate-600">Question 2: Cell Referencing</div>
        <h1 className="">What is the difference between relative and absolute cell references?</h1>
      </RevealWrapper>
      <RevealWrapper>
        <Image src="/sheets.png" width={400} height={400} alt="photo" />
      </RevealWrapper>
      {/* grid 2x2 */}
      <RevealList interval={60} delay={300} className="grid grid-cols-2 gap-4 mb-24">
        <div className="h-full w-full load-hidden">
          <AnswerOption onClick={onDone}>Relative references change when copied; absolute references do not</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption>Absolute references change when copied; relative references do not</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption>Both references remain constant when copied</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption>Relative references are used only in rows, absolute references only in columns</AnswerOption>
        </div>
      </RevealList>
    </div>
  );
}

function QuestionThree({ onDone }) {
  return (
    <div className="load-hidden p-2 flex flex-col h-screen justify-between">
      <RevealWrapper>
        <div className=" text-slate-600">Question 3: Basic Formulas</div>
        <h1 className="">How do you create a formula to add the values of cells A1 and B1?</h1>
      </RevealWrapper>
      <RevealWrapper>
        <Image src="/sheets.png" width={400} height={400} alt="photo" />
      </RevealWrapper>
      {/* grid 2x2 */}
      <RevealList interval={60} delay={300} className="grid grid-cols-2 gap-4 mb-24">
        <div className="h-full w-full load-hidden">
          <AnswerOption>=ADD(A1, B1)</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption>=SUM(A1, B1)</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption onClick={onDone}>=A1 + B1</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption>=A1 & B1</AnswerOption>
        </div>
      </RevealList>
    </div>
  );
}

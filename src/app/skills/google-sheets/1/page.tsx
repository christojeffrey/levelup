// basic questions
"use client";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RevealList, RevealWrapper } from "next-reveal";
import { Navbar } from "@/components/ui/navbar";
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

function Question({ header, question, image, options, onDone }) {
  return (
    <div className="load-hidden flex flex-col h-screen">
      <RevealWrapper>
        <Navbar />
      </RevealWrapper>
      <RevealWrapper className="p-6">
        <div className=" text-bw-darkest/50 mb-2 font-bold">{header}</div>
        <h1 className="">{question}</h1>
      </RevealWrapper>
      <RevealWrapper className="p-6 rounded-2xl">
        <Image src={image} width={400} height={400} alt="photo" />
      </RevealWrapper>
      {/* grid 2x2 */}
      <RevealList
        interval={60}
        delay={300}
        className="grid grid-cols-2 gap-4 p-6"
      >
        <div className="h-full w-full load-hidden">
          <AnswerOption>{options[0]}</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption onClick={onDone}>{options[1]}</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption>{options[2]}</AnswerOption>
        </div>
        <div className="h-full w-full load-hidden">
          <AnswerOption>{options[3]}</AnswerOption>
        </div>
      </RevealList>
    </div>
  );
}

function QuestionOne({ onDone }) {
  return (
    <Question
      header="Question 1: Basic Data Entry"
      question="How do you enter data into a cell in a spreadsheet?"
      image="/sheets.png"
      options={[
        "Right-click on the cell and select 'Insert Data'",
        "Click on the cell and start typing",
        "Press 'Ctrl + D'",
        "Double-click on the cell and then type",
      ]}
      onDone={onDone}
    />
  );
}
export function AnswerOption({ children, onClick = () => {} }) {
  return (
    <div
      onClick={onClick}
      className="h-full w-full hover:border-green-main border-2 border-bw-darkest/20 bg-bw-main rounded-2xl p-4"
    >
      {children}
    </div>
  );
}

function QuestionTwo({ onDone }) {
  return (
    <Question
      header="Question 2: Cell Referencing"
      question="What is the difference between relative and absolute cell references?"
      image="/sheets.png"
      options={[
        "Relative references change when copied; absolute references do not",
        "Absolute references change when copied; relative references do not",
        "Both references remain constant when copied",
        "Relative references are used only in rows, absolute references only in columns",
      ]}
      onDone={onDone}
    />
  );
}

function QuestionThree({ onDone }) {
  return (
    <Question
      header="Question 3: Basic Formulas"
      question="How do you create a formula to add the values of cells A1 and B1?"
      image="/sheets.png"
      options={["=ADD(A1, B1)", "=SUM(A1, B1)", "=A1 + B1", "=A1 & B1"]}
      onDone={onDone}
    />
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const onBoardingQuestions = [
  {
    type: "this-that",
    details: {
      question: "Where do you prefer to work?",
    },
    component: ThisOrThat,
  },
  { type: "input", details: { question: "What's your current salary?" }, component: Input },
];
export default function OnBoarding() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = onBoardingQuestions[questionIndex];

  return (
    <main className="min-h-screen max-w-xl mx-auto">
      <question.component
        onDone={() => {
          setQuestionIndex(questionIndex + 1);
        }}
        details={question.details}
      />
      <Progress value={(questionIndex * 100) / onBoardingQuestions.length} />
    </main>
  );
}

function ThisOrThat({ onDone, details }) {
  return (
    <div>
      This or that
      <Button onClick={onDone}>Done</Button>
    </div>
  );
}

function Input({ onDone, details }) {
  return (
    <div>
      Input
      <Button onClick={onDone}>Done</Button>
    </div>
  );
}

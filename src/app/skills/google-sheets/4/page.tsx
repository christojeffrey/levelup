"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { use, useState } from "react";

const story = [
  {
    imageSrc: "/comic-1.png",
    description:
      "You are a virtual assistant working for a small business owner, Sarah, who runs an online retail store. Sarah trusts you with various tasks, including managing her inventory, handling customer inquiries, and keeping track of financial records.",
  },
  {
    imageSrc: "/comic-2.png",
    description:
      "You are a virtual assistant working for a small business owner, Sarah, who runs an online retail store. Sarah trusts you with various tasks, including managing her inventory, handling customer inquiries, and keeping track of financial records.",
  },
  {
    imageSrc: "/comic-3.png",
    description:
      "You are a virtual assistant working for a small business owner, Sarah, who runs an online retail store. Sarah trusts you with various tasks, including managing her inventory, handling customer inquiries, and keeping track of financial records.",
  },
  {
    imageSrc: "/comic-4.png",
    description:
      "You are a virtual assistant working for a small business owner, Sarah, who runs an online retail store. Sarah trusts you with various tasks, including managing her inventory, handling customer inquiries, and keeping track of financial records.",
  },
];

const answerOptions = [
  {
    text: "You correct the miscategorized expense and inform Sarah about the mistake, providing her with the accurate financial report.",
    outcome:
      " This demonstrates your honesty and commitment to providing accurate information, even if it means additional work and potentially disappointing your boss with the initial error discovery.",
  },
  {
    text: "You decide to leave the expense as it is, thinking it might be better to present a more favorable report to the investor.",
    outcome:
      "This choice compromises your integrity as it involves knowingly presenting inaccurate information, which could lead to serious consequences if discovered later.",
  },
];

function StoryRenderer({ currentStory, onNext }) {
  return (
    <div className="flex flex-col flex-1 relative">
      <div className="absolute w-full h-full justify-center">
        {story.map((_, index) => (
          <>
            <Image
              src={story[currentStory].imageSrc}
              width={400}
              height={300}
              alt="Comic Illustration"
              className={`transition transform ease-in duration-500 ${
                currentStory === index ? "translate-x-0" : " -translate-x-full"
              } self-center`}
            />
            <p className="animate-in">{story[currentStory].description}</p>
          </>
        ))}
        <Button className="self-end" onClick={onNext}>
          Next &gt;
        </Button>
        <Progress value={((currentStory + 1) / story.length) * 100}></Progress>
      </div>
    </div>
  );
}

export default function Page() {
  const [currentStory, setCurrentStory] = useState(0);
  const [comicSection, setComicSection] = useState(true);
  const [answerSection, setAnswerSection] = useState(false);
  const [answer, setAnswer] = useState(0);
  const [outcomeSection, setOutcomeSection] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <nav className="text-[#24222F]/[0.5] p-3 text-bold text-sm">
        <span className="text-xl">&lt;</span> Create financial report
      </nav>
      <h1 className="text-2xl">Make a decision</h1>
      {comicSection && (
        <section className="flex flex-1 flex-col">
          <StoryRenderer
            currentStory={currentStory}
            onNext={() => {
              if (currentStory === 3) {
                setComicSection(false);
                setAnswerSection(true);
              } else {
                setCurrentStory((prev) => prev + 1);
              }
            }}
          />
        </section>
      )}
      {answerSection && (
        <section className="flex flex-grow flex-col justify-center">
          <h2 className="text-lg text-center">What will you do?</h2>
          <div className="flex flex-row">
            {answerOptions.map((option, index) => (
              <button
                key={index}
                className="border rounded-lg p-2 m-2"
                onClick={() => {
                  setAnswerSection(false);
                  setOutcomeSection(true);
                  setAnswer(index);
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
        </section>
      )}
      {outcomeSection && (
        <section className="flex flex-1 flex-col justify-center">
          <h2 className="text-lg text-center">Integrity Outcome</h2>
          <p>
            {answerOptions[answer].outcome}
          </p>
        </section>
      )}
    </div>
  );
}

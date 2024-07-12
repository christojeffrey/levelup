"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const story = [
  {
    imageSrc: "/comic-1.png",
    description:
      "You are a virtual assistant working for a small business owner, Sarah, who runs an online retail store. Sarah trusts you with various tasks, including managing her inventory, handling customer inquiries, and keeping track of financial records.",
  },
  {
    imageSrc: "/comic-2.png",
    description: "One day, Sarah asks you to prepare a financial report for a potential investor. She provides you with all the necessary data, including sales figures, expenses, and profit margins.",
  },
  {
    imageSrc: "/comic-3.png",
    description:
      "While compiling the report, you notice that a significant expense from a recent marketing campaign was mistakenly categorized under personal costs in your previous work, which significantly increases the apparent profitability of the business.",
  },
  {
    imageSrc: "/comic-4.png",
    description:
      "You realize that correcting this error will show a less favorable financial position, which could negatively influence the investor's decision. However, if you don't correct it, Sarah might not notice your mistake, and the report will show a more positive financial situation",
    answerOptions: [
      {
        text: "You correct the miscategorized expense and inform Sarah about the mistake, providing her with the accurate financial report.",
        outcome: " This demonstrates your honesty and commitment to providing accurate information, even if it means additional work and potentially disappointing your boss with the initial error discovery.",
      },
      {
        text: "You decide to leave the expense as it is, thinking it might be better to present a more favorable report to the investor.",
        outcome: "This choice compromises your integrity as it involves knowingly presenting inaccurate information, which could lead to serious consequences if discovered later.",
      },
    ],
  },
];

const answerOptions = [
  {
    text: "You correct the miscategorized expense and inform Sarah about the mistake, providing her with the accurate financial report.",
    outcome: " This demonstrates your honesty and commitment to providing accurate information, even if it means additional work and potentially disappointing your boss with the initial error discovery.",
  },
  {
    text: "You decide to leave the expense as it is, thinking it might be better to present a more favorable report to the investor.",
    outcome: "This choice compromises your integrity as it involves knowingly presenting inaccurate information, which could lead to serious consequences if discovered later.",
  },
];

function StoryRenderer({ currentStory, onNext, setAnswer, answer }) {
  return (
    <div className="flex flex-col w-full h-full">
      <AnimatePresence>
        <motion.div
          key={story[currentStory].imageSrc}
          initial={{ x: 300, opacity: 0, position: "absolute" }}
          animate={{ x: 0, opacity: 1, position: "relative" }}
          exit={{ x: -300, opacity: 0, position: "absolute" }}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 0.5,
          }}
        >
          <Image src={story[currentStory].imageSrc} alt="Comic Illustration" width={400} height={300} className="rounded-2xl object-cover my-4" />
          <p className={`${story[currentStory].answerOptions ? "mb-4" : "min-h-60"} font-sans`}>{story[currentStory].description}</p>
        </motion.div>
        {story[currentStory].answerOptions && (
          <motion.div
            key="answer"
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0, position: "absolute" }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.5,
            }}
          >
            <h2 className="text-lg text-center font-sans font-bold">What will you do?</h2>
            <div className="flex flex-col gap-2 mt-2 mb-2">
              {answerOptions.map((option, index) => (
                <button
                  key={index}
                  className={`${answer === index ? "border-green-main" : "border-bw-darker"} border-2 rounded-2xl px-4 py-2 text-left`}
                  onClick={() => {
                    setAnswer(index);
                  }}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button className="self-end" onClick={onNext}>
        Next &gt;
      </Button>
      {/* <Progress value={((currentStory + 1) / story.length) * 100}></Progress> */}
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [currentStory, setCurrentStory] = useState(0);
  const [comicSection, setComicSection] = useState(true);
  const [answer, setAnswer] = useState(null);
  const [outcomeSection, setOutcomeSection] = useState(false);

  return (
    <div className="flex flex-col h-full bg-bw-light">
      <nav className="text-[#24222F]/[0.5] p-3 text-bold text-sm">
        <span className="text-xl">&lt;</span> Create financial report
      </nav>
      <div className="p-6">
        {comicSection && (
          <>
            <h1 className="text-2xl">Make a decision</h1>
            <section className="flex flex-1 flex-col">
              <StoryRenderer
                currentStory={currentStory}
                onNext={() => {
                  if (currentStory === 3) {
                    setComicSection(false);
                    setOutcomeSection(true);
                  } else {
                    setCurrentStory((prev) => prev + 1);
                  }
                }}
                setAnswer={setAnswer}
                answer={answer}
              />
            </section>
          </>
        )}
        {/* {answerSection && (
          <section className="flex flex-grow flex-col justify-center">
            <Image src={story[3].imageSrc} alt="Comic Illustration" width={400} height={300} className="rounded-2xl object-cover my-4" />
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
        )} */}
        {outcomeSection && (
          <section className="flex flex-1 flex-col justify-center">
            <h1 className="text-2xl text-center">Well done!</h1>
            <div className="w-full flex items-center justify-center my-12">
              <Image src="/badges/integrity-check.png" alt="a sparkly vibrant orange badge with a big check mark" className="object-contain" width={160} height={160} />
            </div>
            <p className="font-sans">{answerOptions[answer].outcome}</p>
            <Button
            onClick={()=>{
              let previousDoneLists = JSON.parse(localStorage.getItem("done-list")) || [];
              previousDoneLists.push("Comic");
              localStorage.setItem("done-list", JSON.stringify(previousDoneLists));
              router.push("/leaderboard?add=200&redirect=/skills/google-sheets");
            }}
            >Okay!</Button>
          </section>
        )}
      </div>
    </div>
  );
}

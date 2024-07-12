"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import { getAnswer } from "./actions";
import { RotateCw } from "lucide-react";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Page() {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [generation, setGeneration] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <main className="m-6 h-full">
      <h1>Case Study</h1>
      <div className="flex h-full flex-col-reverse">
        {/* <div className="flex">a</div> */}
        {generation !== "" && (
          <div className="flex flex-col w-full">
            <hr className="border-2 w-full my-2 border-[#24222F]/[0.14] "></hr>
            <h2>Feedback</h2>
            <p>{generation}</p>
          </div>
        )}
        <div className="flex flex-1 justify-between flex-col py-2">
          <div>
            <p className="mt-3 text-justify">
              You are tasked by your supervisor to create a simple report on
              today's sales. This is the table and data you're provided with.
            </p>
            <table className="w-full mt-3">
              <thead>
                <tr className="text-bold">
                  <th>A</th>
                  <th>B</th>
                  <th>C</th>
                </tr>
                <tr className="text-bold">
                  <th>No.</th>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>1</td>
                  <td>Apple</td>
                  <td>Rp15600,00</td>
                </tr>
                <tr className="text-center">
                  <td>2</td>
                  <td>Orange</td>
                  <td>Rp12000,00</td>
                </tr>
                <tr className="text-center">
                  <td>3</td>
                  <td>Banana</td>
                  <td>Rp8700,00</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-justify">
              Given the table above, how do you calculate the total sales for
              today?
            </p>
          </div>
          <div>
            <textarea
              placeholder="Enter your answer"
              className="resize-none p-4 block bg-inherit border-2 border-[#24222F]/[0.14] rounded-2xl w-full h-[160px] m-auto"
            />
            <Button
              className="w-full mt-3"
              onClick={async () => {
                const prompt = `Act like you are a google sheet teacher. You have given your student a case study to calculate the total sales for today. The case study is this, "You are tasked by your supervisor to create a simple report on today\'s sales. This is the table and data you\'re provided with. <table className="w-full mt-3">
              <thead>
                <tr className="text-bold">
                  <th>A</th>
                  <th>B</th>
                  <th>C</th>
                </tr>
                <tr className="text-bold">
                  <th>No.</th>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>1</td>
                  <td>Apple</td>
                  <td>Rp15600,00</td>
                </tr>
                <tr className="text-center">
                  <td>2</td>
                  <td>Orange</td>
                  <td>Rp12000,00</td>
                </tr>
                <tr className="text-center">
                  <td>3</td>
                  <td>Banana</td>
                  <td>Rp8700,00</td>
                </tr>
              </tbody>
            </table>
             Given the table above, how do you calculate the total sales for today?" The student has answered with "${userAnswer}". Please provide feedback on the student's answer.`;
                setLoading(true);
                const { text } = await getAnswer(prompt);
                setGeneration(text);
                setLoading(false);
              }}
            >
              {loading && (
                <RotateCw size={16} className="animate-spin h-5 w-5 mr-3" />
              )}
              Submit Answer
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

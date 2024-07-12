"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const idTrackMap: { [key: string]: string } = {
  va: "Virtual Assistant Track",
  cs: "Customer Service Track",
};

const virtualAssistanSkills = [
  {
    skillName: "Spreadsheets",
    description: "Learn to do spreadsheets in different software.",
    paths: [
      "Google Sheets",
      "Microsoft Excel",
      "LibreOffice Calc",
      "Apple Numbers",
    ],
  },
  {
    skillName: "Email",
    description: "Learn to send and organize emails",
    paths: ["Gmail", "Microsoft Outlook", "Apple Mail", "Thunderbird"],
  },
  {
    skillName: "Calendar",
    description: "Learn to organize schedules and events",
    paths: [
      "Google Calendar",
      "Microsoft Outlook Calendar",
      "Apple Calendar",
      "Thunderbird Calendar",
    ],
  },
  {
    skillName: "Word Processing",
    description: "Learn to use word processing software.",
    paths: [
      "Google Docs",
      "Microsoft Word",
      "LibreOffice Writer",
      "Apple Pages",
    ],
  },
];

export default function JobSkills({ params }: { params: { id: string } }) {
  const [skillTreeIndex, setSkillTreeIndex] = useState(0);
  let chosenJob = virtualAssistanSkills;
  return (
    <main className="m-2 min-h-full">
      <p className="text-bold">{idTrackMap[params.id]}</p>
      <h1 className="text-lg text-bold">{chosenJob[skillTreeIndex].skillName}</h1>
      <p>{chosenJob[skillTreeIndex].description}</p>
      <section className="flex flex-1 justify-center">
        <ul>
          {chosenJob[skillTreeIndex].paths.map((path, index) => (
            <li key={index}>{path}</li>
          ))}
        </ul>
      </section>
      <div className="absolute bottom-0 border-t-2 flex flex-row justify-between w-full overflow-scroll gap-2">
        {chosenJob.map((skill, index) => (
          <button
            key={index}
            className={`border-2 rounded-full min-h-9 min-w-9 ${
              index === skillTreeIndex && "bg-orange-900"
            }`}
            onClick={() => setSkillTreeIndex(index)}
          >
            <span className="m-auto">{index}</span>
          </button>
        ))}
      </div>
      <h1></h1>
    </main>
  );
}

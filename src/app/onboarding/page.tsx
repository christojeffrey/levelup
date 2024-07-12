"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Combobox from "@/components/ui/combobox";
import { useRouter } from "next/navigation";
import { RevealWrapper } from "next-reveal";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "react-lottie-player";
import domestic from "../../../public/lottie/cleaning-lady.json";
import plumber from "../../../public/lottie/plumber.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

const onBoardingQuestions = [
  {
    details: {
      question: "What's your current job title?",
      options: [
        { value: "developer", label: "Developer" },
        { value: "designer", label: "Designer" },
        { value: "manager", label: "Manager" },
      ],
    },
    component: CurrentJob,
  },
  { details: { question: "What's your current salary?" }, component: Input },
  {
    details: {
      question: "Where do you prefer to work?",
    },
    component: ThisOrThat,
  },
];
export default function OnBoarding() {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = onBoardingQuestions[questionIndex];

  const [isLoading, setIsLoading] = useState(false);

  // if (isLoading) {
  //   return (
  //     <AnimatePresence>

  //     </AnimatePresence>
  //   );
  // }
  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: "-100vh" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.5,
            }}
            className="load-hidden h-screen bg-bw-light flex flex-col justify-center items-center"
          >
            <div className="loader-dot"></div>
            <div className="text-bw-darkest">
              Finding the best occupation suited for you...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="min-h-screen mx-auto flex flex-col justify-between bg-bw-light">
        <AnimatePresence>
          <motion.div
            key={questionIndex}
            initial={{ x: "100%", opacity: 0, position: "absolute" }}
            animate={{ x: 0, opacity: 1, position: "relative" }}
            exit={{ x: "-100%", opacity: 0, position: "absolute" }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.5,
            }}
            className=""
          >
            <question.component
              onDone={() => {
                if (questionIndex === onBoardingQuestions.length - 1) {
                  setIsLoading(true);
                  setTimeout(() => {
                    // redirect to /recomendatation
                    router.push("/recommendation");
                  }, 3000);
                  return;
                }
                setQuestionIndex(questionIndex + 1);
              }}
              onPrev={() => setQuestionIndex(questionIndex - 1)}
            />
          </motion.div>
        </AnimatePresence>
        <Progress value={(questionIndex * 100) / onBoardingQuestions.length} />
      </div>
    </>
  );
}

function ThisOrThat({ onPrev, onDone }) {
  const [selected, setSelected] = useState("");
  function handleClick() {
    console.log("clicked");
    setSelected("indoor");
  }
  return (
    <div className="relative flex-1 h-screen flex flex-col justify-between overflow-clip px-6 py-6">
      <div
        className={`absolute bg-bw-main rounded-full size-96 top-56 -right-48 transition-all duration-300
        `}
      ></div>
      <div
        className={`absolute bg-bw-darker rounded-full size-64 bottom-24 -left-32 transition-all duration-300`}
      ></div>
      <div className="flex flex-col gap-2">
        <h6 className="font-bold text-bw-darkest/50">Interests</h6>
        <h1 className="">Where would you prefer to work?</h1>
      </div>
      <div className="flex justify-between h-full gap-6 mt-24">
        <div
          className="bg-bw-light rounded-xl relative w-1/2 p-4 h-60 flex flex-col justify-center items-center border-bw-darkest/50 border-2 cursor-pointer"
          onClick={() => setSelected("indoor")}
          style={{ borderColor: selected === "indoor" ? "#3C7A6F" : "" }}
        >
          <Sofa className="" />
          <div className="absolute bottom-4 text-xl font-bold">Indoor</div>
        </div>
        <div
          className=" bg-bw-light rounded-xl relative w-1/2 p-4 h-60 flex flex-col justify-center items-center border-bw-darkest/50 border-2 cursor-pointer"
          onClick={() => setSelected("outdoor")}
          style={{ borderColor: selected === "outdoor" ? "#3C7A6F" : "" }}
        >
          <Tree className="" />
          <div className="absolute bottom-4 text-xl font-bold">Outdoor</div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <Button variant="secondary" onClick={onPrev}>
          <ChevronLeft className="mr-2 -ml-3" />
          <p>Back</p>
        </Button>
        <Button onClick={onDone}>
          <p>Next</p> <ChevronRight className="-mr-3 ml-2" />
        </Button>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

const salaries = [
  {
    value: "Less than 1 million",
    label: "Less than 1 million",
  },
  {
    value: "1 million - 2 million",
    label: "1 million - 2 million",
  },
  {
    value: "More than 2 million",
    label: "More than 2 million",
  },
];

function Input({ onPrev, onDone }) {
  const [value, setValue] = useState("");
  function handleChange(value) {
    setValue(value);
  }
  return (
    <div className="relative flex-1 black flex flex-col justify-between overflow-clip">
      <div
        className={`absolute bg-bw-main rounded-full size-48 top-56 -right-12 transition-all duration-300
        `}
      ></div>
      <div
        className={`absolute bg-bw-darker rounded-full size-96 bottom-36 -left-32 transition-all duration-300`}
      ></div>
      <div className="p-6 h-screen flex flex-col z-10">
        <div className="flex flex-col gap-2">
          <h6 className="font-bold text-bw-darkest/50">Current situation</h6>
          <h1 className="">How much is your salary expectation?</h1>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center gap-24">
          <div className="w-full">
            <h6 className="font-bold mb-4">Current salary</h6>
            <div>
              <Combobox details={salaries} onChange={handleChange} />
            </div>
          </div>
          <div className="w-full">
            <h6 className="font-bold mb-4">Desired salary</h6>
            <div className="flex-grow flex items-center justify-center">
              <Combobox details={salaries} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <Button variant="secondary" onClick={onPrev}>
            <ChevronLeft className="mr-2 -ml-3" />
            <p>Back</p>
          </Button>
          <Button onClick={onDone}>
            <p>Next</p> <ChevronRight className="-mr-3 ml-2" />
          </Button>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
const jobs = [
  {
    value: "Domestic Worker",
    label: "Domestic Worker",
  },
  {
    value: "Online Taxi Driver",
    label: "Online Taxi Driver",
  },
  {
    value: "Courier Driver",
    label: "Courier Driver",
  },
  {
    value: "Factory Worker",
    label: "Factory Worker",
  },
  {
    value: "Plumber",
    label: "Plumber",
  },
  {
    value: "Other",
    label: "Other",
  },
];
function CurrentJob({ onDone }) {
  const [value, setValue] = useState(jobs[0].label);
  const [color1, setColor1] = useState("#00000");
  const [color2, setColor2] = useState("#00000");
  const [lottie, setLottie] = useState(domestic);

  useEffect(() => {
    // change color based on value
    if (value === "Domestic Worker") {
      setColor1("#3C7A6F");
      setColor2("#52988D");
      setLottie(domestic);
    } else if (value === "Online Taxi Driver") {
      setColor1("#DF7C21");
      setColor2("#F69834");
    } else if (value === "Courier Driver") {
      setColor1("#784663");
      setColor2("#A75669");
    } else if (value === "Factory Worker") {
      setColor1("#CB4427");
      setColor2("#EC5E36");
    } else if (value === "Plumber") {
      setColor1("#36416E");
      setColor2("#3D5A92");
      setLottie(plumber);
    } else {
      setColor1("#CECBB8");
      setColor2("#E6E4D7");
    }
  }, [value]);

  return (
    <div className="relative flex-1 h-[calc(100vh-10px)] max-h-screen black flex flex-col justify-between overflow-clip">
      <div
        className={`absolute rounded-full size-96 top-56 -right-48 transition-all duration-300
        `}
        style={{ backgroundColor: color1 }}
      ></div>
      <div
        className={`absolute rounded-full size-64 bottom-24 -left-32 transition-all duration-300`}
        style={{ backgroundColor: color2 }}
      ></div>
      <div className="relative z-10 p-6 flex flex-col">
        <div className="flex flex-col gap-2">
          <h6 className="font-bold text-bw-darkest/50">Current situation</h6>
          <h1 className="">What&apos;s your current occupation?</h1>
        </div>
        <div className="mt-24">
          <AnimatePresence>
            <motion.div
              key={value}
              initial={{ x: 300, opacity: 0, position: "absolute" }}
              animate={{ x: 0, opacity: 1, position: "relative" }}
              exit={{ x: -300, opacity: 0, position: "absolute" }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 0.5,
              }}
              className="-ml-8"
            >
              <Lottie
                loop
                animationData={lottie}
                play
                style={{ width: 420, height: 420 }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="w-full z-10 p-6 flex flex-col items-end gap-6">
        <Combobox
          details={jobs}
          onChange={(value) => {
            setValue(value);
          }}
          defaultValue={value}
        />
        <div className="">
          <Button onClick={onDone}>
            <p>Next</p> <ChevronRight className="-mr-3 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Tree({ className }) {
  return (
    <>
      <svg
        width="94"
        height="99"
        viewBox="0 0 94 99"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M83.1969 21.8013C83.1969 33.3341 73.8476 42.6833 62.3144 42.6833H27.5857C16.0529 42.6833 6.70366 33.3341 6.70366 21.8013V20.8821C6.70366 9.34929 16.0529 7.62939e-06 27.5857 7.62939e-06H62.3144C73.8476 7.62939e-06 83.1969 9.34929 83.1969 20.8821V21.8013Z"
          fill="#3C7A6F"
        />
        <path
          d="M42.0906 42.6833H27.5857C16.0529 42.6833 6.70366 33.3341 6.70366 21.8013V20.8821C6.70366 9.34929 16.0529 7.62939e-06 27.5857 7.62939e-06H44.588V31.5201H42.5014L42.0906 42.6833Z"
          fill="#2C5A58"
        />
        <path
          d="M40.2821 59.7881C40.2821 65.8616 35.3587 70.7854 29.2851 70.7854H10.9973C4.92375 70.7854 0 65.8616 0 59.7881V59.3044C0 53.2304 4.92375 48.3074 10.9973 48.3074H29.2851C35.3587 48.3074 40.2821 53.2304 40.2821 59.3044V59.7881Z"
          fill="#52988D"
        />
        <path
          d="M19.9625 70.7854H10.9973C4.92375 70.7854 0 65.8616 0 59.7881V59.3044C0 53.2304 4.92375 48.3074 10.9973 48.3074H19.9625V59.4232L19.2733 58.9638L17.9602 60.7853L19.9625 62.3447V70.7854Z"
          fill="#3C7A6F"
        />
        <path
          d="M94.0001 48.5777C94.0001 55.3735 88.4914 60.8826 81.6952 60.8826H61.2321C54.4367 60.8826 48.9264 55.3735 48.9264 48.5777V48.0359C48.9264 41.2405 54.4367 35.7315 61.2321 35.7315H81.6952C88.4914 35.7315 94.0001 41.2405 94.0001 48.0359V48.5777Z"
          fill="#52988D"
        />
        <path
          d="M72.5002 48.7875L71.3362 46.8668L48.1309 59.7813L47.0902 31.5201H42.5014L40.9589 73.4184L19.2734 58.9638L17.9604 60.7852L40.7694 78.5458L40.0346 98.5001H49.5577L48.3118 64.6855L72.5002 48.7875Z"
          fill="#784663"
        />
        <path
          d="M52.5658 57.313C50.3187 55.0839 48.9264 51.993 48.9264 48.5777V48.0359C48.9264 41.2405 54.4367 35.7314 61.2321 35.7314H71.1847V46.9512L52.5658 57.313Z"
          fill="#3C7A6F"
        />
        <path
          d="M44.949 98.5001H40.1884L42.6548 31.5201H45.2287L44.949 98.5001Z"
          fill="#4F3B56"
        />
      </svg>
    </>
  );
}

function Sofa({ className }) {
  return (
    <>
      <svg
        width="132"
        height="62"
        viewBox="0 0 132 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M85.0331 3.77197H48.5718V32.6595H85.0331V3.77197Z"
          fill="#FF7E90"
        />
        <g opacity="0.4">
          <path
            d="M85.0331 3.77197H48.5718V32.6595H85.0331V3.77197Z"
            fill="black"
          />
        </g>
        <path
          d="M4.03355 18.2197C4.03355 18.2197 9.79365 16.025 13.0551 15.8944C16.3165 15.7641 18.0124 18.047 18.5342 19.0255C19.0561 20.004 19.5779 27.9618 19.5779 27.9618V59.2717H13.6752L4.03355 18.2197Z"
          fill="#FF7E90"
        />
        <g opacity="0.4">
          <path
            d="M4.03355 18.2197C4.03355 18.2197 9.79365 16.025 13.0551 15.8944C16.3165 15.7641 18.0124 18.047 18.5342 19.0255C19.0561 20.004 19.5779 27.9618 19.5779 27.9618V59.2717H13.6752L4.03355 18.2197Z"
            fill="black"
          />
        </g>
        <path
          d="M4.99885 59.6456C4.99885 59.6456 5.16577 32.0314 4.49837 31.0305C3.83097 30.0292 -0.924423 29.3618 0.160136 23.1883C1.24469 17.0148 8.5861 16.3474 11.7564 19.6011C14.9265 22.8547 13.968 34.7846 13.8011 41.7925C13.6342 48.8003 13.6753 59.6456 13.6753 59.6456H4.99885Z"
          fill="#FF7E90"
        />
        <path
          d="M127.966 18.2197C127.966 18.2197 122.206 16.025 118.945 15.8944C115.684 15.7641 113.988 18.047 113.466 19.0255C112.944 20.004 112.422 27.9618 112.422 27.9618V59.2717H118.325L127.966 18.2197Z"
          fill="#FF7E90"
        />
        <g opacity="0.4">
          <path
            d="M127.966 18.2197C127.966 18.2197 122.206 16.025 118.945 15.8944C115.684 15.7641 113.988 18.047 113.466 19.0255C112.944 20.004 112.422 27.9618 112.422 27.9618V59.2717H118.325L127.966 18.2197Z"
            fill="black"
          />
        </g>
        <path
          d="M127.001 59.6456C127.001 59.6456 126.834 32.0314 127.502 31.0305C128.169 30.0292 132.924 29.3618 131.84 23.1883C130.755 17.0148 123.414 16.3474 120.243 19.6011C117.073 22.8547 117.918 34.7237 118.084 41.7316C118.251 48.7394 118.325 59.6459 118.325 59.6459L127.001 59.6456Z"
          fill="#FF7E90"
        />
        <path
          d="M118.319 59.6455H13.6754C13.6086 53.9118 13.7881 47.3585 13.8425 40.3624H118.319V59.6455Z"
          fill="#FF7E90"
        />
        <path
          d="M14.0665 29.9933C14.0665 29.9933 14.4025 28.3925 19.0564 27.8517C23.7103 27.3109 38.8522 27.1138 43.4423 26.8801C48.0324 26.6467 63.5359 26.8187 65.8252 29.2861V40.7649C65.8252 40.9855 65.6489 41.1658 65.4283 41.1701C49.0483 41.4935 32.2599 41.7571 14.2308 41.1065C14.0409 41.0996 13.8403 41.0138 13.8379 40.8237C13.8256 39.8329 13.7954 36.8409 13.8424 34.1596C13.8999 30.8888 14.0665 29.9933 14.0665 29.9933Z"
          fill="#FF7E90"
        />
        <g opacity="0.3">
          <path
            d="M14.1517 41.0734C24.1584 42.6742 34.8139 44.1131 44.9477 44.0362C51.6578 43.9855 59.2759 43.5456 65.5834 41.2555C49.388 41.5992 32.1528 41.4996 14.1517 41.0734Z"
            fill="black"
          />
        </g>
        <g opacity="0.2">
          <path
            d="M65.8255 29.2861C63.5359 26.8189 48.0327 26.6467 43.4426 26.8801C38.8526 27.1135 23.7107 27.3109 19.0568 27.8517C15.4497 28.2707 14.4368 29.3264 14.1633 29.7804C14.1932 29.9223 14.2525 29.9933 14.2525 29.9933C31.825 30.587 48.3342 29.8785 65.3939 29.3096H65.8258V29.2861H65.8255Z"
            fill="black"
          />
        </g>
        <g opacity="0.3">
          <path
            d="M14.2521 31.1193C20.9969 31.3461 27.7467 31.3858 34.4947 31.3044C41.0691 31.2251 47.6414 31.0336 54.2125 30.8154C57.9397 30.6917 61.6666 30.5598 65.3938 30.4354C65.8225 30.4212 65.8243 29.7533 65.3938 29.7677C58.7687 29.9888 52.1444 30.234 45.5179 30.4135C38.9128 30.5924 32.3053 30.7046 25.6975 30.6696C21.8817 30.6493 18.0661 30.5796 14.2524 30.4516C13.8224 30.4372 13.8229 31.1049 14.2521 31.1193Z"
            fill="black"
          />
        </g>
        <g opacity="0.3">
          <path
            d="M14.0027 41.0037C20.771 40.9676 27.5395 41.0074 34.3078 41.0373C40.9778 41.067 47.648 41.0862 54.3175 41.005C58.0735 40.9594 61.829 40.8811 65.5835 40.7564C66.0118 40.7422 66.014 40.0746 65.5835 40.0887C58.9356 40.3096 52.2838 40.3825 45.6328 40.3934C38.9299 40.4044 32.2271 40.3539 25.5242 40.3315C21.6838 40.3187 17.8431 40.3152 14.0024 40.3355C13.5733 40.3384 13.5722 41.0061 14.0027 41.0037Z"
            fill="black"
          />
        </g>
        <path
          d="M117.952 29.9749C117.952 29.9749 117.248 28.2684 112.594 27.7278C107.94 27.187 92.7984 26.9899 88.2083 26.7562C83.6182 26.5228 68.1147 26.6948 65.8254 29.1622V40.641C65.8254 40.8616 66.0017 41.0419 66.2223 41.0462C82.6023 41.3696 99.4393 41.7013 117.469 41.0507C117.659 41.0438 118.061 40.7089 118.064 40.5187C118.076 39.5279 118.005 36.7336 117.958 34.052C117.9 30.7815 117.952 29.9749 117.952 29.9749Z"
          fill="#FF7E90"
        />
        <g opacity="0.3">
          <path
            d="M117.858 40.9543C107.8 41.9206 96.8367 43.9893 86.7029 43.9126C79.9928 43.8619 72.5772 42.7159 66.3211 41.0604C77.4044 41.6316 97.4601 41.1416 117.858 40.9543Z"
            fill="black"
          />
        </g>
        <g opacity="0.2">
          <path
            d="M65.8254 29.1622C68.115 26.695 83.6182 26.5228 88.2083 26.7562C92.7984 26.9896 107.94 27.187 112.594 27.7278C116.201 28.1468 117.639 29.4357 117.912 29.8897L117.398 29.8694C99.826 30.4631 83.3258 29.8702 66.2661 29.3011L65.8251 29.2864V29.1622H65.8254Z"
            fill="black"
          />
        </g>
        <g opacity="0.3">
          <path
            d="M117.324 30.4516C110.58 30.6784 103.83 30.7182 97.0817 30.6367C90.5073 30.5574 83.935 30.3659 77.3639 30.1477C73.6367 30.0241 69.9098 29.8921 66.1826 29.7677C65.7529 29.7533 65.7534 30.4209 66.1826 30.4354C72.8077 30.6565 79.432 30.9017 86.0585 31.0811C92.6636 31.2601 99.2711 31.3722 105.879 31.3372C109.695 31.3169 113.51 31.2472 117.324 31.1193C117.753 31.1049 117.755 30.4372 117.324 30.4516Z"
            fill="black"
          />
        </g>
        <g opacity="0.3">
          <path
            d="M117.574 40.336C110.805 40.3 104.037 40.3398 97.2685 40.3697C90.5985 40.3993 83.9283 40.4186 77.2585 40.3374C73.5025 40.2917 69.747 40.2134 65.9926 40.0887C65.5629 40.0746 65.5634 40.7422 65.9926 40.7564C72.6404 40.9773 79.2923 41.0502 85.9433 41.0611C92.6461 41.0721 99.349 41.0216 106.052 40.9992C109.892 40.9863 113.733 40.9829 117.573 41.0032C118.003 41.0061 118.004 40.3384 117.574 40.336Z"
            fill="black"
          />
        </g>
        <path
          d="M66.6943 27.9622C66.9619 28.1072 67.265 28.1759 67.5692 28.1609C81.6527 27.4639 93.9594 27.3242 107.742 27.8744C109.375 27.9395 112.373 28.4211 113.562 27.2994C114.478 26.4343 113.174 19.2561 113.277 17.7138C113.379 16.1712 113.309 6.44732 113.353 3.36243C113.398 0.277538 110.815 1.40937 110.815 1.40937C97.1746 3.53282 83.1808 3.36804 69.5943 0.924106C68.8153 0.783896 68.0218 0.635941 67.2369 0.737694C66.452 0.839446 65.6612 1.23711 65.2938 1.93816C64.911 2.66859 65.0545 3.55044 65.192 4.36366C66.1372 9.95951 65.7568 15.6216 65.739 21.3288C65.7331 23.2207 65.3122 25.2782 65.9134 27.0406C66.0482 27.4348 66.3278 27.7635 66.6943 27.9622Z"
          fill="#FF7E90"
        />
        <path
          d="M18.6454 28.0026C18.913 28.1476 19.2162 28.2163 19.5204 28.2013C33.6039 27.5043 45.9106 27.3646 59.6936 27.9148C61.3265 27.9799 64.3243 28.4615 65.5128 27.3398C66.4293 26.4747 65.2409 19.3368 65.3432 17.7945C65.4454 16.252 65.2598 6.48772 65.3044 3.40283C65.349 0.317944 62.766 1.44977 62.766 1.44977C49.1258 3.57322 35.132 3.40844 21.5455 0.964511C20.7665 0.824301 19.9733 0.676346 19.1881 0.778099C18.4032 0.879851 17.6124 1.27751 17.2449 1.97856C16.8622 2.70899 17.0059 3.59085 17.1432 4.40407C18.0883 10.0002 18.2729 15.724 17.6901 21.3692C17.496 23.251 17.2634 25.3186 17.8645 27.081C17.9994 27.4752 18.279 27.8039 18.6454 28.0026Z"
          fill="#FF7E90"
        />
        <path
          d="M11.8283 5.49072C11.8283 5.49072 11.8058 4.4497 13.2029 5.19188C13.6152 5.41087 22.3472 5.66993 27.9655 6.32744C27.9655 6.32744 39.9192 3.99648 41.6524 4.05631C43.3857 4.11613 42.0707 10.4948 41.6524 13.7006C41.2339 16.9065 44.2224 25.5912 43.1467 27.136C42.0709 28.6807 16.0121 30.9449 14.7569 29.8726C13.5017 28.8003 14.3384 26.3011 15.5936 25.13C15.5936 25.13 15.1752 24.4538 15.0558 22.802C14.9364 21.1502 14.5179 17.2652 13.9202 15.5917C13.3225 13.918 11.5892 8.06071 11.8283 5.49072Z"
          fill="#36416E"
        />
        <g opacity="0.2">
          <path
            d="M40.9859 14.4391C37.8428 13.8075 34.6997 13.1761 31.5569 12.5445C31.2706 12.4868 30.9696 12.4299 30.6908 12.5173C30.2768 12.6471 30.0132 13.0746 29.9489 13.5038C29.8842 13.9327 29.9809 14.3678 30.077 14.7911C30.5936 17.0657 31.1101 19.34 31.6266 21.6146C31.8789 22.7259 32.1329 23.8639 31.9986 24.9957C31.9113 25.7323 31.6608 26.4437 31.594 27.1827C31.527 27.9214 31.6853 28.7432 32.2582 29.2146L38.3163 28.1634L40.9859 14.4391Z"
            fill="black"
          />
        </g>
        <path
          d="M58.9074 25.1947C58.4093 21.0712 58.263 16.9049 58.4702 12.7566C58.4817 12.5245 58.314 12.3231 58.0838 12.2913C55.0328 11.8702 52.4516 12.309 49.3801 12.9328C47.6874 13.2768 45.3554 13.4018 43.6282 13.4077C41.453 13.4154 39.3592 12.6286 37.2063 12.3167C35.6592 12.0924 33.7379 12.0072 32.1265 12.1335C31.8995 12.1511 31.7216 12.3378 31.716 12.5654C31.6172 16.5174 32.2445 20.4866 33.5585 24.2148C33.5972 24.3246 33.5916 24.4448 33.5425 24.55C33.2292 25.2246 32.9303 25.92 32.8868 26.6598C32.8398 27.4599 33.1606 28.3351 33.8667 28.7143C34.3634 28.9809 34.9576 28.9651 35.5209 28.9424C43.2661 28.6308 51.0113 28.3191 58.7565 28.0077C59.0201 27.997 59.2185 27.7639 59.1868 27.5021L58.9074 25.1947Z"
          fill="#784663"
        />
      </svg>
    </>
  );
}

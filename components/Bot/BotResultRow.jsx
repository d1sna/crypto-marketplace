import { useEffect, useState } from "react";
import { CountDownTimer } from "../CountDownTimer";

function getRandomNumberWithDecimal(min, max, prev) {
  if (min >= max) {
    throw new Error("Минимальное значение должно быть меньше максимального");
  }

  const randomNumber = (Math.random() * (max - min) + min + prev).toFixed(2);
  return parseFloat(randomNumber);
}

export default function BotResultRow({
  pair,
  entirePrice,
  goalPrice,
  status,
  remainingTime,
  currentResultValue,
}) {
  const [currentResult, setCurrentResult] = useState(currentResultValue);

  useEffect(() => {
    setInterval(() => {
      setCurrentResult((prev) => getRandomNumberWithDecimal(-0.05, 0.1, prev));
    }, 3000);
  }, []);

  return (
    <div className="flex text-smxl sm:text-sm sm:justify-between border border-gray-800 w-full p-2 rounded-md m-1 bg-gray-800">
      <div className="mr-2 bg-blue-400 px-2 justify-center items-center flex rounded-md w-[20%]">
        {pair}
      </div>
      <div className="mr-2 px-2 text-yellow-300 justify-center items-center flex rounded-md w-[20%] ">
        {entirePrice}
      </div>
      <div className="mr-2 text-yellow-300 px-2 justify-center items-center flex rounded-md w-[20%] ">
        {goalPrice}
      </div>
      <div
        className={`mr-2 px-2 justify-center bg-green-400 items-center flex rounded-md w-[20%] ${
          status === "done" && "bg-orange-400"
        }`}
      >
        {status}
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md w-[30%] text-yellow-300">
        <CountDownTimer
          days={remainingTime.d}
          hours={remainingTime.h}
          minutes={remainingTime.m}
          seconds={remainingTime.s}
          simple
        />
      </div>
      <div
        className={`mr-2 ${
          currentResult > 0 ? "text-green-400" : "text-red-400"
        } px-2 justify-center items-center flex rounded-md w-[20%]`}
      >
        {currentResult}%
      </div>
    </div>
  );
}

export const BotResultColumns = () => {
  return (
    <div className="flex text-smxl sm:text-sm sm:justify-between border border-gray-800 w-full p-2 rounded-md m-1 bg-gray-800">
      <div className="mr-2 px-2 justify-center items-center flex rounded-md w-[20%] ">
        PAIR:
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md w-[20%] ">
        PRICE:
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md w-[20%] ">
        GOAL:
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md w-[20%] ">
        <div className="mr-2">STATUS:</div>
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md w-[30%] ">
        TIME:
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md w-[20%] ">
        RESULT:
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { CountDownTimer } from "../CountDownTimer";
import axios from "axios";
import { getRandomNumberWithDecimal } from "../../lib/getRandomNumberWithDecimal";

export default function BotResultRow({
  id,
  pair,
  entirePrice,
  goalPrice,
  status,
  remainingTime,
  currentResultValue,
}) {
  const [currentResult, setCurrentResult] = useState(currentResultValue);

  useEffect(() => {
    setInterval(async () => {
      const { data } = await axios.post("/api/get-bots", { botIds: [id] });
      const bot = data[0];

      setCurrentResult((prev) => {
        const random = getRandomNumberWithDecimal(
          -0.01,
          0.03,
          bot.currentResult
        );
        return random < 100 ? random : prev;
      });
    }, 3000);
  }, []);

  return (
    <div className="flex text-smxs sm:text-sm sm:justify-between border border-gray-800 w-full p-2 rounded-md m-1 bg-gray-800">
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
        className={`mr-2 px-2 justify-center text-green-400 items-center flex rounded-md w-[20%] ${
          status === "done" && "text-orange-400"
        }`}
      >
        {status}
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md w-[50%] text-yellow-300">
        <CountDownTimer
          days={remainingTime.d}
          hours={remainingTime.h}
          minutes={remainingTime.m}
          seconds={remainingTime.s}
          simple
          className="min-w-full"
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
    <div className="flex  text-smxs sm:text-sm sm:justify-between border border-gray-800 w-full p-2 rounded-md m-1 bg-gray-800">
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
      <div className="mr-2 px-2 justify-center items-center flex rounded-md w-[50%] ">
        TIME:
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md w-[20%] ">
        RESULT:
      </div>
    </div>
  );
};

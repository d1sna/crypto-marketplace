import Link from "next/link";
import React, { useState } from "react";
import UseFullContext from "../lib/useFullContext";

export const CountDownTimer = ({
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  text = "",
  simple = false,
  className = "",
  finishText = "Time finished",
  intervalTime = 1000,
}) => {
  const [[d, h, m, s], setTime] = React.useState([
    days,
    hours,
    minutes,
    seconds,
  ]);
  const { defaultAccount } = UseFullContext();
  const [finished, setFinished] = useState(false);

  const tick = () => {
    if (d === 0 && h === 0 && m === 0 && s === 0) {
      setFinished(true);
    } else if (h === 0 && m === 0 && s === 0) {
      setTime([d - 1, 23, 59, 59]);
    } else if (m === 0 && s === 0) {
      setTime([d, h - 1, 59, 59]);
    } else if (s == 0) {
      setTime([d, h, m - 1, 59]);
    } else {
      setTime([d, h, m, s - 1]);
    }
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), intervalTime);
    return () => clearInterval(timerID);
  });

  return (
    <>
      {simple ? (
        <div>
          {finished
            ? finishText
            : `~${d === 0 ? "" : d + " d"}  ${h
                .toString()
                .padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`}
        </div>
      ) : (
        <div
          className={
            `rounded-md flex flex-col items-center justify-between shadow-xl py-4 my-2 h-[50%]` +
            className
          }
        >
          <label className="mb-1 block">{text}</label>
          <div className="flex items-center justify-center text-black w-full lg:w-[60%] m-2 h-full bg-gray-900 ">
            <input
              className="h-full bg-white w-full text-2xl sm:text-4xl font-semibold text-center px-1 mx-2 border border-gray-500 rounded-md "
              type="text"
              value={`${d} d`}
              readOnly
            />
            <input
              className="h-full bg-white w-full text-2xl sm:text-4xl font-semibold text-center px-1 mx-2 border border-gray-500 rounded-md"
              type="text"
              value={`${h.toString().padStart(2, "0")} h`}
              readOnly
            />
            :
            <input
              className="h-full bg-white w-full text-2xl sm:text-4xl font-semibold text-center px-1 mx-2 border border-gray-500 rounded-md"
              type="text"
              value={`${m.toString().padStart(2, "0")} m`}
              readOnly
            />
            :
            <input
              className="h-full bg-white w-full text-2xl sm:text-4xl font-semibold text-center px-1 mx-2 border border-gray-500 rounded-md"
              type="text"
              value={`${s.toString().padStart(2, "0")} s`}
              readOnly
            />
          </div>

          <Link
            href={defaultAccount ? "/exchange" : "/tutorial"}
            className="mt-4 rounded-md p-2 bg-purple-600"
          >
            Start trading with AI for free
          </Link>
        </div>
      )}
    </>
  );
};

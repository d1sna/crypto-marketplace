import Link from "next/link";
import React from "react";
import UseFullContext from "../lib/useFullContext";

export const CountDownTimer = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  text = "",
  className = "",
}) => {
  const [paused, setPaused] = React.useState(false);
  const [over, setOver] = React.useState(false);
  const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);
  const { defaultAccount } = UseFullContext();

  const tick = () => {
    if (paused || over) return;

    if (h === 0 && m === 0 && s === 0) {
      setOver(true);
    } else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s == 0) {
      setTime([h, m - 1, 59]);
    } else {
      setTime([h, m, s - 1]);
    }
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <>
      <div
        className={
          "bg-gray-900 text-white rounded-md flex flex-col items-center justify-between shadow-xl p-4 my-2 h-[50%]" +
          className
        }
      >
        <label className="mb-1 block">{text}</label>
        <div className="flex items-center justify-center w-full md:w-[60%] h-full">
          <input
            className="text-gray-900 h-full w-full text-4xl font-semibold text-center px-1 mx-2 border rounded-md"
            type="text"
            value={`${h.toString().padStart(2, "0")} h`}
            readOnly
          />
          :
          <input
            className="text-gray-900 h-full w-full text-4xl font-semibold text-center px-1 mx-2 border rounded-md"
            type="text"
            value={`${m.toString().padStart(2, "0")} m`}
            readOnly
          />
          :
          <input
            className="text-gray-900 h-full w-full text-4xl font-semibold text-center px-1 mx-2 border rounded-md"
            type="text"
            value={`${s.toString().padStart(2, "0")} s`}
            readOnly
          />
        </div>

        <Link
          href={defaultAccount ? "/exchange" : "/tutorial"}
          className="mt-4 rounded-md p-2 bg-purple-600"
        >
          {defaultAccount
            ? "Buy token and start trading with AI"
            : "Install metamask and start trading with AI"}
        </Link>
      </div>
    </>
  );
};

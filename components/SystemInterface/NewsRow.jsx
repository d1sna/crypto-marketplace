import { useEffect, useState } from "react";
import UseFullContext from "../../lib/useFullContext";
import { getShortAccount } from "../../lib/getShortAccount";

function generateRandomEthAddress() {
  const characters = "0123456789abcdef";
  let address = "0x";

  for (let i = 0; i < 40; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    address += characters[randomIndex];
  }

  return address;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function NewsRow({ className }) {
  const { tokenSymbol } = UseFullContext();
  const [randomAcc, setRandomAcc] = useState("");
  const [randomResult, setRandomResult] = useState("");

  useEffect(() => {
    setInterval(() => {
      const generatedResult = `${getRandomNumber(
        1000,
        10000
      )}$ (+${getRandomNumber(60, 250)}.${getRandomNumber(10, 99)} %)`;

      setRandomAcc(getShortAccount(generateRandomEthAddress()));
      setRandomResult(generatedResult);
    }, 5000);
  }, []);

  return (
    <div
      className={
        "w-full p-2 my-2 bg-gray-900 text-smxl rounded-md flex flex-col sm:flex-row justify-center items-center" +
        className
      }
    >
      <div className="flex flex-col sm:flex-row justify-center items-center">
        📢 ACTIVITY :&nbsp;
      </div>
      {!!randomResult && (
        <div className="flex flex-col sm:flex-row justify-center items-center">
          🔥&nbsp;<div className="text-emerald-500">{randomAcc}</div>&nbsp;get
          result&nbsp;
          <div className="text-emerald-500">{randomResult}</div>
        </div>
      )}
      <div className="hidden sm:flex flex-col sm:flex-row justify-center items-center">
        &nbsp; | &nbsp;
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center">
        📈 DAYS TO LISTING TOKEN F&nbsp;
      </div>
      <div className=" text-purple-600 flex flex-col sm:flex-row justify-center items-center">
        [{tokenSymbol}]
      </div>
      <div className="text-red-600 flex flex-col sm:flex-row justify-center items-center">
        &nbsp;14d ↓ 🔥
      </div>
    </div>
  );
}

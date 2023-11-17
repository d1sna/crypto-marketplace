import { Button } from "@mui/material";
import TradingViewWidget from "../components/Widgets/TradingViewWidget";
import { useEffect, useState } from "react";
import TailwindInput from "../components/SystemInterface/TailwindInput";
import BotResultRow, { BotResultColumns } from "../components/Bot/BotResultRow";
import NewsRow from "../components/SystemInterface/NewsRow";
import UseFullContext from "../lib/useFullContext";
import { ethers } from "ethers";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";
import { mainPageLogo } from "../public";
import Image from "next/image";
import { TailwindSelect } from "../components/SystemInterface/TailwindSelect";

// TODO: change
const course = 2015;

const timeValues = [
  "Automatic",
  "1h - 2h",
  "2h - 5h",
  "5h - 10h",
  "10h - 1d",
  "1d - 2d",
  "3d - 7d",
];

const calculateTime = (estimatedTimeIndex, percentageRisk, valueUsd) => {
  // Определение времени в часах на основе индекса
  const timeOptions = ["2h", "5h", "10h", "1d", "2d", "7d"];
  const selectedTime = timeOptions[estimatedTimeIndex];
  console.log({ selectedTime });

  // Динамический коэффициент X
  const X = Math.min(Math.max((percentageRisk + valueUsd) / 2, -1), 1);

  // Текущая дата и время
  const now = new Date();

  // Вычисление времени на основе индекса и коэффициента X
  let estimatedTime;
  switch (selectedTime) {
    case "2h":
      estimatedTime = now.getTime() + X * 2 * 60 * 60 * 1000;
      break;
    case "5h":
      estimatedTime = now.getTime() + X * 5 * 60 * 60 * 1000;
      break;
    case "10h":
      estimatedTime = now.getTime() + X * 10 * 60 * 60 * 1000;
      break;
    case "1d":
      estimatedTime = now.getTime() + X * 24 * 60 * 60 * 1000;
      break;
    case "2d":
      estimatedTime = now.getTime() + X * 2 * 24 * 60 * 60 * 1000;
      break;
    case "7d":
      estimatedTime = now.getTime() + X * 7 * 24 * 60 * 60 * 1000;
      break;
    default:
      estimatedTime = now.getTime();
  }

  return new Date(estimatedTime);
};

const calculateTimeDifference = (targetDate) => {
  const now = new Date();
  const difference = targetDate - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `${days} дней, ${hours} часов, ${minutes} минут`;
};

const getXByValue = (value) => {
  if (value <= 10) return 1.05;
  if (value <= 100) return 1.09;
  if (value <= 500) return 1.21;
  if (value <= 1000) return 1.33;
  if (value <= 3000) return 1.45;
  if (value > 3000) return 1.56;

  return 1;
};

const getChanceColor = (chanceToWin) => {
  if (chanceToWin < 10) return "text-red-600";
  if (chanceToWin < 20) return "text-red-400";
  if (chanceToWin < 40) return "text-orange-600";
  if (chanceToWin < 60) return "text-orange-400";
  if (chanceToWin < 80) return "text-green-600";
  if (chanceToWin < 100) return "text-green-400";
};

function BotPage() {
  const [pair, setPair] = useState("btcusdt");
  const { tokenContract, defaultAccount } = UseFullContext();
  const [manualFetchBalance, setManualFetchBalance] = useState(false);
  const [balanceToken, setBalanceToken] = useState(null);

  const [estimatedTimeIndex, setEstimatedTimeIndex] = useState(0);
  const [percentageRisk, setPercentageRisk] = useState(0.1);
  const [awaitingResult, setAwaitingResult] = useState(0);
  const [chanceToWin, setChanceToWin] = useState(0);
  const [chanceToWinColor, setChanceToWinColor] = useState(
    getChanceColor(chanceToWin)
  );

  const [calculatedTime, setCalculatedTime] = useState("-");

  const [valueUsd, setValueUsd] = useState(0);
  const [tokenValue, setTokenValue] = useState(0);

  const [field, setField] = useState("trade");

  useEffect(() => {
    setAwaitingResult(
      valueUsd * (percentageRisk * 10 * getXByValue(valueUsd).toFixed(2))
    );

    if (valueUsd > 0)
      setChanceToWin(
        (1 - percentageRisk) * 100 +
          Number(estimatedTimeIndex) +
          getXByValue(valueUsd)
      );

    setCalculatedTime(
      calculateTimeDifference(
        calculateTime(estimatedTimeIndex, percentageRisk, valueUsd)
      )
    );

    setChanceToWinColor(getChanceColor(chanceToWin));
  }, [valueUsd, percentageRisk, estimatedTimeIndex, chanceToWin]);

  // TODO: перенести в контекст
  useEffect(() => {
    const getTokenBalance = async () => {
      try {
        const result = await tokenContract.balanceOf(defaultAccount);
        const parsedBalance = ethers.utils.formatEther(result);
        setBalanceToken(parsedBalance);
      } catch (e) {
        console.log("ERROR WHILE GETTING BALANCE", e.message);
      }
    };

    if (tokenContract) getTokenBalance();
    setManualFetchBalance(false);
  }, [defaultAccount, tokenContract, manualFetchBalance]);

  return (
    <div className="flex flex-col w-full sm:max-w-[80%] min-h-screen">
      <NewsRow />

      <div className="p-1 h-full flex flex-col sm:flex-row sm:justify-between">
        <div className="w-full sm:w-[180%] h-full sm:mr-2 flex flex-col">
          <div className="flex border rounded-md border-gray-900 w-full h-full bg-gray-900 p-2">
            <TradingViewWidget pair={pair} />
          </div>

          <div className="w-full bg-gray-900 rounded-md flex justify-between items-center my-2 cursor-pointer">
            <div>
              <Image
                width={250}
                height={150}
                className="rounded-xl"
                src={mainPageLogo}
              />
            </div>
            <div className="flex flex-col ml-2 p-2 w-full h-full ">
              <div className="my-1 border-b border-gray-400  flex flex-col">
                Здесь будет как использовать приложение
              </div>
              <div className="text-smxl">
                Инструкция говорит что нужно установить метамаск и закинуть
                денежку пацанам...
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-md w-full h-full mt-2 text-smxl border border-gray-900 bg-gray-900 p-2">
            <div className="flex justify-center items-center border-b border-gray-900">
              🤖 YOUR BOTS:
            </div>
            <BotResultColumns />
            <BotResultRow
              pair="BTC/USDT"
              entirePrice="2054$"
              goalPrice="3100$"
              status="in progress"
              remainingTime="~ 1d 21h 32m"
              currentResult={29.32}
            />
          </div>
        </div>

        <div className="p-2 w-full flex flex-col items-center sm:ml-2 mt-2 sm:mt-0 border border-gray-900 bg-gray-900 rounded-md text-sm justify-between">
          <div className="h-auto mt-2 w-full">
            <h3 className="flex border-b border-gray-500 pb-2 mb-1">
              🔥 Popular trading pairs
            </h3>
            <div className="text-xs">
              <Button
                onClick={() => setPair("btcusdt")}
                className={pair === "btcusdt" && "bg-gray-800 m-1 text-white"}
              >
                BTC/USDT
              </Button>
              <Button
                onClick={() => setPair("ethusdt")}
                className={pair === "ethusdt" && "bg-gray-800 m-1 text-white"}
              >
                ETH/USDT
              </Button>
            </div>
          </div>

          <div className="w-full  flex flex-col  p-2 m-2 text-sm">
            <div className="mb-2 flex font-bold rounded-md bg-gray-800 p-1">
              💰 Current bot balance:{" "}
            </div>
            <div className=" font-bold text-emerald-300 mr-4 flex self-end rounded-md bg-gray-800 p-1">
              {balanceToken} <div className="text-purple-500"> &nbsp; TNF</div>
              <div>&nbsp; (~ {balanceToken * course}&nbsp;$)</div>
            </div>
          </div>

          <div className="flex w-full justify-center items-center border border-gray-900 m-1 rounded-md">
            <div
              className={`flex items-center justify-center w-full border-r rounded-l-md ${
                field === "trade" ? "bg-gray-600" : "bg-gray-800"
              } cursor-pointer`}
              onClick={() => setField("trade")}
            >
              <span class="semi-bold usn">Trade</span>
            </div>

            <div
              className={`flex items-center justify-center w-full ${
                field === "tools" ? "bg-gray-600" : "bg-gray-800"
              }  cursor-pointer rounded-r-md`}
              onClick={() => setField("tools")}
            >
              <span class="semi-bold usn">Tools</span>
            </div>
          </div>

          {field === "trade" && (
            <div className="flex flex-col w-full h-full justify-center items-center">
              <TailwindInput
                label={"YOUR BET [USD]"}
                value={valueUsd}
                className={"w-[80%]"}
                isNumbersOnly
                onChange={(e) => {
                  if (e.target.value.length > 8) return;

                  if (
                    isNaN(Number(e.target.value)) ||
                    e.target.value.toLowerCase().includes("nan")
                  ) {
                    setTokenValue(0);
                    setValueUsd(0);
                    return;
                  }

                  setTokenValue(Number(e.target.value) / course);
                  setValueUsd(Number(e.target.value));
                }}
              />
              <TailwindInput
                label={"YOUR BET [TNF]"}
                isNumbersOnly
                value={tokenValue}
                className={"w-[80%]"}
              />

              <div>CHOOSE RISK</div>
              <div className="flex text-smxl justify-between items-center w-[80%] border rounded-md m-5 ">
                <div
                  className={`w-full rounded-l-md border-r px-2 cursor-pointer ${
                    percentageRisk === 0.1 && "bg-orange-600"
                  }`}
                  onClick={() => setPercentageRisk(0.1)}
                >
                  10%
                </div>
                <div
                  className={`w-full border-r px-2 cursor-pointer ${
                    percentageRisk === 0.25 && "bg-orange-600"
                  }`}
                  onClick={() => setPercentageRisk(0.25)}
                >
                  25%
                </div>
                <div
                  className={`w-full border-r px-2 cursor-pointer ${
                    percentageRisk === 0.5 && "bg-orange-600"
                  }`}
                  onClick={() => setPercentageRisk(0.5)}
                >
                  50%
                </div>
                <div
                  className={`w-full border-r px-2 cursor-pointer ${
                    percentageRisk === 0.75 && "bg-orange-600"
                  }`}
                  onClick={() => setPercentageRisk(0.75)}
                >
                  75%
                </div>
                <div
                  c
                  className={`w-full rounded-r-md border-r px-2 cursor-pointer ${
                    percentageRisk === 1 && "bg-orange-600"
                  }`}
                  onClick={() => setPercentageRisk(1)}
                >
                  100%
                </div>
              </div>
            </div>
          )}

          {field === "tools" && (
            <div className="flex flex-col w-full h-full justify-center items-center">
              <div>Bot strategy</div>
              <TailwindSelect />

              <div>Bot strategy</div>
              <TailwindSelect
                values={timeValues}
                label="Select awaiting time"
                onChange={(e) => setEstimatedTimeIndex(e.target.value)}
              />
            </div>
          )}

          <div className="w-full py-1 flex justify-between items-center bg-gray-800 rounded-md my-1 ml-2 px-4">
            Calculated chance:
            <div className={chanceToWinColor}>&nbsp;{chanceToWin}&nbsp; %</div>
          </div>

          <div className="w-full py-1 flex justify-between items-center bg-gray-800 rounded-md my-1 ml-2 px-4">
            Calculated result [USD]:
            <div className="text-green-400 ml-2">
              {awaitingResult}
              &nbsp; $ &nbsp;
            </div>
          </div>

          <div className="w-full py-1 flex justify-between items-center bg-gray-800 rounded-md my-1 ml-2 px-4">
            Calculated time: <div className="">~ {calculatedTime}</div>
          </div>

          <div className="flex justify-center pb-2 w-full mt-2">
            <Button
              disabled={!awaitingResult}
              className="bg-green-600  text-white w-[40%] mx-1"
            >
              Start bot
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithConnectedWallet(BotPage);

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
import { toast } from "react-toastify";
import { uuid } from "uuidv4";
import axios from "axios";
import { getCourseEth } from "../lib/getCourseEth";

function formatTimeUntil(timestamp) {
  const now = Math.floor(Date.now() / 1000); // Текущее время в Unix timestamp
  const timeDifference = timestamp - now;

  if (timeDifference <= 0) {
    return "Time has already passed";
  }

  const d = Math.floor(timeDifference / (60 * 60 * 24));
  const h = Math.floor((timeDifference % (60 * 60 * 24)) / (60 * 60));
  const m = Math.floor((timeDifference % (60 * 60)) / 60);
  const s = timeDifference % 60;

  return {
    d,
    h,
    m,
    s,
  };
}

const timeValues = [
  "Automatic",
  "24 h",
  "36 h",
  "48 h",
  "60 h",
  "72 h",
  "96 h",
];

const calculateTime = (estimatedTimeIndex, percentageRisk, valueUsd) => {
  if (estimatedTimeIndex === 0) return timeValues[3];
  return timeValues[estimatedTimeIndex];
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

const strategyValues = [
  "Automatic",
  "Support And Resistance Trading",
  "Candlestick Patterns Trading",
  "Arbitrage",
  "Algorithmic Trading",
  "Smart money",
  "Trend Following",
  "Overbought / Oversold",
  "Moving Average Crossover",
  "News-based Trading",
  "Pair Trading",
];

function BotPage() {
  const { tokenContract, defaultAccount, signer, tokenSymbol } =
    UseFullContext();

  const [course, setCourse] = useState();
  const [pair, setPair] = useState("btcusdt");
  const [manualFetchBalance, setManualFetchBalance] = useState(false);
  const [balanceToken, setBalanceToken] = useState(null);

  const [estimatedTimeIndex, setEstimatedTimeIndex] = useState(0);
  const [selectedStrategyIndex, setSelectedStrategyIndex] = useState(0);
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

  const [allCurrentBots, setAllCurrentBots] = useState([]);

  const startBot = async () => {
    try {
      const amount = ethers.utils.parseEther(String(tokenValue));
      const calculatedTimeInSec =
        parseInt(calculatedTime.split(" ")[0], 10) * 60 * 60;
      const botId = uuid();
      const startTime = Date.now() / 1000;
      const finishTime = Math.floor(startTime + calculatedTimeInSec);

      const tx = await tokenContract
        .connect(signer)
        .addBotTime(botId, finishTime, amount);

      try {
        await axios.post("/api/save-bot", {
          botId,
          tx,
          finishTime,
          startTime,
          tokenValue,
          pair,
          percentageRisk,
          currentResult: 0,
          awaitingResult: awaitingResult / course,
        });
      } catch (error) {
        console.log({ error });
      }

      toast.warn(`Transaction pending... Hash:${tx.hash}`, {
        autoClose: 10000,
      });
      await tx.wait();

      toast.success(`Transaction successful:
      bot started `);

      setManualFetchBalance(true);
    } catch (error) {
      toast.error(`Error while starting bot: ${error.message}`);
      console.log({ error });
    }
  };

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
      calculateTime(estimatedTimeIndex, percentageRisk, valueUsd)
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

    const getAllBots = async () => {
      try {
        const result = await tokenContract.getAllBotTimes();
        const botMap = new Map([]);
        const botIds = result[0];

        result[1].forEach((bigTime, i) =>
          botMap.set(
            botIds[i],
            parseInt(String(ethers.BigNumber.from(bigTime)))
          )
        );

        let parsedBots;
        try {
          const bots = await axios
            .post("/api/get-bots", { botIds })
            .then(({ data }) => data);

          parsedBots = bots.map((bot) => {
            const botId = bot.botId;
            const botTime = botMap.get(botId);
            const botAwaitingResult = bot.awaitingResult;
            const botStartedValue = bot.tokenValue;
            const botPair = bot.pair;
            const botCurrentResult = bot.currentResult;

            return {
              botPair,
              botId,
              botTime,
              botAwaitingResult,
              botStartedValue,
              botCurrentResult,
            };
          });
        } catch (error) {}

        setAllCurrentBots(parsedBots.reverse().slice(0, 5));
      } catch (e) {
        console.log("ERROR WHILE GETTING BOTS", e.message);
      }
    };

    const getCourse = async () => {
      const res = await getCourseEth();
      if (!isNaN(Number(res))) setCourse(Number(res).toFixed(2));
    };

    if (tokenContract) {
      getTokenBalance();
      getAllBots();
    }
    setManualFetchBalance(false);

    getCourse();
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
                How to use trading AI bot
              </div>
              <div className="text-smxl flex flex-col">
                <div>1. Choose trading pair</div>
                <div>
                  2. Set your USD bet to bot ( automatic convert to{" "}
                  {tokenSymbol} )
                </div>
                <div>3. Switch to tools and set strategy and time to bot</div>
                <div>
                  4. Choose bot risk ( more risk more money, but be careful )
                </div>
                <div>
                  5. Check calculated result and time and tap START BOT button
                </div>
                <div>Tap on instruction to see more details</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-md w-full h-full mt-2 text-smxl border border-gray-900 bg-gray-900 p-2">
            <div className="flex justify-center items-center border-b border-gray-900">
              🤖 YOUR BOTS:
            </div>
            <BotResultColumns />
            {allCurrentBots.map((bot) => {
              console.log({
                bot: new Date(bot.time * 1000),
                now: new Date(Date.now()),
              });
              return (
                <BotResultRow
                  pair={bot.botPair}
                  entirePrice={`~ ${(bot.botStartedValue * course).toFixed(
                    2
                  )} $`}
                  goalPrice={`~ ${(bot.botAwaitingResult * course).toFixed(
                    2
                  )} $`}
                  status={
                    new Date(Date.now()) >= new Date(bot.botTime * 1000)
                      ? "done"
                      : "in progress"
                  }
                  remainingTime={formatTimeUntil(bot.botTime)}
                  currentResultValue={bot.botCurrentResult}
                />
              );
            })}
          </div>
        </div>

        <div className="p-2 w-full flex flex-col items-center sm:ml-2 mt-2 sm:mt-0 border border-gray-900 bg-gray-900 rounded-md text-sm justify-between">
          <div className="h-auto mt-2 w-full">
            <h3 className="flex border-b border-gray-500 pb-2 mb-1">
              🔥 Popular trading pairs
            </h3>
            <div className="text-xs">
              <div
                onClick={() => setPair("btcusdt")}
                className={`
                rounded-md p-2 cursor-pointer ${
                  pair === "btcusdt" && "bg-gray-800 m-1 text-white"
                }`}
              >
                BTC/USDT
              </div>
              <div
                onClick={() => setPair("ethusdt")}
                className={`rounded-md p-2 cursor-pointer ${
                  pair === "ethusdt" && "bg-gray-800 m-1 text-white"
                }`}
              >
                ETH/USDT
              </div>
            </div>
          </div>

          <div className="w-full  flex flex-col  p-2 m-2 text-sm">
            <div className="mb-2 flex font-bold rounded-md bg-gray-800 p-1">
              💰 Current bot balance:{" "}
            </div>
            <div className=" font-bold text-emerald-300 mr-4 flex self-end rounded-md bg-gray-800 p-1">
              {balanceToken}{" "}
              <div className="text-purple-500"> &nbsp; {tokenSymbol}</div>
              <div>&nbsp; (~ {(balanceToken * course).toFixed(2)}&nbsp;$)</div>
            </div>
          </div>

          <div className="flex w-full justify-center items-center border border-gray-900 m-1 rounded-md">
            <div
              className={`flex items-center justify-center w-full border-r rounded-l-md my-1 ${
                field === "trade" ? "bg-gray-600" : "bg-gray-800"
              } cursor-pointer`}
              onClick={() => setField("trade")}
            >
              <span className="semi-bold usn">Trade</span>
            </div>

            <div
              className={`flex items-center justify-center w-full my-1 ${
                field === "tools" ? "bg-gray-600" : "bg-gray-800"
              }  cursor-pointer rounded-r-md`}
              onClick={() => setField("tools")}
            >
              <span className="semi-bold usn">Tools</span>
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
                label={`YOUR BET [${tokenSymbol}]`}
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
              <TailwindSelect
                values={strategyValues}
                selected={strategyValues[selectedStrategyIndex]}
                onChange={(e) => setSelectedStrategyIndex(e.target.value)}
                label="Select strategy"
              />

              <div>Bot strategy</div>
              <TailwindSelect
                values={timeValues}
                label="Select awaiting time"
                selected={timeValues[estimatedTimeIndex]}
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
              {awaitingResult.toFixed(2)}
              &nbsp; $ &nbsp;
            </div>
          </div>

          <div className="w-full py-1 flex justify-between items-center bg-gray-800 rounded-md my-1 ml-2 px-4">
            Calculated time: <div className="">~ {calculatedTime}</div>
          </div>

          <div className="flex justify-center pb-2 w-full mt-2">
            <div
              className={`uppercase p-2 rounded-md text-white w-[40%] mx-1 flex justify-center items-center ${
                !awaitingResult ? "bg-gray-400" : "bg-green-600 cursor-pointer"
              }`}
              onClick={async () => {
                if (awaitingResult) await startBot();
              }}
            >
              Start bot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithConnectedWallet(BotPage);

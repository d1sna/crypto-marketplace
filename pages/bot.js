import { Button } from "@mui/material";
import TradingViewWidget from "../components/Widgets/TradingViewWidget";
import { useEffect, useState } from "react";
import TailwindInput from "../components/SystemInterface/TailwindInput";
import BotResultRow, { BotResultColumns } from "../components/Bot/BotResultRow";
import NewsRow from "../components/SystemInterface/NewsRow";
import UseFullContext from "../lib/useFullContext";
import { ethers } from "ethers";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";

function BotPage() {
  const [pair, setPair] = useState("btcusdt");
  const { tokenContract, defaultAccount } = UseFullContext();
  const [manualFetchBalance, setManualFetchBalance] = useState(false);
  const [balanceToken, setBalanceToken] = useState(null);

  const [botPrice, setBotPrice] = useState(0);
  const [awaitingResult, setAwaitingResult] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [risk, setRisk] = useState("100%");

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
    <div className="flex flex-col h-full w-full">
      <NewsRow />
      <div className="p-1 h-full flex flex-col sm:flex-row sm:justify-between">
        <div className="w-full sm:w-[180%] h-full sm:mr-2 flex flex-col">
          <div className="flex border rounded-md border-gray-900 w-full h-full bg-gray-900 p-2">
            <TradingViewWidget pair={pair} />
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

          <div className="w-full bg-gray-800 flex flex-col rounded-md p-2 m-2 text-sm">
            <p className="mb-2 flex font-bold ">💰 Current bot balance: </p>
            <p className=" font-bold text-emerald-300 ml-4 flex">{balanceToken} <p className="text-purple-500"> &nbsp; TNF</p></p>
          </div>

          <div className="flex w-full justify-center items-center border border-gray-900 m-1 rounded-sm">
            <div className="flex items-center justify-center w-full border-r bg-gray-600 cursor-pointer">
              <span class="semi-bold usn">Trade</span>
            </div>

            <div className="flex items-center justify-center w-full bg-gray-800 cursor-pointer">
              <span class="semi-bold usn">Tools</span>
            </div>
          </div>

          <TailwindInput
            label={"YOUR BET [USD]"}
            className={"w-[80%]"}
            isNumbersOnly
            onChange={(e) => setBotPrice(Number(e.target.value))}
          />
          <TailwindInput
            label={"YOUR BET [TNF]"}
            isNumbersOnly
            className={"w-[80%]"}
          />

          <div className="flex text-smxl justify-between items-center w-[80%] border rounded-md m-5 ">
            <div
              className={`w-full rounded-l-md border-r px-2 cursor-pointer ${
                percentage === 0.1 && "bg-orange-600"
              }`}
              onClick={() => setPercentage(0.1)}
            >
              10%
            </div>
            <div
              className={`w-full border-r px-2 cursor-pointer ${
                percentage === 0.25 && "bg-orange-600"
              }`}
              onClick={() => setPercentage(0.25)}
            >
              25%
            </div>
            <div
              className={`w-full border-r px-2 cursor-pointer ${
                percentage === 0.5 && "bg-orange-600"
              }`}
              onClick={() => setPercentage(0.5)}
            >
              50%
            </div>
            <div
              className={`w-full border-r px-2 cursor-pointer ${
                percentage === 0.75 && "bg-orange-600"
              }`}
              onClick={() => setPercentage(0.75)}
            >
              75%
            </div>
            <div
              c
              className={`w-full rounded-r-md border-r px-2 cursor-pointer ${
                percentage === 1 && "bg-orange-600"
              }`}
              onClick={() => setPercentage(1)}
            >
              100%
            </div>
          </div>

          <div className="w-full py-1 flex justify-center items-center bg-gray-800 rounded-md my-1">
            Risk: <p className="text-red-500">&nbsp;{risk}</p>
          </div>

          <div className="w-full py-1 flex justify-center items-center bg-gray-800 rounded-md my-1">
            Awaiting result:{" "}
            <p className="text-green-400 ml-2">
              {botPrice + botPrice * percentage || "-"}
            </p>
          </div>

          <div className="w-full py-1 flex justify-center items-center bg-gray-800 rounded-md my-1">
            Estimated remaining time: {awaitingResult}
          </div>

          <div className="flex justify-center pb-2 w-full mt-2">
            <Button className="bg-green-600  text-white w-[40%] mx-1">
              Start bot
            </Button>
            {/* <Button className="bg-red-600 text-white w-[80%] mx-1">
              Sell / short
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithConnectedWallet(BotPage);

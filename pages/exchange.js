import React, { useEffect, useState } from "react";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";
import UseFullContext from "../lib/useFullContext";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import TailwindInput from "../components/SystemInterface/TailwindInput";
import { getShortAccount } from "../lib/getShortAccount";

import { w3cwebsocket } from "websocket";

function Exchange() {
  const { tokenContract, defaultAccount, signer } = UseFullContext();

  const [balanceToken, setBalanceToken] = useState(null);
  const [tnfTransferAmount, setTransferTnfAmount] = useState();
  const [tnfDepositAmount, setTnfDepositAmount] = useState();
  const [tnfAddressTo, setTnfAddressTo] = useState();
  const [manualFetchBalance, setManualFetchBalance] = useState(false);

  const [currentBalanceInUsd, setCurrentBalanceInUsd] = useState(null);

  useEffect(() => {
    try {
      const ws = new w3cwebsocket(
        "wss://stream.binance.com:9443/ws/ethusdt@trade"
      );
      ws.onmessage = ({ data }) => {
        const course = Number(JSON.parse(data).p);
        const balanceInUsd = balanceToken * course;
        if (balanceInUsd > 0) setCurrentBalanceInUsd(balanceInUsd.toFixed(2));
        // setCourse(course);
      };
    } catch (error) {
      console.log("Error while getting course: ", error.message);
    }
  });

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

  const sendTokenToAddress = async () => {
    try {
      const amount = ethers.utils.parseEther(tnfTransferAmount);
      const tx = await tokenContract
        .connect(signer)
        .transfer(tnfAddressTo, amount, {
          gasLimit: 70000,
        });

      toast.warn(`Transaction pending... Hash:${tx.hash}`, {
        autoClose: 10000,
      });
      await tx.wait();

      toast.success(
        `Transaction successful: ${tnfTransferAmount} TNF sent to ${getShortAccount(
          tnfAddressTo
        )}`
      );

      setTransferTnfAmount("");
      setTnfAddressTo("");
      setManualFetchBalance(true);
    } catch (error) {
      toast.error("Error while transfer token :(");
      console.log({ error });
    }
  };

  const buyTokenForEth = async () => {
    try {
      const amount = ethers.utils.parseEther(tnfDepositAmount);
      const tx = await tokenContract.connect(signer).deposit({
        value: amount,
        gasLimit: 70000,
      });

      toast.warn(`Transaction pending... Hash:${tx.hash}`, {
        autoClose: 10000,
      });
      await tx.wait();

      toast.success(`Transaction successful: 
      bought ${tnfDepositAmount} TNF `);

      setTnfDepositAmount("");
      setManualFetchBalance(true);
    } catch (error) {
      toast.error(`Error while deposit token: ${error.message}`);
      console.log({ error });
    }
  };

  return (
    tokenContract && (
      <div className="flex flex-col justify-center items-center p-2 w-full">
        <div className="w-full sm:w-[20%] bg-gray-800 flex flex-col justify-center items-center rounded-md p-1 text-sm">
          <p className="mb-2 flex justify-center font-bold ">
            💰 Current balance
          </p>
          <p className="font-bold text-emerald-100">{balanceToken} TNF</p>
          <p className="my-2 text-emerald-100">
            {currentBalanceInUsd
              ? `  💵 ~ ${currentBalanceInUsd} $ `
              : "  💵 ...waiting course $"}
          </p>
        </div>

        <div className="flex md:flex-row flex-col">
          {/* <div className="container flex justify-between flex-col p-3 m-1">
            <p className="mb-2 flex flex-col justify-center text-xl font-bold items-center">
              Transfer
            </p>

            <div className="mx-2 w-full">
              <TailwindInput
                label="Address to"
                id="address_to"
                placeholder="0x1a1...aa1"
                onChange={(e) => setTnfAddressTo(e.target.value)}
              />
            </div>
            <div className="mx-2 w-full">
              <TailwindInput
                label="Amount"
                id="send_amount"
                placeholder="0.01"
                isNumbersOnly
                onChange={(e) => setTransferTnfAmount(e.target.value)}
              />
            </div>
            <button
              onClick={sendTokenToAddress}
              className="text-white bg-blue-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 self-center"
            >
              Send
            </button>
          </div> */}

          <div className="flex flex-col rounded-md mt-4 p-5 border border-gray-800 bg-gray-800">
            <div className=" mb-2 flex justify-center text-xl font-bold">
              Deposit
            </div>

            <div className="m-2 ">
              <TailwindInput
                label="Amount"
                id="deposit_amount"
                placeholder="0.01"
                isNumbersOnly
                onChange={(e) => setTnfDepositAmount(e.target.value)}
              />
            </div>
            <button
              onClick={buyTokenForEth}
              className="text-white bg-blue-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 self-center"
            >
              Buy
            </button>
          </div>

          {/* <div className="container flex flex-col p-1 m-1 justify-between">
            <div className=" mb-2 flex justify-center text-xl font-bold">
              Withdrawal
            </div>

            <div className="m-2">
              <TailwindInput
                label="Amount"
                id="withdrawal_amount"
                placeholder="0.01"
                isNumbersOnly
                onChange={(e) => setTnfAmount(e.target.value)}
              />
            </div>
            <button
              // onClick={buyTokenForEth}
              className="text-white bg-blue-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 self-center"
            >
              Sell
            </button>
          </div> */}
        </div>
      </div>
    )
  );
}

export default WithConnectedWallet(Exchange);

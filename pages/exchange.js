import React, { useEffect, useState } from "react";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";
import UseFullContext from "../lib/useFullContext";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import TailwindInput from "../components/SystemInterface/TailwindInput";
import { w3cwebsocket } from "websocket";
import Image from "next/image";
import { metamaskPaymentInstruction } from "../public";
import NewsRow from "../components/SystemInterface/NewsRow";
import axios from "axios";
import ImportTokenButton from "../components/ImportTokenButton";
import { getCourseEth } from "../lib/getCourseEth";
import { isNaN, isNumber } from "lodash";

function Exchange() {
  const { tokenContract, defaultAccount, signer, tokenSymbol } =
    UseFullContext();
  const [balanceToken, setBalanceToken] = useState(null);
  const [tokenDepositAmount, setTokenDepositAmount] = useState();
  const [usdDepositAmount, setUsdDepositAmount] = useState();
  const [usdWithdrawalAmount, setUsdWithdrawalAmount] = useState();

  // const [tnfTransferAmount, setTransferTnfAmount] = useState();
  // const [tnfAddressTo, setTnfAddressTo] = useState();
  const [tokenWithdrawalAmount, setTokenWithdrawalAmount] = useState();
  const [manualFetchBalance, setManualFetchBalance] = useState(false);
  const [currentBalanceInUsd, setCurrentBalanceInUsd] = useState(null);
  const [course, setCourse] = useState();

  useEffect(() => {
    const getCourse = async () => {
      const course = await getCourseEth();
      const balanceInUsd = balanceToken * course;
      setCourse(course);
      if (!isNaN(balanceInUsd)) setCurrentBalanceInUsd(balanceInUsd.toFixed(2));
    };

    getCourse();
  }, [balanceToken]);

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

  // const sendTokenToAddress = async () => {
  //   try {
  //     const amount = ethers.utils.parseEther(tnfTransferAmount);
  //     const tx = await tokenContract
  //       .connect(signer)
  //       .transfer(tnfAddressTo, amount, {
  //         gasLimit: 70000,
  //       });

  //     toast.warn(`Transaction pending... Hash:${tx.hash}`, {
  //       autoClose: 10000,
  //     });
  //     await tx.wait();

  //     toast.success(
  //       `Transaction successful: ${tnfTransferAmount} ${tokenSymbol} sent to ${getShortAccount(
  //         tnfAddressTo
  //       )}`
  //     );

  //     setTransferTnfAmount("");
  //     setTnfAddressTo("");
  //     setManualFetchBalance(true);
  //   } catch (error) {
  //     toast.error("Error while transfer token :(");
  //     console.log({ error });
  //   }
  // };

  const buyTokenForEth = async () => {
    try {
      const amount = ethers.utils.parseEther(String(tokenDepositAmount));

      if (tokenDepositAmount * course < 50) {
        toast.error("DEPOSIT MINIMUM ~50 $");
        return;
      }

      const tx = await tokenContract.connect(signer).deposit({
        value: amount,
        gasLimit: 70000,
      });

      try {
        await axios.post("/api/pay", {
          tokenDepositAmount,
          amount,
          tx,
          defaultAccount,
          status: "pending",
          type: "deposit",
        });
      } catch (error) {
        console.log({ error });
      }

      toast.warn(`Transaction pending... Hash:${tx.hash}`, {
        autoClose: 10000,
      });
      await tx.wait();

      toast.success(`Transaction successful: 
      bought ${tokenDepositAmount} ${tokenSymbol} `);

      setTokenDepositAmount("");
      setManualFetchBalance(true);

      await axios.post("/api/pay", {
        tokenDepositAmount,
        amount,
        tx,
        defaultAccount,
        status: "successful",
        type: "deposit",
      });
    } catch (error) {
      toast.error(`Error while deposit token: ${error.message}`);
      console.log({ error });
    }
  };

  const sellTokenForEth = async () => {
    try {
      const amount = ethers.utils.parseEther(tokenWithdrawalAmount);

      if (tokenWithdrawalAmount * course < 100) {
        toast.error("WITHDRAWAL MINIMUM ~100 $");
        return;
      }

      const minWithdrawalBig = await tokenContract
        .connect(signer)
        .checkMinWithdrawal();

      const minWithdrawal = parseInt(
        String(ethers.BigNumber.from(minWithdrawalBig))
      );

      if (minWithdrawal > amount) {
        toast.error("MINIMUM WITHDRAWAL " + minWithdrawal);
        return;
      }

      const tx = await tokenContract.connect(signer).withdrawUserETH(amount);

      try {
        await axios.post("/api/pay", {
          tokenWithdrawalAmount,
          amount,
          tx,
          defaultAccount,
          status: "pending",
          type: "sell",
        });
      } catch (error) {
        console.log({ error });
      }

      toast.warn(`Transaction pending... Hash:${tx.hash}`, {
        autoClose: 10000,
      });
      await tx.wait();

      toast.success(`Transaction successful: 
      sell ${tokenWithdrawalAmount} ${tokenSymbol} `);

      setTokenWithdrawalAmount("");
      setManualFetchBalance(true);

      try {
        await axios.post("/api/pay", {
          tokenWithdrawalAmount,
          amount,
          tx,
          defaultAccount,
          status: "successful",
          type: "sell",
        });
      } catch (error) {
        console.log({ error });
      }
    } catch (error) {
      toast.error(`Error while deposit token: ${error.message}`);
      console.log({ error });
    }
  };

  return (
    tokenContract && (
      <div className="flex flex-col h-full justify-center items-center rounded-md">
        <NewsRow />

        <div className="flex w-full h-full flex-col sm:flex-row my-5">
          <div className="flex justify-between items-center w-full h-full sm:h-[25%] sm:mr-4 bg-gray-800 rounded-md p-2  my-2 cursor-pointer">
            <div className="shadow-md">
              <Image
                width={250}
                height={150}
                className="rounded-xl"
                src={metamaskPaymentInstruction}
              />
            </div>

            <div className="flex flex-col ml-2 p-2 w-full h-full ">
              <div className="my-1 border-b border-gray-400  flex flex-col">
                How to add balance to start trading with AI
              </div>
              <div className="text-smxl hidden sm:flex flex-col">
                <div>1. Buy or send BNB tokens to your metamask wallet </div>
                <div>
                  2. Enter your amount to start trading to deposit field
                </div>
                <div>
                  3. Tap to buy button and accept operation in your metamask
                  window
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full sm:w-[50%]  flex sm:h-[25%] flex-col justify-center items-center rounded-md p-1 text-sm self-center">
            <div className="mb-2 flex justify-center font-bold uppercase bg-gray-800 p-2 rounded-lg">
              💰 Your bot balance :
            </div>
            <div className="font-bold text-emerald-100 flex">
              {balanceToken} &nbsp;
              <div className="text-purple-600">{tokenSymbol}</div>
            </div>
            <div className="my-2 text-emerald-100 flex justify-center items-center">
              {currentBalanceInUsd
                ? `  💵 ~ ${currentBalanceInUsd} $ `
                : "  💵 ...waiting course $"}
            </div>

            <ImportTokenButton />
          </div>
        </div>

        <div className="flex sm:flex-row flex-col justify-center items-center w-full h-full sm:w-[80%]  my-2">
          {/* <div className="flex flex-col justify-between rounded-md mt-2 min-h-[50%] p-5 bg-gray-800 w-full mx-5">
            <div className="mb-2 flex flex-col justify-center text-xl font-bold items-center">
              Transfer
            </div>

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

          <div className="flex flex-col justify-between rounded-md mt-2 min-h-[50%] p-5 bg-gray-800 w-full mx-5">
            <div className=" mb-2 flex justify-center text-xl font-bold">
              Deposit
            </div>

            <div className="m-2 ">
              <TailwindInput
                label="Amount (USD)"
                id="deposit_amount"
                placeholder="1000"
                isNumbersOnly
                value={usdDepositAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (isNaN(value)) {
                    setUsdDepositAmount("");
                    setTokenDepositAmount("");
                    return;
                  }

                  setUsdDepositAmount(e.target.value);
                  setTokenDepositAmount(e.target.value / course);
                }}
              />
              <TailwindInput
                label={"Amount " + tokenSymbol}
                id="deposit_amount"
                placeholder="0.01"
                isNumbersOnly
                value={tokenDepositAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (isNaN(value)) {
                    setUsdDepositAmount("");
                    setTokenDepositAmount("");
                    return;
                  }
                  setUsdDepositAmount(e.target.value * course);
                  setTokenDepositAmount(e.target.value);
                }}
              />
            </div>
            <button
              onClick={buyTokenForEth}
              className="text-white bg-blue-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 self-center"
            >
              Buy
            </button>
          </div>

          <div className="flex flex-col justify-between rounded-md mt-2 min-h-[50%] p-5 bg-gray-800 w-full mx-5">
            <div className=" mb-2 flex justify-center text-xl font-bold">
              Withdrawal
            </div>

            <div className="m-2">
              <TailwindInput
                label="Amount (USD)"
                id="withdrawal_usd_amount"
                placeholder="1000"
                isNumbersOnly
                value={usdWithdrawalAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (isNaN(value)) {
                    setUsdWithdrawalAmount("");
                    setTokenWithdrawalAmount("");
                    return;
                  }

                  setUsdWithdrawalAmount(e.target.value);
                  setTokenWithdrawalAmount(e.target.value / course);
                }}
              />

              <TailwindInput
                label="Amount"
                id="withdrawal_amount"
                placeholder="0.01"
                isNumbersOnly
                value={tokenWithdrawalAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (isNaN(value)) {
                    setUsdWithdrawalAmount("");
                    setTokenWithdrawalAmount("");
                    return;
                  }

                  setUsdWithdrawalAmount(e.target.value * course);
                  setTokenWithdrawalAmount(e.target.value);
                }}
              />
            </div>
            <button
              // onClick={buyTokenForEth}
              className="text-white bg-blue-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-[80%] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 self-center"
              onClick={async () => await sellTokenForEth()}
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default WithConnectedWallet(Exchange);

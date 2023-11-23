import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { metamaskPaymentInstruction } from "../public";
import { getCourseEth } from "../lib/getCourseEth";
import { isNaN } from "lodash";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";
import UseFullContext from "../lib/useFullContext";
import TailwindInput from "../components/SystemInterface/TailwindInput";
import Image from "next/image";
import NewsRow from "../components/SystemInterface/NewsRow";
import axios from "axios";
import ImportTokenButton from "../components/ImportTokenButton";
import Link from "next/link";

function Exchange() {
  const { tokenContract, defaultAccount, signer, tokenSymbol } =
    UseFullContext();

  const [balanceToken, setBalanceToken] = useState(null);
  // deposit
  const [tokenDepositAmount, setTokenDepositAmount] = useState();
  const [usdDepositAmount, setUsdDepositAmount] = useState();

  // withdrawal
  const [usdWithdrawalAmount, setUsdWithdrawalAmount] = useState();
  const [tokenWithdrawalAmount, setTokenWithdrawalAmount] = useState();

  // transfer
  const [tokenTransferAmount, setTransferTokenAmount] = useState();
  const [addressTo, setAddressTo] = useState();

  // balances
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

  const sendTokenToAddress = async () => {
    try {
      const amount = ethers.utils.parseEther(tokenTransferAmount);
      const tx = await tokenContract
        .connect(signer)
        .transfer(addressTo, amount, {
          gasLimit: 70000,
        });

      toast.warn(`Transaction pending... Hash:${tx.hash}`, {
        autoClose: 10000,
      });
      await tx.wait();

      toast.success(
        `Transaction successful: ${tokenTransferAmount} ${tokenSymbol} sent to ${getShortAccount(
          addressTo
        )}`
      );

      setTransferTokenAmount("");
      setAddressTo("");
      setManualFetchBalance(true);
    } catch (error) {
      toast.error("Error while transfer token :(");
      console.log({ error });
    }
  };

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
      const amount = ethers.utils.parseEther(String(tokenWithdrawalAmount));

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
      <div className="flex flex-col h-full justify-between items-center rounded-md w-full sm:w-[80%]">
        <NewsRow />

        <div className="flex w-full h-full flex-col sm:flex-row justify-center items-center my-2 sm:w-[70%]">
          <div className="w-full sm:w-3/5 h-full bg-gray-800 flex flex-col justify-center items-center rounded-md px-4 m-2 text-sm">
            <div className="mb-2 flex justify-center font-bold uppercase bg-gray-800 p-2 rounded-lg">
              💰 Your bot balance :
            </div>
            <div className="font-bold text-emerald-500 flex">
              {balanceToken} &nbsp;
              <div className="text-purple-600">{tokenSymbol}</div>
            </div>
            <div className="my-2 text-emerald-500 flex justify-center items-center">
              {currentBalanceInUsd
                ? `  💵 ~ ${currentBalanceInUsd} $ `
                : "  💵 ...waiting course $"}
            </div>

            <div className="my-2">
              <ImportTokenButton />
            </div>
          </div>

          <Link
            href={"/tutorial-payment"}
            className="flex w-full h-full justify-center items-center  bg-gray-800 rounded-md px-4 m-2 cursor-pointer"
          >
            <div className="shadow-md">
              <Image
                width={250}
                height={150}
                className="rounded-xl"
                src={metamaskPaymentInstruction}
              />
            </div>

            <div className="flex flex-col justify-center ml-2 p-2 w-full h-full ">
              <div className="my-1 border-b flex flex-col">
                Instruction how to do payments 🎓
              </div>
              <div className="text-smxl hidden sm:flex flex-col">
                <div>1. Buy or send BNB tokens to your metamask wallet </div>
                <div>2. Enter your amount to deposit field</div>
                <div>
                  3. Tap to buy button and accept operation in your metamask
                  window
                </div>
                <div className="mt-4 underline">
                  Tap on instruction to see more details
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex sm:flex-row flex-col justify-between items-center w-full sm:w-[70%] h-full">
          {/* <div className="flex flex-col justify-between rounded-md mt-2 min-h-[50%] p-5 bg-gray-800 w-full mx-3">
            <div className="mb-2 flex flex-col justify-center text-xl font-bold items-center">
              Transfer
            </div>

            <div className="mx-2 w-full">
              <TailwindInput
                label="Address to"
                id="address_to"
                placeholder="0x1a1...aa1"
                onChange={(e) => setAddressTo(e.target.value)}
              />
            </div>

            <div className="mx-2 w-full">
              <TailwindInput
                label="Amount"
                id="send_amount"
                placeholder="0.01"
                isNumbersOnly
                onChange={(e) => {
                  setTransferTokenAmount(e.target.value);
                }}
              />
            </div>

            <button
              onClick={sendTokenToAddress}
              className="text-white bg-blue-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 self-center"
            >
              Send
            </button>
          </div> */}

          <div className="flex flex-col justify-between rounded-md mt-2 min-h-[50%] p-5 bg-gray-800 w-full mx-2">
            <div className=" mb-2 flex justify-center text-xl font-bold">
              💰⤵️ Deposit
            </div>

            <div className="m-2 ">
              <TailwindInput
                label="Amount USD"
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
              className="text-white  bg-blue-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-[80%] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 self-center"
            >
              Buy
            </button>
          </div>

          <div className="flex flex-col justify-between rounded-md mt-2 min-h-[50%] p-5 bg-gray-800 w-full mx-2">
            <div className=" mb-2 flex justify-center text-xl font-bold">
              💰⤴️ Withdrawal
            </div>

            <div className="m-2">
              <TailwindInput
                label="Amount USD"
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
                label={"Amount " + tokenSymbol}
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

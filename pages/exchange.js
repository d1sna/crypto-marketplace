import React, { useEffect, useState } from "react";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";
import UseFullContext from "../lib/useFullContext";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import TailwindInput from "../components/SystemInterface/TailwindInput";

function Exchange() {
  const { tokenContract, defaultAccount, signer } = UseFullContext();

  const [balanceToken, setBalanceToken] = useState(null);
  const [tnfAmount, setTnfAmount] = useState();
  const [tnfAddressTo, setTnfAddressTo] = useState();
  const [pending, setPending] = useState(false);

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
  }, [defaultAccount, tokenContract]);

  const sendTokenToAddress = async () => {
    setPending(true);

    try {
      const amount = ethers.utils.parseEther(tnfAmount);
      const tx = await tokenContract
        .connect(signer)
        .transfer(tnfAddressTo, amount, {
          gasLimit: 70000,
        });

      toast.warn(`Transaction pending... Hash:${tx.hash}`);
      await tx.wait();

      toast.success(`Transaction successful: 
      type : send
      amount : ${tnfAmount} TNF `);

      setTnfAmount("");
      setTnfAddressTo("");
    } catch (error) {
      console.log({ error });
      toast.error("Error while transfer token :(");
    }

    setPending(false);
  };

  const buyTokenForEth = async () => {
    setPending(true);

    try {
      const amount = ethers.utils.parseEther(tnfAmount);
      const tx = await tokenContract.connect(signer).deposit({
        value: amount,
        gasLimit: 70000,
      });

      toast.warn(`Transaction pending... Hash:${tx.hash}`, {
        autoClose: 5000 * 100,
      });
      await tx.wait();

      toast.success(`Transaction successful: 
      type : buy
      amount : ${tnfAmount} TNF `);

      setTnfAmount("");
    } catch (error) {
      console.log({ error });
      toast.error("Error while deposit token :(");
    }

    setPending(false);
  };

  return (
    tokenContract && (
      <div className="flex items-center justify-center flex-col p-2 h-full">
        <div className="flex justify-center flex-col items-center mb-3">
          <p className=" mb-2 flex justify-center text-xl font-bold ">
            Your balance
          </p>
          <p className=" font-bold border-b-2 border-red-400">
            {balanceToken} TNF
          </p>
        </div>

        <div className="flex md:flex-row flex-col">
          <div className="container flex justify-around flex-col p-3 m-1">
            <p className="mb-2 flex flex-col justify-center text-xl font-bold items-center">
              Transfer
            </p>

            <div className=" mb-3 flex justify-center items-center flex-col">
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
                  onChange={(e) => setTnfAmount(e.target.value)}
                />
              </div>
              <button
                onClick={sendTokenToAddress}
                class="text-white bg-blue-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 self-center"
              >
                Send
              </button>
            </div>
          </div>

          <div className="container flex flex-col p-1 m-1 justify-between">
            <div className=" mb-2 flex justify-center text-xl font-bold">
              Deposit
            </div>

            <div className="m-2">
              <TailwindInput
                label="Amount"
                id="deposit_amount"
                placeholder="0.01"
                onChange={(e) => setTnfAmount(e.target.value)}
              />
            </div>
            <button
              onClick={buyTokenForEth}
              class="text-white bg-blue-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 self-center"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default WithConnectedWallet(Exchange);

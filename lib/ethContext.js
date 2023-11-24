import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import tokenAbi from "./abi/erc20.abi.json";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

export const EthContext = React.createContext();

const formatEther = (eth) => ethers.utils.formatEther(eth);

export function EthProvider({ children }) {
  const [ethContext, setEthContext] = useState({});
  const [startConnectMetamask, setStartConnectMetamask] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setEthContext({
      startConnectMetamask: () => setStartConnectMetamask(true),
    });
  }, []);

  useEffect(() => {
    const getBalance = async (address) => {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      const formattedBalance = formatEther(balance);
      setEthContext({ ...ethContext, currentBalance: formattedBalance });
      return formattedBalance;
    };

    const getAccounts = async () => {
      return window.ethereum.request({ method: "eth_requestAccounts" });
    };

    const checkAndConnectWallet = async () => {
      try {
        if (window?.ethereum) {
          const accounts = await getAccounts();
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          if (accounts.length) {
            const currentBalance = await getBalance(accounts[0]);
            const signer = provider.getSigner();

            const tokenAddress = "0x221dA23e8F491C0c3E51bc4809c9310e8B5ca0e9";
            let tokenContract;
            let tokenSymbol;
            try {
              tokenContract = new ethers.Contract(
                tokenAddress,
                tokenAbi,
                signer
              );

              tokenSymbol = await tokenContract.symbol();
            } catch (error) {}

            try {
              await axios.post("/api/login", {
                currentBalance,
                defaultAccount: accounts[0],
                accounts,
              });
            } catch (error) {
              console.log({ error });
            }

            setEthContext({
              currentBalance,
              defaultAccount: accounts[0],
              accounts,
              getAccounts,
              tokenContract,
              signer,
              provider,
              getBalance,
              formatEther,
              tokenSymbol,
            });
          }
        }

        throw new Error("Metamask not found");
      } catch (error) {
        console.log({ error });
        if (error.code === -32002) {
          toast.error("Submit access to wallet in metamask");
        }
      }
    };

    if (startConnectMetamask) {
      checkAndConnectWallet();
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", checkAndConnectWallet);

      window.ethereum.on("chainChanged", checkAndConnectWallet);
    }

    setStartConnectMetamask(false);

    return () => {
      window.ethereum?.removeListener("accountsChanged", checkAndConnectWallet);
      window.ethereum?.removeListener("chainChanged", checkAndConnectWallet);
    };
  }, [startConnectMetamask]);

  EthProvider.propTypes = {
    children: PropTypes.array.isRequired,
  };

  return (
    <EthContext.Provider value={ethContext}>{children}</EthContext.Provider>
  );
}

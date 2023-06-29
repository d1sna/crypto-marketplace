import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import MetaMaskOnboarding from "@metamask/onboarding";
import tokenAbi from "./abi/erc20.abi.json";

export const EthContext = React.createContext();

const formatEther = (eth) => ethers.utils.formatEther(eth);

export function EthProvider({ children }) {
  const [ethContext, setEthContext] = useState({});
  const router = useRouter();

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
      const onboard = new MetaMaskOnboarding();

      if (window?.ethereum) {
        const accounts = await getAccounts();
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        if (accounts.length) {
          const balance = await getBalance(accounts[0]);
          const signer = provider.getSigner();
          const tokenContract = new ethers.Contract(
            "0x31A61ea11157E8F28baB913AB6eA6EdDeCd67307",
            tokenAbi,
            signer
          );

          setEthContext({
            currentBalance: balance,
            defaultAccount: accounts[0],
            getAccounts,
            tokenContract,
            signer,
            provider,
            getBalance,
            formatEther,
          });
        }
      } else if (onboard) {
        onboard.startOnboarding();
      }
    };

    if (window?.ethereum && router.asPath !== "/login") {
      checkAndConnectWallet();

      window.ethereum.on("accountsChanged", () => {
        setEthContext({
          ...EthContext,
          defaultAccount: null,
          currentBalance: null,
        });
      });
    } else setEthContext({ checkAndConnectWallet });
  }, [router]);

  EthProvider.propTypes = {
    children: PropTypes.shape().isRequired,
  };

  return (
    <EthContext.Provider value={ethContext}>{children}</EthContext.Provider>
  );
}

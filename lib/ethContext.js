import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import MetaMaskOnboarding from "@metamask/onboarding";

export const EthContext = React.createContext();

export function EthProvider({ children }) {
  const [ethContext, setEthContext] = useState({});
  const router = useRouter();

  useEffect(() => {
    const getBalance = async (address) => {
      return window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
    };

    const getAccounts = async () => {
      return window.ethereum.request({ method: "eth_requestAccounts" });
    };

    const checkAndConnectWallet = async () => {
      const onboard = new MetaMaskOnboarding();

      if (window?.ethereum) {
        const accounts = await getAccounts();

        if (accounts.length) {
          const balance = await getBalance(accounts[0]);
          setEthContext({
            defaultAccount: accounts[0],
            currentBalance: ethers.utils.formatEther(balance),
            getAccounts,
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

import React, { useEffect, useState } from "react";
import UseFullContext from "../lib/useFullContext";

const SwitchChainButton = () => {
  const handleSwitchChain = async () => {
    try {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x38", // Идентификатор целевой сети Binance Smart Chain
            chainName: "Binance Smart Chain", // Название сети
            nativeCurrency: {
              name: "BNB", // Название местной валюты
              symbol: "BNB", // Символ местной валюты
              decimals: 18,
            },
            rpcUrls: ["https://bsc-dataseed.binance.org/"], // URL-адреса RPC для сети BNB
            blockExplorerUrls: ["https://bscscan.com/"], // URL-адреса блок-эксплорера для сети BNB
          },
        ],
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <button
      onClick={handleSwitchChain}
      className="bg-purple-500 rounded-md p-2 cursor-pointer"
    >
      SWITCH CHAIN TO BNB
    </button>
  );
};

export default SwitchChainButton;

import React, { useEffect, useState } from "react";
import UseFullContext from "../lib/useFullContext";

const ImportTokenButton = () => {
  const { tokenContract } = UseFullContext();
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    const getSymbol = async () => {
      if (tokenContract) setSymbol(await tokenContract.symbol());
    };

    getSymbol();
  }, [tokenContract]);

  const handleImportToken = async () => {
    try {
      const address = tokenContract.address;
      const decimals = await tokenContract.decimals();
      console.log({ address, symbol, decimals });

      await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address, // The address that the token is at.
            symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals, // The number of decimals in the token
            //   image: tokenImage, // A string url of the token logo
          },
        },
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <button
      onClick={handleImportToken}
      className="bg-purple-500 rounded-md p-2 cursor-pointer"
    >
      Add {symbol} token to MetaMask
    </button>
  );
};

export default ImportTokenButton;

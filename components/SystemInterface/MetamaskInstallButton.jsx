import { Button } from "@mui/material";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { metaMaskLogo } from "../../public";
import UseFullContext from "../../lib/useFullContext";

function MetamaskInstallButton() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const { startConnectMetamask, defaultAccount } = UseFullContext();

  useEffect(() => {
    if (window?.ethereum) {
      setIsWalletInstalled(true);
      return;
    }

    setIsWalletInstalled(false);
  }, []);

  if (!isWalletInstalled)
    return (
      <a target="_blank" href="https://metamask.io/download/" rel="noreferrer">
        <Button className="hover:bg-red-400">
          <Image
            alt=""
            style={{
              width: "120px",
              height: "30px",
              padding: "5px",
              objectFit: "cover",
            }}
            src={metaMaskLogo}
          />
        </Button>
      </a>
    );

  if (!defaultAccount)
    return (
      <Button className="hover:bg-red-400" onClick={startConnectMetamask}>
        <Image
          alt=""
          style={{
            width: "120px",
            height: "30px",
            padding: "5px",
            objectFit: "cover",
          }}
          src={metaMaskLogo}
        />
      </Button>
    );

  return <div className="hidden"></div>;
}

export default MetamaskInstallButton;

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { metaMaskLogo } from "../../public";
import UseFullContext from "../../lib/useFullContext";
import { isFunction } from "lodash";
import { toast } from "react-toastify";
import { getShortAccount } from "../../lib/getShortAccount";

function MetamaskInstallButton() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const { startConnectMetamask, defaultAccount } = UseFullContext();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (window?.ethereum) {
      setIsWalletInstalled(true);
      return;
    }

    setIsWalletInstalled(false);
  }, []);

  useEffect(() => {
    if (!loggedIn && !defaultAccount && isFunction(startConnectMetamask)) {
      startConnectMetamask();
      return;
    }

    setLoggedIn(!!defaultAccount);
    if (!!defaultAccount)
      toast.success(`Welcome back, ${getShortAccount(defaultAccount)}!`);
  }, [defaultAccount, startConnectMetamask]);

  if (!isWalletInstalled)
    return (
      <a target="_blank" href="https://metamask.io/download/" rel="noreferrer">
        <div className="hover:bg-red-400 bg-indigo-200 my-2 rounded-xl">
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
        </div>
      </a>
    );

  if (!loggedIn)
    return (
      <div
        className="hover:bg-red-400 bg-indigo-200"
        onClick={startConnectMetamask}
      >
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
      </div>
    );

  return null;
}

export default MetamaskInstallButton;

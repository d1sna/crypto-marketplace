import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import UseFullContext from "../../lib/useFullContext";

function WithConnectedWallet(Component) {
  return function Wrap() {
    const { defaultAccount } = UseFullContext();
    const router = useRouter();

    useEffect(() => {
      if (!defaultAccount) Router.push("/login");
      if (router.asPath === "/login" && defaultAccount) Router.push("/");
    }, [defaultAccount, router.asPath]);

    return <Component />;
  };
}

export default WithConnectedWallet;

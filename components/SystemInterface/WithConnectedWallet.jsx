import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import UseFullContext from "../../lib/useFullContext";
import { toast } from "react-toastify";

function WithConnectedWallet(Component) {
  return function Wrap() {
    const { defaultAccount, signer } = UseFullContext();
    const router = useRouter();

    useEffect(() => {
      if (signer?.provider._network?.name !== "bnb") {
        toast.error(
          "PLEASE CHOOSE BNB NETWORK IN YOUR METAMASK WALLET FOR ACCESS TO APPLICATION"
        );
        router.push("/network-error");
        return;
      }

      if (!defaultAccount && router.asPath !== "/") Router.push("/");
    }, [defaultAccount, router.asPath]);

    return <Component />;
  };
}

export default WithConnectedWallet;

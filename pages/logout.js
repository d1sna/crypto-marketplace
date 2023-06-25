import Router from "next/router";
import React from "react";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";
import UseFullContext from "../lib/useFullContext";

function Logout() {
  const { updateUserContext } = UseFullContext();
  updateUserContext({ token: "" });
  Router.push("/");

  return <div />;
}

export default WithConnectedWallet(Logout);

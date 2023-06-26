import { Box } from "@mui/material";
import React from "react";
// import AppCard from "../components/AppCard";
import WalletInfo from "../components/SystemInterface/WalletInfo";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";
// import { casinoIcon } from "../public";

function Home() {
  return <WalletInfo full />;
}

export default WithConnectedWallet(Home);

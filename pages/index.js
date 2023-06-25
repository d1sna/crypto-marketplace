import { Box } from "@mui/material";
import React from "react";
// import AppCard from "../components/AppCard";
import WalletInfo from "../components/SystemInterface/WalletInfo";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";
// import { casinoIcon } from "../public";

function Home() {
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <WalletInfo full />
      </Box>
      {/* <div className="container" style={{ padding: "15px", marginTop: "5vh" }}>
        Recently opened
      </div> */}
      {/* <h2 style={{ margin: "15px" }}>APPS</h2> */}
      {/* <Box style={{ display: "flex", margin: "10px" }}>
        <AppCard icon={casinoIcon} name="Casino Spin" link="/apps/casino-spin" />
      </Box> */}
    </Box>
  );
}

export default WithConnectedWallet(Home);

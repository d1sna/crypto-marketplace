import React from "react";
import { Button } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";

function Payments() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Button
        onClick={() => {
          Router.push("/payments/metamask");
        }}
        className="container"
        style={{ color: "black" }}
      >
        Metamask
      </Button>
      <Button className="container" style={{ color: "black" }}>
        Card
      </Button>
    </div>
  );
}

export default WithConnectedWallet(Payments);

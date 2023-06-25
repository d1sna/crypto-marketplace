import { Box, Button } from "@mui/material";
import Router from "next/router";

import React, { useEffect, useState } from "react";

export default function Auth() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  useEffect(() => {
    if (window?.ethereum) {
      setIsWalletInstalled(true);
      return;
    }

    setIsWalletInstalled(false);
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
        width: "100%",
        height: "85%",
      }}
    >
      {isWalletInstalled ? (
        <Button
          onClick={async () => {
            Router.push("/");
          }}
          style={{
            textDecoration: "none",
            border: "0.0px solid grey",
            borderRadius: "15px",
            filter: "blur(0.3px)",
            boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
            padding: "10px",
            backgroundColor: "#e62739",
            opacity: "0.7",
            color: "white",
          }}
        >
          Sign in
        </Button>
      ) : (
        <Button
          style={{
            textDecoration: "none",
            border: "0.0px solid grey",
            borderRadius: "15px",
            filter: "blur(0.3px)",
            boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
            padding: "10px",
            backgroundColor: "#e62739",
            opacity: "0.7",
            color: "white",
          }}
        >
          <a target="_blank" href="https://metamask.io/download/" rel="noreferrer">
            Install MetaMask
          </a>
        </Button>
      )}
    </Box>
  );
}

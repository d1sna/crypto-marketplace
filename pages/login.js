import { Box, Button, CircularProgress } from "@mui/material";
import { isFunction } from "lodash";

import Router from "next/router";

import React, { useEffect, useState } from "react";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";

import UseFullContext from "../lib/useFullContext";
import Image from "next/image";
import { metaMaskLogo } from "../public";

function Login() {
  const [hovered, setHovered] = useState(false);
  const { checkAndConnectWallet } = UseFullContext();
  // const [ethereum, setEthereum] = useState(null);

  // useEffect(() => {
  //   setEthereum(window.ethereum);
  // }, []);

  // if (!ethereum)
  //   return (
  //     <Box>
  //       <Button
  //         style={{
  //           textDecoration: "none",
  //           border: "0.0px solid grey",
  //           borderRadius: "15px",
  //           filter: "blur(0.3px)",
  //           boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
  //           padding: "10px",
  //           backgroundColor: "#e62739",
  //           opacity: "0.7",
  //           color: "white",
  //         }}
  //       >
  //         <a target="_blank" href="https://metamask.io/download/" rel="noreferrer">
  //           Install MetaMask
  //         </a>
  //       </Button>
  //     </Box>
  //   );

  return (
    // <Box
    //   className="container"
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "end",
    //     alignItems: "center",
    //     width: "100%",
    //     height: "85%",
    //   }}
    // >
    isFunction(checkAndConnectWallet) ? (
      <Button
        onClick={async () => {
          await checkAndConnectWallet();
          Router.push("/");
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          textDecoration: "none",
          border: "0.0px solid grey",
          borderRadius: "15px",
          filter: "blur(0.3px)",
          boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
          padding: "10px",
          backgroundColor: hovered ? "#e62739" : "",
          color: "white",
        }}
      >
        <Image
          style={{
            width: "120px",
            height: "30px",
            padding: "5px",
            objectFit: "cover",
          }}
          src={metaMaskLogo}
        />
      </Button>
    ) : (
      <CircularProgress />
    )
    // </Box>
  );
}

export default WithConnectedWallet(Login);

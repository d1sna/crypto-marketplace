import { CircularProgress } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

import UseFullContext from "../../lib/useFullContext";
import { getShortAccount } from "../../lib/getShortAccount";

export default function WalletInfo({ full }) {
  const context = UseFullContext();
  const { defaultAccount, currentBalance } = context;

  if (!defaultAccount) return <CircularProgress />;

  if (full)
    return (
      <div
        style={{
          textDecoration: "none",
          border: "0.0px solid grey",
          borderRadius: "15px",
          boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
          padding: "10px",
          fontSize: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <b style={{ marginTop: "5px" }}>Account:</b>
        <p>{defaultAccount}</p>

        <b style={{ marginTop: "5px" }}>Balance:</b>
        <p>{currentBalance} ETH</p>
      </div>
    );

  return (
    <div
      style={{
        textDecoration: "none",
        borderRadius: "15px",
        boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
        padding: "10px",
        fontSize: "10px",
        height: "6vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        filter: "blur(0.3px)",
        opacity: "0.8",
      }}
    >
      <div>
        <b>Account:</b> {getShortAccount(defaultAccount)}
      </div>
      <div>
        <b>Balance:</b> {currentBalance.slice(0, 5)} ETH
      </div>
    </div>
  );
}

WalletInfo.propTypes = { full: PropTypes.bool.isRequired };

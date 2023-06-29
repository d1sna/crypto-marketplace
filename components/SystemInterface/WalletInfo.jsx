import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { w3cwebsocket } from "websocket";

import UseFullContext from "../../lib/useFullContext";
import { getShortAccount } from "../../lib/getShortAccount";

export default function WalletInfo({ full }) {
  const context = UseFullContext();
  const { defaultAccount, currentBalance } = context;

  const [currentBalanceInUsd, setCurrentBalanceInUsd] = useState();
  const [course, setCourse] = useState("--");

  if (!defaultAccount) return <CircularProgress />;

  useEffect(() => {
    try {
      const ws = new w3cwebsocket(
        "wss://stream.binance.com:9443/ws/ethusdt@trade"
      );

      ws.onmessage = ({ data }) => {
        const course = Number(JSON.parse(data).p);
        const balanceInUsd = currentBalance * course;
        setCurrentBalanceInUsd(String(balanceInUsd).split(".")[0]);
        setCourse(course);
      };
    } catch (error) {
      console.log("Error while getting course: ", error.message);
    }
  });

  if (full)
    return (
      <div
        style={{
          textDecoration: "none",
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
        <p>
          {currentBalance} ETH
          {currentBalanceInUsd && ` / ~$${currentBalanceInUsd}`}
        </p>

        <b style={{ marginTop: "5px" }}>Current course ETH:</b>
        <p> {course} USDT</p>
      </div>
    );

  return (
    <div
      className="border-2 border-gray-500 rounded-md shadow-md bg-gray-200 p-2 text-sm flex flex-col items-center justify-center"
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
      }}
    >
      <div>
        <b>Account:</b> {getShortAccount(defaultAccount)}
      </div>
      <div>
        <b>Balance:</b> {currentBalance.slice(0, 5)} ETH
        {currentBalanceInUsd && ` / ~$${currentBalanceInUsd}`}
      </div>
    </div>
  );
}

WalletInfo.propTypes = { full: PropTypes.bool.isRequired };

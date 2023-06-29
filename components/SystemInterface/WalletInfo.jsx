import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// import { w3cwebsocket } from "websocket";

import UseFullContext from "../../lib/useFullContext";
import { getShortAccount } from "../../lib/getShortAccount";

export default function WalletInfo({ full, className }) {
  const context = UseFullContext();
  const { defaultAccount, currentBalance = "--" } = context;

  const [currentBalanceInUsd, setCurrentBalanceInUsd] = useState();
  const [course, setCourse] = useState("--");

  if (!defaultAccount) return <CircularProgress />;

  useEffect(() => {
    // try {
    //   const ws = new w3cwebsocket(
    //     "wss://stream.binance.com:9443/ws/ethusdt@trade"
    //   );
    //   ws.onmessage = ({ data }) => {
    //     const course = Number(JSON.parse(data).p);
    //     const balanceInUsd = currentBalance * course;
    //     setCurrentBalanceInUsd(String(balanceInUsd).split(".")[0]);
    //     setCourse(course);
    //   };
    // } catch (error) {
    //   console.log("Error while getting course: ", error.message);
    // }
  });

  if (full)
    return (
      <div
        className="flex flex-col justify-center items-center border-0 rounded-xl text-sm"
        style={{ boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
      >
        <b className="mt-1">Account:</b>
        <p>{defaultAccount}</p>

        <b className="mt-1">Balance:</b>
        <p>
          {currentBalance} ETH
          {currentBalanceInUsd && ` / ~$${currentBalanceInUsd}`}
        </p>

        <b className="mt-1">Current course ETH:</b>
        <p> {course} USDT</p>
      </div>
    );

  return (
    <div
      className={`border-0 rounded-xl p-2 text-sm flex flex-col items-center justify-center ${className}`}
      // style={{ boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
    >
      <p className="text-center">
        <b>Account:</b> {getShortAccount(defaultAccount)}
      </p>
      <p className="text-center">
        <b>Balance:</b> {currentBalance.slice(0, 5)} ETH
        {currentBalanceInUsd && ` / ~$${currentBalanceInUsd}`}
      </p>
    </div>
  );
}

WalletInfo.propTypes = { full: PropTypes.bool.isRequired };

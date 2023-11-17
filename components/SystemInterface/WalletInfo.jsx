import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { w3cwebsocket } from "websocket";

import UseFullContext from "../../lib/useFullContext";
import { getShortAccount } from "../../lib/getShortAccount";

export default function WalletInfo({ full, className }) {
  const context = UseFullContext();
  const { defaultAccount, currentBalance = "--" } = context;

  const [currentBalanceInUsd, setCurrentBalanceInUsd] = useState();
  const [course, setCourse] = useState("⌛ ...waiting course");

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
        className="flex flex-col ml-4 border-0 rounded-xl text-sm"
        style={{ boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
      >
        <b className="mt-1 border-b border-gray-800">Address:</b>
        <div>{defaultAccount}</div>

        <b className="mt-1 border-b border-gray-800">Balance:</b>
        <div>
          {currentBalance} ETH
          {currentBalanceInUsd && ` / ~$${currentBalanceInUsd}`}
        </div>

        <b className="mt-1 border-b border-gray-800">Current course ETH:</b>
        <div> {course} USDT</div>
      </div>
    );

  return (
    <div
      className={`text-xs flex flex-col items-center justify-center mr-2 ${className}`}
      // style={{ boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
    >
      <div className="text-center text-xs">
        {/* <b>Account:</b>  */}
        {getShortAccount(defaultAccount)}
      </div>
      <div className="text-center text-smxl">
        {currentBalance.slice(0, 5)} ETH
        {/* <div>{currentBalanceInUsd && ` / ~$${currentBalanceInUsd}`}</div> */}
      </div>
    </div>
  );
}

WalletInfo.propTypes = { full: PropTypes.bool.isRequired };

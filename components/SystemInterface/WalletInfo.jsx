import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import UseFullContext from "../../lib/useFullContext";
import { getShortAccount } from "../../lib/getShortAccount";
import { getCourseEth } from "../../lib/getCourseEth";

export default function WalletInfo({ full, className }) {
  const context = UseFullContext();
  const { defaultAccount, currentBalance = "--" } = context;

  const [currentBalanceInUsd, setCurrentBalanceInUsd] = useState();
  const [course, setCourse] = useState("⌛ ...waiting course");

  useEffect(() => {
    const getCourse = async () => {
      const res = await getCourseEth();
      setCourse(res);
      setCurrentBalanceInUsd((currentBalance * res).toFixed(2));
    };

    getCourse();
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
          {currentBalance} BNB
          {currentBalanceInUsd && ` / ~$${currentBalanceInUsd}`}
        </div>

        <b className="mt-1 border-b border-gray-800">Current course BNB:</b>
        <div> {course} USD</div>
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
        {currentBalance.slice(0, 5)} BNB
      </div>
    </div>
  );
}

WalletInfo.propTypes = { full: PropTypes.bool.isRequired };

import React, { useEffect, useState } from "react";
import Link from "next/link";

import Image from "next/image";
import UseFullContext from "../../lib/useFullContext";
import NavBarElement from "./NavBarElement";
import WalletInfo from "./WalletInfo";

import EthIcon from "../../public/ethereum.png";
import { Button } from "@mui/material";

export default function Navbar() {
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const [isWalletFull, setIsWalletFull] = useState(false);

  const { defaultAccount, checkAndConnectWallet } = UseFullContext();

  return (
    <nav className="flex justify-between items-center m-1 px-3 pb-1 w-full border-b-2 border-purple-400 z-50">
      <Link href="/">
        <div className="ml-2 p-3 flex justify-center items-center">
          <Image
            alt=""
            style={{ marginRight: "10px" }}
            height={27}
            width={27}
            src={EthIcon}
          />
          <h4 className="hidden sm:flex text-purple-500 text-xl">WEB 3.0</h4>
        </div>
      </Link>

      {defaultAccount && (
        <div className="sm:flex hidden">
          <NavBarElement elementName="main" link="/" />
          <NavBarElement elementName="exchange" link="/exchange" />
        </div>
      )}

      {defaultAccount ? (
        <div
          className="flex items-center justify-center text-sm mr-3"
          // onClick={() => setIsWalletFull(!isWalletFull)}
        >
          <WalletInfo className=" text-xs" full={isWalletFull} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            />
          </svg>
        </div>
      ) : (
        <Link href="/">
          <button className="text-white bg-blue-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 self-center">
            Login
          </button>
        </Link>
      )}

      {defaultAccount && (
        <div className="sm:hidden">
          {/* <Link href="/">
            <Button className="text-black text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Button>
          </Link> */}
        </div>
      )}
    </nav>
  );
}

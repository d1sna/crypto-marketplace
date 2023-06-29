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

  const { defaultAccount } = UseFullContext();

  return (
    defaultAccount && (
      <nav className="flex justify-between items-center m-3 rounded-2xl w-full">
        <Link
          href="/"
          onClick={() => {
            setIsMenuBarOpen(false);
          }}
        >
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

        <div className="sm:flex hidden">
          <NavBarElement
            setIsMenuBarOpen={setIsMenuBarOpen}
            elementName="main"
            link="/"
          />
          <NavBarElement
            setIsMenuBarOpen={setIsMenuBarOpen}
            elementName="exchange"
            link="/exchange"
          />
        </div>

        <div
          className="flex items-center justify-center text-sm mr-3"
          // onClick={() => setIsWalletFull(!isWalletFull)}
        >
          <WalletInfo full={isWalletFull} />
        </div>

        <div className="sm:hidden">
          <Link href="/">
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
          </Link>
        </div>
      </nav>
    )
  );
}

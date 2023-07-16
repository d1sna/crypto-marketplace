import React from "react";
import Link from "next/link";

import Image from "next/image";
import UseFullContext from "../../lib/useFullContext";
import NavBarElement from "./NavBarElement";
import WalletInfo from "./WalletInfo";

import EthIcon from "../../public/ethereum.png";
import MetamaskInstallButton from "./MetamaskInstallButton";
import { Button } from "@mui/material";

export default function Navbar() {
  const { defaultAccount } = UseFullContext();

  return (
    <nav className="flex flex-row justify-between items-center w-full border-b-2 border-purple-400 z-50 my-1">
      <div className="flex">
        <Link href="/">
          <div className="flex items-center justify-center">
            <Image
              alt=""
              style={{ marginRight: "10px" }}
              height={27}
              width={27}
              src={EthIcon}
            />
            <h4 className="hidden sm:flex text-purple-400 text-xl">WEB 3.0</h4>
          </div>
        </Link>
      </div>
      {/* {defaultAccount && (
        <div className="flex justify-around items-center mx-2">
          <Link
            href={"/"}
            className="mx-2 uppercase text-white bg-red-400 rounded-md p-2 hover:border-2 border-purple-400"
          >
            main
          </Link>
          <Link
            href={"/exchange"}
            className="mx-2 uppercase text-white bg-red-400 rounded-md p-2 hover:border-2 border-purple-400"
          >
            exchange
          </Link>
          <Link
            href={"/play"}
            className="mx-2 uppercase text-white bg-red-400 rounded-md p-2 hover:border-2 border-purple-400"
          >
            play
          </Link>
        </div>
      )} */}
      {defaultAccount && (
        <div className="sm:flex hidden items-center justify-center w-full self-center">
          <NavBarElement elementName="main" link="/" />
          <NavBarElement elementName="exchange" link="/exchange" />
          <NavBarElement elementName="play" link="/play" />
        </div>
      )}
      {defaultAccount && (
        <div className="flex justify-end text-sm mr-3 w-full items-center">
          <WalletInfo className="text-xs" full={false} />
          <div className="flex">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:bg-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg> */}
          </div>
        </div>
      )}

      <MetamaskInstallButton />

      {defaultAccount && (
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
      )}
    </nav>
  );
}

import React from "react";
import Link from "next/link";

import Image from "next/image";
import UseFullContext from "../../lib/useFullContext";
import NavBarElement from "./NavBarElement";
import WalletInfo from "./WalletInfo";

import EthIcon from "../../public/ethereum.png";
import MetamaskInstallButton from "./MetamaskInstallButton";

export default function Navbar() {
  const { defaultAccount } = UseFullContext();

  return (
    <nav className="flex justify-between items-center m-1 px-3 pb-1 w-full border-b-2 border-red-400 z-50">
      <Link href="/">
        <div className="ml-2 p-3 flex justify-center items-center">
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
      {defaultAccount && (
        <div className="sm:flex hidden">
          <NavBarElement elementName="main" link="/" />
          <NavBarElement elementName="exchange" link="/exchange" />
          <NavBarElement elementName="play" link="/play" />
        </div>
      )}
      {defaultAccount && (
        <div className="flex justify-end text-sm mr-3 w-full items-center">
          <WalletInfo className="text-xs" full={false} />
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
              />
            </svg>

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

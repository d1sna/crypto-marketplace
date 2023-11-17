import React from "react";
import Link from "next/link";

import UseFullContext from "../../lib/useFullContext";
import NavBarElement from "./NavBarElement";
import WalletInfo from "./WalletInfo";

import MetamaskInstallButton from "./MetamaskInstallButton";
import { Button } from "@mui/material";
import NotificationIcon from "../Icons/NotificationIcon";
import MessageIcon from "./MessageIcon";
import WalletIcon from "../Icons/WalletIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import AccountIcon from "../Icons/AccountIcon";
import { useState } from "react";
import Dialog from "./Dialog";
import CloseIcon from "../Icons/CloseIcon";
import Image from "next/image";
import { aiLogo } from "../../public";

export default function Navbar() {
  const { defaultAccount } = UseFullContext();
  const [openedDialog, setOpenedDialog] = useState("");

  return (
    <nav className="flex flex-row justify-between items-center w-full z-50 py-1 text-white border-b border-gray-800">
      <div className="flex">
        <Link href="/" className="flex text-white-400 text-xl">
          {/* <Image src={aiLogo} height={40} width={40}/> */}
          TradingAI
        </Link>
      </div>

      {defaultAccount && (
        <div className="sm:flex hidden justify-center w-full ml-5">
          <NavBarElement elementName="main" link="/" />
          <NavBarElement elementName="payments" link="/exchange" />
          <NavBarElement elementName="trading bot" link="/bot" />
        </div>
      )}

      {defaultAccount && (
        <div className="flex text-sm items-center w-auto px-4 bg-indigo-400 rounded-full bg-grey-200 text-emerald-50 bg-clip-padding backdrop-filter bg-opacity-30 max-h-[100%] justify-between py-1">
          {/* <NotificationIcon onClick={() => setOpenedDialog("notifications")} />
          <MessageIcon onClick={() => setOpenedDialog("messages")} /> */}
          <WalletInfo className="text-xs" full={false} />
          <WalletIcon onClick={() => setOpenedDialog("wallet")} />
          {/* <SettingsIcon onClick={() => setOpenedDialog("settings")} />
          <AccountIcon onClick={() => setOpenedDialog("account")} /> */}
        </div>
      )}

      {openedDialog === "notifications" && (
        <Dialog
          className="absolute right-0 sm:right-8 top-16 w-full sm:w-[40%] h-full sm:h-[60%] p-3"
          onClose={() => setOpenedDialog("")}
        >
          <div className="border-b border-gray-600 flex justify-center items-center">
            <div className="flex justify-between w-full">
              <div className="text-smxl uppercase ml-5">notifications</div>
              <div onClick={() => setOpenedDialog("")}>
                <CloseIcon className="h-3 w-3 cursor-pointer" />
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {openedDialog === "messages" && (
        <Dialog
          className="absolute right-0 sm:right-8 top-16 w-full sm:w-[40%] h-full sm:h-[60%] p-3"
          onClose={() => setOpenedDialog("")}
        >
          <div className="border-b border-gray-600 flex justify-center items-center">
            <div className="flex justify-between w-full">
              <div className="text-smxl uppercase ml-5">messages</div>
              <div onClick={() => setOpenedDialog("")}>
                <CloseIcon className="h-3 w-3 cursor-pointer" />
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {openedDialog === "wallet" && (
        <Dialog
          className="absolute right-0 sm:right-8 top-16 w-full sm:w-[40%] h-full sm:h-[60%] p-3"
          onClose={() => setOpenedDialog("")}
        >
          <div className="border-b border-gray-600 flex justify-center items-center">
            <div className="flex justify-between w-full">
              <div className="text-smxl uppercase ml-5">wallet</div>
              <div onClick={() => setOpenedDialog("")}>
                <CloseIcon className="h-3 w-3 cursor-pointer" />
              </div>
            </div>
          </div>

          <WalletInfo full />
        </Dialog>
      )}

      {openedDialog === "settings" && (
        <Dialog
          className="absolute right-0 sm:right-8 top-16 w-full sm:w-[40%] h-full sm:h-[60%] p-3"
          onClose={() => setOpenedDialog("")}
        >
          <div className="border-b border-gray-600 flex justify-center items-center">
            <div className="flex justify-between w-full">
              <div className="text-smxl uppercase ml-5">settings</div>
              <div onClick={() => setOpenedDialog("")}>
                <CloseIcon className="h-3 w-3 cursor-pointer" />
              </div>
            </div>
          </div>
          // TODO:
        </Dialog>
      )}

      {openedDialog === "account" && (
        <Dialog
          className="absolute right-0 sm:right-8 top-16 w-full sm:w-[40%] h-full sm:h-[60%] p-3"
          onClose={() => setOpenedDialog("")}
        >
          <div className="border-b border-gray-600 flex justify-center items-center">
            <div className="flex justify-between w-full">
              <div className="text-smxl uppercase ml-5">account</div>
              <div onClick={() => setOpenedDialog("")}>
                <CloseIcon className="h-3 w-3 cursor-pointer" />
              </div>
            </div>
          </div>
          //TODO:
        </Dialog>
      )}

      {openedDialog === "menu" && (
        <Dialog
          className="absolute right-0 sm:right-8 top-16 w-full sm:w-[40%] h-screen sm:h-[60%] p-3"
          onClose={() => setOpenedDialog("")}
        >
          <div className="border-b border-gray-600 flex justify-center items-center">
            <div className="flex justify-between w-full">
              <div className="text-smxl uppercase ml-5">menu</div>
              <div onClick={() => setOpenedDialog("")}>
                <CloseIcon className="h-3 w-3 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full m-2 justify-center items-center">
            <div onClick={() => setOpenedDialog("")}>
              <NavBarElement elementName="main" link="/" />
            </div>
            <div onClick={() => setOpenedDialog("")}>
              <NavBarElement elementName="payments" link="/exchange" />
            </div>
            <div onClick={() => setOpenedDialog("")}>
              <NavBarElement elementName="trading bot" link="/bot" />
            </div>
          </div>
        </Dialog>
      )}

      <MetamaskInstallButton />

      {defaultAccount && (
        <div className="sm:hidden">
          <Button
            className="text-sm text-white"
            onClick={() => setOpenedDialog("menu")}
          >
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
        </div>
      )}
    </nav>
  );
}

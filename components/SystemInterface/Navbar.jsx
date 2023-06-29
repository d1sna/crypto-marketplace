import React, { useEffect, useState } from "react";
import Link from "next/link";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

import Image from "next/image";
import UseFullContext from "../../lib/useFullContext";
import NavBarElement from "./NavBarElement";
import WalletInfo from "./WalletInfo";
// import MenuBar from "./MenuBar";
// import AppsIcon from "@mui/icons-material/Apps";

import EthIcon from "../../public/ethereum.png";
import { Button } from "@mui/material";

export default function Navbar() {
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const { defaultAccount } = UseFullContext();

  useEffect(() => {
    setWindowWidth(window.screen.width);
  }, []);

  return (
    <nav className="flex justify-between items-center m-3 rounded-2xl border-b-2 border-b-red-400 w-full">
      <Link
        href="/"
        onClick={() => {
          setIsMenuBarOpen(false);
        }}
      >
        <div className="m-2 pl-2 border-2 border-red-400 flex justify-center items-center">
          <Image
            alt=""
            style={{ marginRight: "10px" }}
            height={27}
            width={27}
            src={EthIcon}
          />
          {windowWidth > 800 && <h4>WEB 3.0</h4>}
        </div>
      </Link>

      {defaultAccount && !isMenuBarOpen && windowWidth > 800 && (
        <div className="navBarElements">
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
      )}

      {defaultAccount && (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <WalletInfo full={false} />
          {/* <MenuBar setIsMenuBarOpen={setIsMenuBarOpen} isMenuBarOpen={isMenuBarOpen} /> */}
        </div>
      )}

      {windowWidth < 800 && (
        <Button style={{ color: "black" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-2 h-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
      )}
    </nav>
  );
}

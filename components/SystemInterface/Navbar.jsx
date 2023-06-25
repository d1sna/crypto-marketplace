import React, { useEffect, useState } from "react";
import Link from "next/link";
// import DensityMediumIcon from "@mui/icons-material/DensityMedium";

import Image from "next/image";
import UseFullContext from "../../lib/useFullContext";
import NavBarElement from "./NavBarElement";
import WalletInfo from "./WalletInfo";
import MenuBar from "./MenuBar";

import EthIcon from "../../public/ethereum.png";

export default function Navbar() {
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const { defaultAccount } = UseFullContext();

  useEffect(() => {
    setWindowWidth(window.screen.width);
  }, []);

  return (
    <nav className="navBar">
      <Link
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        href="/"
        onClick={() => {
          setIsMenuBarOpen(false);
        }}
      >
        <Image alt="" style={{ marginRight: "10px" }} height={27} width={27} src={EthIcon} />
        <h4>WEB 3.0</h4>
      </Link>

      {defaultAccount && !isMenuBarOpen && windowWidth > 800 && (
        <div className="navBarElements">
          <NavBarElement setIsMenuBarOpen={setIsMenuBarOpen} elementName="main" link="/" />
          <NavBarElement setIsMenuBarOpen={setIsMenuBarOpen} elementName="exchange" link="/exchange" />
          <NavBarElement setIsMenuBarOpen={setIsMenuBarOpen} elementName="apps" link="/apps" />
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
          <MenuBar setIsMenuBarOpen={setIsMenuBarOpen} isMenuBarOpen={isMenuBarOpen} />
        </div>
      )}

      {/* {windowWidth < 800 && (
        <Button
          onClick={() => {
            setIsMobileNav(!isMobileNav);
          }}
        >
          <DensityMediumIcon />
        </Button>
      )} */}
    </nav>
  );
}

import React from "react";
import PropTypes from "prop-types";

import HistoryIcon from "@mui/icons-material/History";
import { Avatar, Button } from "@mui/material";

import { useRouter } from "next/router";

function MenuBar({ isMenuBarOpen, setIsMenuBarOpen }) {
  const buttons = [
    // { link: "/", icon: <WalletIcon /> },
    { link: "/history", icon: <HistoryIcon /> },
  ];
  const router = useRouter();

  return (
    <div style={{ display: "flex", height: "6vh" }}>
      <Button
        onClick={() => {
          setIsMenuBarOpen(!isMenuBarOpen);
        }}
      >
        <div
          id="avatar"
          style={{
            textDecoration: "none",
            borderRadius: "25px",
            filter: "blur(0.3px)",
            boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
            padding: "4px",
            opacity: "1",
          }}
        >
          <Avatar key="avatar" sizes="small" />
        </div>
      </Button>
      {isMenuBarOpen &&
        buttons.map(({ link, icon }) => (
          <Button
            style={{ color: "black" }}
            key={link}
            onClick={() => {
              router.push(link);
            }}
          >
            {icon}
          </Button>
        ))}
    </div>
  );
}

MenuBar.propTypes = {
  isMenuBarOpen: PropTypes.bool.isRequired,
  setIsMenuBarOpen: PropTypes.func.isRequired,
};

export default MenuBar;

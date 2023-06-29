import { Button } from "@mui/material";
import React from "react";

import PropTypes from "prop-types";
import { useRouter } from "next/router";

function NavBarElement({ elementName, link }) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(link);
      }}
      style={
        (router.pathname.includes(link) && link !== "/") ||
        (router.pathname === "/" && router.pathname.includes(link))
          ? {
              marginLeft: "15px",
              marginRight: "15px",
              marginTop: "5px",
              marginBottom: "5px",
              borderRadius: "15px",
              padding: "10px",
              textDecoration: "none",
              filter: "blur(0.3px)",
              boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
              opacity: "0.7",
              color: "white",
              backgroundColor: "#e62739",
            }
          : {
              marginLeft: "15px",
              marginRight: "15px",
              marginTop: "5px",
              marginBottom: "5px",
              textDecoration: "none",
              padding: "10px",
              borderRadius: "15px",
              color: "black",
            }
      }
    >
      {elementName}
    </Button>
  );
}

NavBarElement.propTypes = {
  elementName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default NavBarElement;

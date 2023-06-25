import { Box } from "@mui/system";
import React from "react";
import AppCard from "../components/SystemInterface/AppCard";
import { casinoIcon, exampleIcon } from "../public";
// import PropTypes from "prop-types";

export default function Apps() {
  return (
    <Box style={{ display: "flex", width: "100%", height: "100%", margin: "10px" }}>
      <AppCard icon={casinoIcon} name="Casino Spin" link="/apps/casino-spin" />
      <AppCard icon={exampleIcon} name="Example" link="/apps/example" />
    </Box>
  );
}

Apps.propTypes = {};

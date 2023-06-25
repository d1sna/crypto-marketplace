import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

export default function AppCard({ icon, name, link }) {
  return (
    <Link
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "13vw",
        height: "13vw",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(15px)",
        opacity: "0.9",
      }}
      href={link}
    >
      <Image alt="" style={{ borderRadius: "35px", width: "7vw", height: "7vw" }} src={icon} />
      <div style={{ marginTop: "1vw", fontSize: "1.5vw" }}>{name}</div>
    </Link>
  );
}

AppCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.shape().isRequired,
  link: PropTypes.string.isRequired,
};

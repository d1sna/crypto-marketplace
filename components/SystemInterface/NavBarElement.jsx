import { Button } from "@mui/material";
import React from "react";

import PropTypes from "prop-types";
import { useRouter } from "next/router";

function NavBarElement({ elementName, link }) {
  const router = useRouter();
  const isCurrentPage =
    (router.pathname.includes(link) && link !== "/") ||
    (router.pathname === "/" && router.pathname.includes(link));

  return (
    <Button
      onClick={() => {
        router.push(link);
      }}
      className={`flex w-fit basis-1 gap-2 justify-center items-center p-2 px-5 min-w-max text-sm font-bold text-center hover:bg-opacity-100 active:bg-opacity-90 rounded-xl backdrop-blur-sm transition-all md:text-base outline-[#09073a]/50 bg-grey-200 text-emerald-50 bg-clip-padding backdrop-filter bg-opacity-30 mx-2 ${
        isCurrentPage && "bg-indigo-400"
      } `}
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

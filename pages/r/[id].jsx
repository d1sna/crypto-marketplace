import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const RefPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    Cookies.set("ref", id);
    router.push("/");
  }, [id, router]);

  return <></>;
};

export default RefPage;

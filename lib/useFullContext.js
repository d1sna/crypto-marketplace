import { useContext } from "react";
import { EthContext } from "./ethContext";

const UseFullContext = () => ({
  ...useContext(EthContext),
});

export default UseFullContext;

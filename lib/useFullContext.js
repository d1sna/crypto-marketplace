import { useContext } from "react";
import { EthContext } from "./ethContext";
import UserContext from "./userContext";

const UseFullContext = () => ({
  ...useContext(UserContext),
  ...useContext(EthContext),
});

export default UseFullContext;

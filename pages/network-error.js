import { useEffect } from "react";
import SwitchChainButton from "../components/SwitchChainButton";
import UseFullContext from "../lib/useFullContext";
import { useRouter } from "next/router";

export default function NetworkErrorPage() {
  const { defaultAccount } = UseFullContext();
  const router = useRouter();

  useEffect(() => {
    if (defaultAccount) router.push("/");
  }, [defaultAccount]);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        Please choose BNB network in your metamask
      </div>

      <div className="flex justify-center items-center">ANIMATION HERE</div>

      <div>Or tap button below</div>

      <SwitchChainButton />
    </>
  );
}

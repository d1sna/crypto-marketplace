import { useEffect } from "react";
import SwitchChainButton from "../components/SwitchChainButton";
import UseFullContext from "../lib/useFullContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { bnbSwitchTutorial } from "../public";

export default function NetworkErrorPage() {
  const { defaultAccount } = UseFullContext();
  const router = useRouter();

  useEffect(() => {
    if (defaultAccount) router.push("/");
  }, [defaultAccount]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="w-full h-full flex justify-center items-center text-3xl">
        Please choose BNB network in your metamask
      </h1>
      <Image src={bnbSwitchTutorial} />
      <div>Or tap button below</div>
      <SwitchChainButton />
    </div>
  );
}

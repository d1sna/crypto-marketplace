import Image from "next/image";
import React from "react";

import {
  bnbSwitchTutorial,
  connectToAppTutorial,
  createWalletTutorial,
  downloadMetamaskTutorial,
} from "../public";

import SwitchChainButton from "../components/SwitchChainButton";

function TutorialInstallMetamask() {
  return (
    <div className="w-full h-full rounded-xl flex flex-col justify-center items-center m-2 p-2">
      <h1 className="text-3xl p-2">Instruction how to install metamask 🎓</h1>
      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-300 p-2">1. Go to official web site</p>

        <a
          target="_blank"
          href="https://metamask.io/"
          className="underline text-purple-500"
        >
          www.metamask.io
        </a>

        <Image
          width={600}
          height={400}
          src={downloadMetamaskTutorial}
          alt="ссылка мета"
          className="rounded-xl my-2"
        />
      </div>
      <p className=" p-2 text-gray-300">
        2. Import your existing wallet or create new one
      </p>
      <Image
        width={600}
        height={400}
        className="rounded-xl my-2"
        src={createWalletTutorial}
        alt="first"
      />
      <div className=" p-2 text-gray-300">
        3. Choose BNB chain in your wallet (you can tap this button ){" "}
      </div>
      <div className="my-2">
        <SwitchChainButton />
      </div>
      <Image
        width={600}
        height={400}
        // className="scale-75 border-2 border-gray-200"
        src={bnbSwitchTutorial}
        alt="first"
        className="rounded-xl my-2"
      />
      <div>
        4. You successfully created METAMASK wallet and now you can do sign in
        (reload page)
      </div>

      <Image
        width={600}
        height={400}
        // className="scale-75 border-2 border-gray-200"
        src={connectToAppTutorial}
        alt="first"
        className="rounded-xl my-2"
      />
    </div>
  );
}

export default TutorialInstallMetamask;

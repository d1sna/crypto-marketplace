import Image from "next/image";
import React from "react";
import {
  connectMetamaskTutorial,
  metamaskTutorial,
  tutorial2,
} from "../public";
import Link from "next/link";

function TutorialInstallMetamask() {
  return (
    <div className="w-full h-full rounded-xl flex flex-col justify-center items-center m-2 p-2">
      <h1 className="text-xl p-2 text-gray-400">
        Instruction how to install metamask
      </h1>
      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-300 p-2">1. Go to official web site</p>

        <a target="_blank" href="https://metamask.io/" className="underline text-purple-500">
          www.metamask.io
        </a>

        <Image
          width={200}
          height={120}
          src={metamaskTutorial}
          alt="ссылка мета"
          className="rounded-full my-2"
        />
      </div>
      <p className=" p-2 text-gray-300">
        2. Import your existing wallet (if you have code phrase) or create new
        one
      </p>
      <Image
        width={600}
        height={400}
        className="scale-75 border-2 border-gray-400 rounded-xl"
        src={tutorial2}
        alt="first"
      />
      <p className=" p-2 text-gray-300">3. Choose BNB chain in your wallet</p>
      <Image
        width={600}
        height={400}
        // className="scale-75 border-2 border-gray-200"
        src={connectMetamaskTutorial}
        alt="first"
        className="rounded-xl my-2"
      />
      You successfully created METAMASK wallet and now you can go into
      <Link href={"/"} className="underline text-purple-500">
        application{" "}
      </Link>
    </div>
  );
}

export default TutorialInstallMetamask;

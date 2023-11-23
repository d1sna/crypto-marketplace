import Image from "next/image";
import Link from "next/link";
import { buyBnbTutorial, depositTutorial, withdrawalTutorial } from "../public";

export default function () {
  return (
    <div className="w-full h-full rounded-xl flex flex-col justify-center items-center m-2 p-2">
      <h1 className="text-xl p-2 text-gray-400">
        Instruction how to do payments 🎓
      </h1>
      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-300 p-2">
          1. Buy or send BNB tokens to your metamask wallet
        </p>

        <Image
          width={600}
          height={400}
          src={buyBnbTutorial}
          alt="ссылка мета"
          className="rounded-xl my-2"
        />
      </div>
      <p className=" p-2 text-gray-300">
        2. Enter amount to deposit field, tap buy button and accept operation in
        your metamask wallet
      </p>
      <Image
        width={600}
        height={400}
        className="rounded-xl my-2"
        src={depositTutorial}
        alt="first"
      />
      <p className=" p-2 text-gray-300">
        3. To do withdrawal enter amount to withdrawal field, tap sell button
        and accept operation in your metamask wallet
      </p>
      <Image
        width={600}
        height={400}
        src={withdrawalTutorial}
        alt="first"
        className="rounded-xl my-2"
      />
      <Link href={"/exchange"} className="underline text-purple-500">
        Return to payments page
      </Link>
    </div>
  );
}

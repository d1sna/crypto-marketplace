import Image from "next/image";
import Link from "next/link";
import {
  betTutorial,
  buyBnbTutorial,
  depositTutorial,
  pairTutorial,
  startBotTutorial,
  toolsTutorial,
  withdrawalTutorial,
} from "../public";

export default function () {
  return (
    <div className="w-full h-full rounded-xl flex flex-col justify-center items-center m-2 p-2">
      <h1 className="text-xl p-2 text-gray-400">
        How to use trading AI bot 🎓
      </h1>
      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-300 p-2">1. Choose trading pair</p>

        <Image
          width={600}
          height={400}
          src={pairTutorial}
          alt="ссылка мета"
          className="rounded-xl my-2"
        />
      </div>
      <p className=" p-2 text-gray-300">
        2. Set your USD bet to bot ( automatic convert to TAI )
      </p>
      <Image
        width={600}
        height={400}
        className="rounded-xl my-2"
        src={betTutorial}
        alt="first"
      />
      <p className=" p-2 text-gray-300">
        3. Switch to tools and set strategy and time to bot
      </p>
      <Image
        width={600}
        height={400}
        src={toolsTutorial}
        alt="first"
        className="rounded-xl my-2"
      />
      <p className=" p-2 text-gray-300">
        4. Choose bot risk ( more risk more money, but be careful ), check
        calculated result, time and tap START BOT button
      </p>

      <Image
        width={600}
        height={400}
        src={startBotTutorial}
        alt="first"
        className="rounded-xl my-2"
      />

      <p className=" p-2 text-gray-300">
        6. Wait time while bot is increasing money and take your profit
      </p>

      <Link href={"/bot"} className="underline text-purple-500">
        Return to bot page
      </Link>
    </div>
  );
}

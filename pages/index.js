import Image from "next/image";
import NewsRow from "../components/SystemInterface/NewsRow";
import {
  cyberEye,
  instructionStepOne,
  instructionStepThree,
  instructionStepTwo,
  metamaskInstruction,
  review1,
  review2,
  review3,
  review4,
} from "../public";
import UseFullContext from "../lib/useFullContext";
import { TypingEffect } from "../components/TypingEffect";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CountDownTimer } from "../components/CountDownTimer";
import getTimeUntilNextDate from "../lib/getTimeUntilNextDate";
import axios from "axios";

export default function Index() {
  const { defaultAccount, tokenSymbol } = UseFullContext();
  const [rendered, setRendered] = useState(false);
  const [rendered2, setRendered2] = useState(false);
  const { hours, minutes, seconds } = getTimeUntilNextDate();

  useEffect(() => {
    const createVisitor = async () => {
      try {
        await axios.post("/api/visit");
      } catch (error) {
        console.log({ error });
      }
    };

    if (!defaultAccount) createVisitor();
  }, [defaultAccount]);

  useEffect(() => {
    const asyncTask = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setRendered(true);
    };

    asyncTask();
  }, []);

  useEffect(() => {
    const asyncTask = async () => {
      await new Promise((resolve) => setTimeout(resolve, 6000));
      setRendered2(true);
    };

    asyncTask();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full sm:w-[70%]">
      <NewsRow />

      {!defaultAccount && (
        <Link
          href={"/tutorial"}
          className="h-[25%] w-full bg-gray-900 rounded-md p-2 flex justify-between items-center m-2 cursor-pointer"
        >
          <div>
            <Image
              width={250}
              height={150}
              className="rounded-xl"
              src={metamaskInstruction}
            />
          </div>
          <div className="flex flex-col ml-2 p-2 w-full h-full ">
            <div className="my-1 border-b border-gray-400  flex flex-col">
              Instruction how to install metamask 🎓
            </div>
            <div className="text-smxl">
              <div>
                1. Go to official web site: metamask.io ( or tap button in right
                top )
              </div>
              <div>
                2. Install application for your platform or plugin for your
                browser
              </div>
              <div>3. Create new crypto wallet or add existing one</div>
              <div className="underline mt-4">
                Click on instruction to see more details
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="flex justify-center items-center w-full h-full">
        <Image
          src={cyberEye}
          width={120}
          height={120}
          className="rounded-full m-2 w-[70%] sm:w-[30%] bg-black opacity-50 shadow-2xl"
        />
      </div>

      <div className="w-full h-full flex justify-center items-center p-3 my-2 border-b border-gray-900 text-2xl">
        <div className="flex flex-col w-full h-full justify-center items-center min-h-20">
          <TypingEffect
            text={"First ever crypto trading AI."}
            className={
              "bg-gray-650 rounded-md p-2 flex justify-center items-center"
            }
          />
          {rendered && (
            <TypingEffect
              className={
                "bg-gray-650 rounded-md w-auto p-2 flex justify-center items-center"
              }
              text={`Don't think about risks.`}
            />
          )}

          {rendered2 && (
            <TypingEffect
              className={
                "bg-gray-650 rounded-md w-auto p-2 flex justify-center items-center"
              }
              text={`Begin getting money.`}
            />
          )}
        </div>
      </div>

      <CountDownTimer
        days={14}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        text={`🔥 Time to listing ${
          tokenSymbol || "TAI"
        } ( Binance, Bybit ) | Free using 🔥`}
        className="mt-2"
      />

      <div className="flex flex-col justify-center items-center h-full my-2 p-2 rounded-md">
        <div className="flex w-full justify-center items-center h-full flex-col sm:flex-row">
          <div className="w-full h-full flex flex-col">
            <div className="flex w-full flex-col justify-center items-center shadow-lg bg-gray-800 p-2 my-2 rounded-lg h-full">
              <Image src={instructionStepOne} width={200} height={120} />
              <div className="m-4 flex flex-col items-center justify-center">
                <h1 className="text-yellow-400 mb-2">
                  Dollar Cost Averaging Dollar
                </h1>
                Cost Averaging allows you to double or triple up on an
                investment that went sour. By using DCA, you can mitigate any
                potential bags by bringing down the weighted average price.
              </div>
            </div>
            <div className="flex flex-col justify-center items-center row w-full shadow-lg bg-gray-800 p-2 my-2 rounded-lg h-full">
              <Image
                src={instructionStepTwo}
                width={200}
                height={120}
                className="my-2"
              />

              <div className="m-4 flex flex-col items-center justify-center">
                <h1 className="text-yellow-400 mb-2">Short selling</h1>
                Short sell your currencies to mitigate a sudden drop. Track your
                currencies to the bottom and only buy them back when they show
                signs of recovery.
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full shadow-lg bg-gray-800 p-2 my-2 rounded-lg h-full">
              <Image src={instructionStepThree} width={200} height={120} />
              <div className="m-4 flex flex-col items-center justify-center">
                <h1 className="text-yellow-400 mb-2">Triggers</h1>
                Respond to the rise and fall of currencies and make sure that
                you respond to early signs of bear markets. Create customized
                actions ranging from notifications to sell orders to ensure your
                portfolio is safe 24/7.
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-full mt-2 pt-2 border-t  border-gray-900 flex items-center justify-center">
          ⭐⭐⭐ REVIEWS ⭐⭐⭐
        </div>

        <div className="w-full min-h-[20rem] h-full items-center overflow-x-auto py-4 overflow-y-hidden flex sm:mx-2">
          <Image
            src={review1}
            width={400}
            height={400}
            className=" rounded-3xl m-1 p-2"
          />

          <Image
            src={review2}
            width={400}
            height={400}
            className=" rounded-3xl m-1 p-2"
          />

          <Image
            src={review3}
            width={400}
            height={400}
            className=" rounded-3xl m-1 p-2"
          />
          <Image
            src={review4}
            width={400}
            height={400}
            className=" rounded-3xl m-1 p-2"
          />
        </div>
      </div>
    </div>
  );
}

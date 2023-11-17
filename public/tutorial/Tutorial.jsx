import Image from "next/image";
import React from "react";
import {
  connectMetamaskTutorial,
  depTutorial,
  metamaskTutorial,
  tutorial2,
} from "..";

function Tutorial() {
  return (
    <div className="bg-gray-900 w-full h-full rounded-xl flex flex-col justify-center items-center m-2 p-2">
      <h1 className="text-xl p-2 text-gray-400">
        Установка и подключение Metamask
      </h1>
      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-300 p-2">
          1. Установить Metamask для IOS/Android/PC с официального источника
        </p>

        <div className="text-blue-400">
          <a target="_blank" href="https://metamask.io/">
            Ссылка для скачивания кошелька метамаск
          </a>
        </div>

        <Image
          width={200}
          height={120}
          src={metamaskTutorial}
          alt="ссылка мета"
        />
      </div>
      <p className=" p-2 text-gray-300">
        2. Импортировать кошелек или создать новый, придумайте пароль и
        обязательно сохраните копию секретной фразы!{" "}
      </p>
      <div className="flex w-[500px]">
        <Image
          width={200}
          height={120}
          className="scale-75 border-2 border-gray-400 "
          src={tutorial2}
          alt="first"
        />
      </div>
      <p className=" p-2 text-gray-300">
        3. Осталось подключить кошелек к платформе буквально за пару кликов и
        выбрать нужную сеть "BNB Chain"{" "}
      </p>
      <div className="flex w-[500px]">
        <Image
          width={1024}
          height={640}
          // className="scale-75 border-2 border-gray-200"
          src={connectMetamaskTutorial}
          alt="first"
        />
      </div>
      <p className=" p-2 text-gray-300">
        4. Вы создали и подключили кошелек. Для торговли вам потребуются монеты
        BNB/NAEB.{" "}
      </p>
      <p className=" p-2 ml-4 text-gray-300">
        {" "}
        Нам нужно купить BNB на бирже Binance или Bybit и отправить их на свой
        адрес Metamask.{" "}
      </p>
      <div className="flex w-[500px]">
        <Image
          width={200}
          height={120}
          // className="ml-[60px] mt-8 border-2 border-gray-200"
          src={depTutorial}
          alt="first"
        />
      </div>

      <p className=" p-2 ml-4 mt-8 text-gray-300">
        {" "}
        Баланс кошелька Metamask пополнен. Можете приступать к торговле!{" "}
      </p>
      <p className=" p-2 ml-4 text-gray-300">
        Для запуска бота-наёбщика вам потребуются монеты NAEB, как их купить
        смотрите в другом руководстве!{" "}
      </p>
    </div>
  );
}

export default Tutorial;

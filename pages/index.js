import Image from "next/image";
import NewsRow from "../components/SystemInterface/NewsRow";
import {
  aiLogo2,
  mainPageLogo,
  metamaskInstruction,
  metamaskPaymentInstruction,
} from "../public";

export default function Index() {
  return (
    <div className="flex flex-col h-full w-full">
      <NewsRow />

      <div className="flex">
        <div className="flex flex-col w-full h-full rounded-md mt-1 max-h-[100%]">
          <div className="w-full bg-gray-800 rounded-md px-2 h-[25%] flex justify-between items-center m-2 cursor-pointer">
            <div>
              <Image
                width={250}
                height={150}
                className="rounded-xl"
                src={aiLogo2}
              />
            </div>
            <div className="flex flex-col ml-2 p-2 w-full h-full ">
              <div className="my-1 border-b border-gray-400  flex flex-col">
                Здесь будет что такое торговый бот с ИИ
              </div>
              <div className="text-smxl">
                Инструкция говорит что нужно установить метамаск и закинуть
                денежку пацанам...
              </div>
            </div>
          </div>

          <div className=" flex justify-between items-center w-full bg-gray-800 rounded-md px-2 h-[25%] m-2 cursor-pointer">
            <div>
              <Image
                width={250}
                height={150}
                className="rounded-xl"
                src={metamaskPaymentInstruction}
              />
            </div>
            <div className="flex flex-col ml-2 p-2 w-full h-full ">
              <div className="my-1 border-b border-gray-400  flex flex-col">
                Здесь будет инструкция по пополнению
              </div>
              <div className="text-smxl">
                Инструкция говорит что нужно установить метамаск и закинуть
                денежку пацанам...
              </div>
            </div>
          </div>

          <div className="h-[25%] w-full bg-gray-800 rounded-md px-2 flex justify-between items-center m-2 cursor-pointer">
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
                Здесь будет инструкция по установке метамаска
              </div>
              <div className="text-smxl">
                Инструкция говорит что нужно установить метамаск и закинуть
                денежку пацанам...
              </div>
            </div>
          </div>

          <div className="h-[25%] w-full bg-gray-800 rounded-md px-2 flex justify-between items-center m-2 cursor-pointer">
            <div>
              <Image
                width={250}
                height={150}
                className="rounded-xl"
                src={mainPageLogo}
              />
            </div>
            <div className="flex flex-col ml-2 p-2 w-full h-full ">
              <div className="my-1 border-b border-gray-400  flex flex-col">
                Здесь будет как использовать приложение
              </div>
              <div className="text-smxl">
                Инструкция говорит что нужно установить метамаск и закинуть
                денежку пацанам...
              </div>
            </div>
          </div>
        </div>

        {/* <div className="hidden sm:flex w-[40%] h-full bg-gray-800 mt-1 p-3 ml-5 rounded-md"></div> */}
      </div>
    </div>
  );
}

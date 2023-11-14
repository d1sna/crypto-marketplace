import Image from "next/image";
import NewsRow from "../components/SystemInterface/NewsRow";
import { aiLogo2, metamaskInstruction } from "../public";

export default function Index() {
  return (
    <div className="flex flex-col h-full w-full">
      <NewsRow />

      <div className="flex flex-col w-full h-full rounded-md mt-1 max-h-[100%]">
        <div className="flex flex-col sm:flex-row w-full h-full justify-center items-center">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="my-1 border-b border-gray-800">Здесь будет что такое торговый бот с ИИ</p>
            <div>
              <Image className="rounded-xl" src={aiLogo2} />
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            Здесь будет инструкция по пополнению
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full h-full justify-center items-center">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="my-1 border-b border-gray-800">
              Здесь будет инструкция по установке метамаска
            </p>
            <div>
              <Image className="rounded-xl" src={metamaskInstruction} />
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            Здесь будет как использовать приложение
          </div>
        </div>
      </div>
    </div>
  );
}

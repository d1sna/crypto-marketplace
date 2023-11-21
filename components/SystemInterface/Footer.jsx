import Image from "next/image";
import {
  binanceLogo,
  bybitLogo,
  coinbaseLogo,
  coineditionLogo,
  tradingViewLogo,
} from "../../public";

export default function Footer() {
  return (
    <div className="border-t my-2 border-gray-800 w-full flex flex-col items-center justify-center py-3">
      <div className="border-b border-gray-800 my-2"> Our partners : </div>

      <div className="rounded-xl p-2 mx-2 flex justify-between items-center">
        <div className="flex justify-between items-center my-4 bg-white rounded-full p-3">
          <Image
            src={coineditionLogo}
            width={70}
            height={60}
            className="rounded-xl mx-2"
          />
        </div>

        {/* </div> */}

        {/* <div className="flex my-2 justify-between items-center h-full"> */}
        <Image
          src={tradingViewLogo}
          width={120}
          height={20}
          className="rounded-full mx-4"
        />

        <Image
          src={coinbaseLogo}
          width={120}
          height={20}
          className=" rounded-full p-2 mx-4"
        />

        <Image
          src={bybitLogo}
          width={120}
          height={20}
          className="rounded-full mx-4"
        />

        <Image
          src={binanceLogo}
          width={120}
          height={90}
          className="rounded-xl mx-2"
        />
      </div>
      <div className="border-b border-gray-800 my-2 py-1">
        TradingAI.pro 2023 © All rights reserved
      </div>
    </div>
  );
}

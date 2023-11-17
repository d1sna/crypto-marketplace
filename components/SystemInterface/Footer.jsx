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
      <div className="flex justify-between items-center my-4">
        <div className="bg-white rounded-xl p-2 mx-2">
          <Image
            src={coineditionLogo}
            width={70}
            height={60}
            className="rounded-xl mx-2"
          />
        </div>

        <Image
          src={binanceLogo}
          width={120}
          height={90}
          className="rounded-xl mx-2"
        />
      </div>

      <div className="flex my-2 justify-between items-center h-full">
        <Image
          src={coinbaseLogo}
          width={120}
          height={20}
          className="rounded-xl mx-4"
        />

        <Image
          src={bybitLogo}
          width={120}
          height={20}
          className="rounded-xl mx-4"
        />

        <Image
          src={tradingViewLogo}
          width={120}
          height={20}
          className="rounded-xl mx-4"
        />
      </div>
      <div className="border-b border-gray-800 my-2">
        TradingAI 2023 © All rights reserved
      </div>
    </div>
  );
}

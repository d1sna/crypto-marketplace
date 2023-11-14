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
    <div className="border-t border-gray-800 w-full flex flex-col items-center justify-center py-3">
      <div className="border-b border-gray-800 my-2"> Our partners : </div>
      <div className="flex justify-between items-center my-2">
        <div className="bg-white rounded-xl">
          <Image
            src={coineditionLogo}
            width={70}
            height={60}
            className="rounded-xl mx-2"
          />
        </div>
        <div>
          <Image
            src={binanceLogo}
            width={120}
            height={90}
            className="rounded-xl mx-2"
          />
        </div>
      </div>
      <div className="flex my-2 justify-between items-center">
        <div>
          <Image
            src={coinbaseLogo}
            width={120}
            height={20}
            className="rounded-xl mx-2"
          />
        </div>
        <div>
          <Image
            src={bybitLogo}
            width={120}
            height={20}
            className="rounded-xl mx-2"
          />
        </div>
        <div>
          <Image
            src={tradingViewLogo}
            width={120}
            height={20}
            className="rounded-xl mx-2"
          />
        </div>
      </div>
      <p className="border-b border-gray-800 my-2">
        All rights reserved (c) TradingAI 2023
      </p>
    </div>
  );
}

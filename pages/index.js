import { Button } from "@mui/material";
import Link from "next/link";
import UseFullContext from "../lib/useFullContext";

export default function Index() {
  const { defaultAccount } = UseFullContext();

  return (
    <div className="md:hidden">
      {defaultAccount && (
        <div>
          <Link href="/exchange">
            <div className="border-b-2 uppercase border-red-400 hover:border-blue-400 flex justify-center items-center mt-5 w-full">
              exchange
            </div>
          </Link>
          <Link href="/play">
            <div className="border-b-2 uppercase border-red-400 hover:border-blue-400 flex justify-center items-center mt-5 w-full">
              play
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

import { Button } from "@mui/material";
import Link from "next/link";

export default function Index() {
  return (
    <div className="md:hidden">
      <Link href="/exchange">
        <div className="border-b-2 uppercase border-red-400 hover:border-blue-400 flex justify-center items-center mt-5 w-full">
          exchange
        </div>
      </Link>
    </div>
  );
}

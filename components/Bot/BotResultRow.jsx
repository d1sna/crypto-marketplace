export default function BotResultRow({
  pair,
  entirePrice,
  goalPrice,
  status,
  remainingTime,
  currentResult,
}) {
  return (
    <div className="flex text-smx sm:text-sm justify-between border border-gray-800 w-full p-2 rounded-md m-1 bg-gray-800">
      <div className="mr-2 bg-orange-400 px-2 justify-center items-center flex rounded-md">
        {pair}
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md ">
        PRICE: <p className="text-yellow-300 ml-1">{entirePrice}</p>
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md ">
        GOAL: <p className="text-yellow-300 ml-1">{goalPrice}</p>
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md ">
        <p className="mr-2">STATUS:</p>{" "}
        <p className="bg-green-400 rounded-md px-2 py-1"> {status}</p>
      </div>
      <div className="mr-2 px-2 justify-center items-center flex rounded-md ">
        REMAINING TIME: <p className="text-yellow-300 ml-1">{remainingTime}</p>
      </div>
      <div
        className={`mr-2 ${
          currentResult > 0 ? "text-green-400" : "text-red-400"
        } px-2 justify-center items-center flex rounded-md`}
      >
        {currentResult}%
      </div>
    </div>
  );
}

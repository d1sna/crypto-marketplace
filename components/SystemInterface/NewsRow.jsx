import { useEffect, useState } from "react";

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export default function NewsRow({ className }) {
  const news = [
    "🔥 0x83d...d33 get results 5100$ (+120.23 %)",
    "🔥 0x83d...d38 get results 23141$ (+181.3 %)",
    "🔥 0x83d...d33 get results 5100$ (+204.32 %)",
  ];
  const [currentNews, setCurrentNews] = useState(
    "🔥 0x83d...d33 get results 5100$ (+120.23 %)"
  );

  useEffect(() => {
    setInterval(() => {
      const randomNews = getRandomElement(news);
      setCurrentNews(randomNews);
    }, 5000);
  }, []);

  return (
    <div
      className={
        "w-full p-2 my-2 bg-gray-900 text-smxl rounded-md flex flex-col sm:flex-row justify-center items-center" +
        className
      }
    >
      <div className="flex flex-col sm:flex-row justify-center items-center">
        📢 ACTIVITY :&nbsp;
      </div>
      <div className="text-emerald-500 flex flex-col sm:flex-row justify-center items-center">
        {currentNews ? currentNews : " "}
      </div>
      <div className="hidden sm:flex flex-col sm:flex-row justify-center items-center">
        &nbsp; | &nbsp;
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center">
        📈 DAYS TO LISTING TOKEN F&nbsp;
      </div>
      <div className=" text-purple-600 flex flex-col sm:flex-row justify-center items-center">
        [TNF]
      </div>
      <div className="text-red-600 flex flex-col sm:flex-row justify-center items-center">
        &nbsp;1d ↓ 🔥
      </div>
    </div>
  );
}

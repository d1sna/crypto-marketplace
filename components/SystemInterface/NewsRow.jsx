import { useEffect, useState } from "react";

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export default function NewsRow() {
  const news = [
    "🔥 0x83d...d33 get results 5100$ (+120.23 %)",
    "🔥 0x83d...d38 get results 23141$ (+181.3 %)",
    "🔥 0x83d...d33 get results 5100$ (+204.32 %)",
  ];
  const [currentNews, setCurrentNews] = useState("");

  useEffect(() => {
    setInterval(() => {
      const randomNews = getRandomElement(news);
      setCurrentNews(randomNews);
    }, 5000);
  }, []);

  return (
    <div className="w-full p-2 my-2 bg-gray-900 text-smxl rounded-md flex flex-col sm:flex-row justify-center items-center">
      📢 ACTIVITY :&nbsp;
      <p className="text-emerald-500">{currentNews ? currentNews : " "}</p>
      &nbsp; | &nbsp; 📈 DAYS TO LISTING TOKEN F&nbsp;
      <p className=" text-purple-600">[TNF]</p>: &nbsp;
      <p className="text-yellow-400">28d ↓</p>
    </div>
  );
}

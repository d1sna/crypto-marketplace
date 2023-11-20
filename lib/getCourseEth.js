import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
let courseCached;
let cachedTime;
const fiveMinutes = 100 * 60 * 5;

const getCourseEth = async () => {
  try {
    if (!courseCached || !cachedTime || cachedTime - Date.now() > fiveMinutes) {
      const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
        params: {
          ids: "ethereum",
          vs_currencies: "usd",
        },
      });
      cachedTime = Date.now();
      courseCached = response.data?.ethereum?.usd;
      return response.data?.ethereum?.usd;
    }
    return courseCached;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return courseCached;
  }
};

export { getCourseEth };

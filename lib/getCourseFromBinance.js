export default function getCourseFromBinance(course) {
  try {
    const ws = new w3cwebsocket(
      "wss://stream.binance.com:9443/ws/ethusdt@trade"
    );
    ws.onmessage = ({ data }) => {
      course = Number(JSON.parse(data).p);
    };
  } catch (error) {
    console.log("Error while getting course: ", error.message);
  }
}

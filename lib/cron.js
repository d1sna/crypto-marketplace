const mongoose = require("mongoose");
const connection_string =
  "mongodb://your_root_username:your_root_password@localhost:27017";

function getRandomNumberWithDecimal(min, max, prev) {
  if (min >= max) {
    throw new Error("Минимальное значение должно быть меньше максимального");
  }

  const randomNumber = (Math.random() * (max - min) + min + prev).toFixed(2);
  return parseFloat(randomNumber);
}

async function updateResult() {
  await mongoose
    .connect(connection_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MONGO CONNECTED "))
    .catch((e) => console.log({ e }));

  const res = await mongoose.connection.db.collection("bots").findOneAndUpdate(
    {
      finishTime: { $lt: Date.now() },
      $or: [
        { cronNextTime: { $lte: Date.now() } },
        { cronNextTime: { $exists: false } },
      ],
    },
    {
      $inc: { currentResult: getRandomNumberWithDecimal(-0.1, 0.5, 0) },
      $set: { cronNextTime: Date.now() + 100 * 60 * 60 },
    }
  );
  console.log({ res });
}

const schedule = require("node-schedule");

schedule.scheduleJob("* * * * * *", async () => {
  await updateResult();
  console.log("Выполнено каждую секунду");
});

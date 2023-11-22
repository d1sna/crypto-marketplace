const mongoose = require("mongoose");
const connection_string =
  "mongodb://your_root_username:your_root_password@localhost:27017";

const getBots = async () => {
  await mongoose
    .connect(connection_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MONGO CONNECTED "))
    .catch((e) => console.log({ e }));

  // TODO: add filter
  const bots = await mongoose.connection.db
    .collection("bots")
    .findOneAndUpdate(
      { finishTime: { $lt: Date.now() } },
      { $set: { cron_status: "taken" } }
    );

  return bots;
};

async function startCron() {
  const bots = await getBots();
}

startCron();

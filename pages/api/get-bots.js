import mongoose from "mongoose";
import connectDb from "../../lib/connectDb";

export default async function saveBot(req, res) {
  await connectDb();
  const botIds = req.body.botIds || [];
  console.log({ botIds });
  let bots;
  try {
    bots = await mongoose.connection.db
      .collection("bots")
      .find({ botId: { $in: botIds } })
      .toArray();
  } catch (error) {
    console.log({ error });
  }

  console.log({ bots });
  res.send(bots);
}

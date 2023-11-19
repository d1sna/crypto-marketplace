import mongoose from "mongoose";
import connectDb from "../../lib/connectDb";

export default async function saveBot(req, res) {
  await connectDb();

  try {
    await mongoose.connection.db.collection("bots").updateOne(
      { botId: req.body.botId },
      {
        $set: { ...req.body },
      },
      { upsert: true }
    );
  } catch (error) {
    console.log({ error });
  }

  res.status(200).json({ message: "" });
}

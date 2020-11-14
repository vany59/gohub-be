import { MongoClient } from "mongodb";

import { DB_URL, DB_DATABASE } from "./environment";

async function main() {
  console.log("🚀  Server ready");

  const url = DB_URL!;

  const dbName = DB_DATABASE!;

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    console.log("🌱  Database seeder is running");

    const db = client.db(dbName);

    await db.collection("user").insertOne({
      _id: "8d14a2c0-f65e-11ea-8c54-032c98bee32a",
      username: "admin",
      password: "$2b$10$bj7rit1bzWGNdhwgUv.BdOxhcrd9P.so9IKB12ClFOf8FfkQIdxjW", //admin123
      email: "admin@gmail.com",
      phone: "0345662892",
      avatar: '',
      isRoot: true,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    });

    client.close();
    console.log("💤  Server off");
  } catch (err) {
    console.log("❌  Server error", err.stack);
  }
}

main();

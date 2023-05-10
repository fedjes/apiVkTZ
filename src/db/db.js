import { MongoClient } from "mongodb";



const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let conn;
try {
console.log('test');
  conn = await client.connect();
  await client.db("admin").command({ ping: 1 });
} catch(e) {
  console.log('TET ERROR');
  console.error(e);
}

let db = conn.db("users");

export default db;
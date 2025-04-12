import mongoose from "mongoose";
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

// Check if mongoose connection exists in the global cache (for hot reloading in dev)
let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI as string)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

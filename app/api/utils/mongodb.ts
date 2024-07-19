import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseCache;
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (globalWithMongoose.mongoose.conn) {
    // console.log("Using existing database connection");
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    globalWithMongoose.mongoose.promise = mongoose
      .connect(MONGO_URI!, {
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
        dbName: "Erlang",
      })
      .then((mongoose) => {
        // console.log("New database connection established");
        // console.log(
        //   "Connected to database:",
        //   mongoose.connection.db.databaseName
        // );
        return mongoose;
      });
  }
  globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
  return globalWithMongoose.mongoose.conn;
}

export default dbConnect;

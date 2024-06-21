import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("mongodb already connected");
    return;
  }
  const url = "mongodb+srv://admin:k1Q9gkIStO8TvvbA@cluster0.mms3uvi.mongodb.net/share_prompt?retryWrites=true&w=majority"
  try {
    await 
    mongoose.connect(url, {
      dbName: "fitness",
    });
    isConnected = true;
    console.log("mongodb connected");
  } catch (error) {
    console.log('mongodb connection error',error)
  }
};

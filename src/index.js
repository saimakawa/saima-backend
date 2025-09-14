// ✅ 1. index.js – Server start karne ka file
// Is file ka role:
// Server ko shuru karna.
// Database (MongoDB) se connect karna.
// Errors ko handle karna.
// Important changes:
// process.env.PORT || 8000 ka fallback diya hai. Agar environment mein PORT define nahi hai toh 8000 port use hoga.
// .catch block mein error ko handle kiya hai.
// Kaise kaam karta hai:
// connectDB() se MongoDB se connection banaya.
// Agar connection successful hai, toh server port par listen karta hai.
// Agar error hai toh console mein print karta hai.
// require("dotenv").config({ path: ".env" });

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Error", err);
    });
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
  })
  .catch((err) => {
    console.log("Mongo DB connection failed !!! ", err);
  });

// import express from "express";
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (err) => {
//       console.log("Error: ", err);
//       throw err;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Error: ", error);
//     throw error;
//   }
// })();

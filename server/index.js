import express from "express";
import cors from "cors";
import morgan from "morgan";
import { readdirSync } from "fs";
import mongoose from "mongoose";

require("dotenv").config();

const app = express();

// middlewares
app.use(cors());
app.use(morgan());
app.use(express.json());

// Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("DB Connection Error", err));

// routes
readdirSync("./routes").map((route) => {
  app.use("/v1/api", require(`./routes/${route}`));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on", process.env.PORT || "8000");
});

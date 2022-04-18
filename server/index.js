import express from "express";
import cors from "cors";
import morgan from "morgan";
import { readdirSync } from "fs";
import mongoose from "mongoose";
var csrf = require("csurf");
var cookieParser = require("cookie-parser");

require("dotenv").config();

var csrfProtection = csrf({ cookie: true });

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan());
app.use(cookieParser());

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

app.use(csrfProtection);

app.get("/v1/api/csrf", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on", process.env.PORT || "8000");
});

require("dotenv").config();
import rateLimit from "express-rate-limit";
import Routes from "./router/index";
import { commonMessages } from "./helpers/commanMsg";
import { sequelize } from "./config/db";
const express = require("express");

const PORT = process.env.PORT;
const app = express();
var cors = require("cors");
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: { message: commonMessages.TOO_MANY_REQ },
  headers: true,
  keyGenerator: (req) => req.ip,
});

app.use(limiter);
app.use(cors());
sequelize.sync();
app.use(Routes);
app.use("/", async (req, res) => {
  res.send(commonMessages.URL_NOT_FOUND);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

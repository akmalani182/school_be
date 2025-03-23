import { adminRole, authMiddleware } from "../../middleware/auth.middleware";
import authRoute from "./auth";
import schoolRoute from "./school";

const expressApp = require("express");
const v1routes = expressApp.Router();

v1routes.use("/auth", authRoute);
v1routes.use("/school", authMiddleware, schoolRoute);

export default v1routes;
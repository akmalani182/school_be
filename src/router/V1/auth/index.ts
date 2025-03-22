const authRoute = require("express").Router();
import authController from "../../../modules/v1/auth/auth.controller";

authRoute.post("/login", authController.login);

export default authRoute;

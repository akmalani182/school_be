const schoolRoute = require("express").Router();

import { adminRole } from "../../../middleware/auth.middleware";
import subdomainMiddleware from "../../../middleware/subdomainMiddleware";
import schoolController from "../../../modules/v1/school/school.controller";

schoolRoute.get("/bydoamin", subdomainMiddleware, schoolController.getSchool);
schoolRoute.put("/:id", subdomainMiddleware, schoolController.updateSchool);

schoolRoute.post("/", adminRole, schoolController.createSchool);
schoolRoute.get("/", adminRole, schoolController.getAllSchools);

export default schoolRoute;

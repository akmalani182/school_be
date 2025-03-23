require("dotenv").config();
import { User } from "../config/db";

User.create({
    name: "admin",
    email: "admin@gmail.com",
    password: `$2b$10$ikd5zwdiHGuubIUvxDv3yu3Oldp98BJY3cj7goRnRm4RecUMrt50O`, // it's test@123
    role: "admin",
})
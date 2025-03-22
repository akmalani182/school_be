
import { CustomError } from "../../../helpers/handleResponse";
import { comparePassword, getTokens, hashPassword, verifyToken } from "../../../helpers/utils";
import HttpStatus = require("../../../helpers/httpCodes");
import { loginValidation } from "./auth.validation";
import { createDataQuery, getOneDataQuery } from "../../../helpers/dbQuery";
import { commonMessages } from "../../../helpers/commanMsg";
import User from "../../../models/user.model";

const loginService = async (req) => {
  try {
    const { value, error } = loginValidation(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, HttpStatus.BAD_REQUEST);
    }

    const user = await getOneDataQuery(User, { email: value.email }, ["id", "email", "password", "role"]);

    if (!user) {
      throw new CustomError(
        commonMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND
      );
    }

    const isPasswordMatch = await comparePassword(value.password, user.password);

    if (!isPasswordMatch) {
      throw new CustomError(
        commonMessages.INVALID_PASSWORD,
        HttpStatus.UNAUTHORIZED
      );
    }
    const { id, role } = user.dataValues;

    const token = await getTokens({ userId: id, role: role });

    return token;
  } catch (error) {
    throw new CustomError(
      error.message,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export default { loginService };
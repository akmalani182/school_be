
import { CustomError } from "../../../helpers/handleResponse";
import { comparePassword, getTokens, hashPassword, verifyToken } from "../../../helpers/utils";
import HttpStatus = require("../../../helpers/httpCodes");
import { loginValidation, registerValidation } from "./auth.validation";
import { createDataQuery, getOneDataQuery } from "../../../helpers/dbQuery";
import { commonMessages } from "../../../helpers/commanMsg";
import { User } from "../../../config/db";

const loginService = async (req) => {
  try {
    const { value, error } = loginValidation(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, HttpStatus.BAD_REQUEST);
    }

    const user = await getOneDataQuery(User, { email: value.email }, ["id", "email", "password", "role"], ["School"]);

    if (!user) {
      throw new CustomError(
        commonMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND
      );
    };

    const isPasswordMatch = await comparePassword(value.password, user.password);

    if (!isPasswordMatch) {
      throw new CustomError(
        commonMessages.INVALID_PASSWORD,
        HttpStatus.UNAUTHORIZED
      );
    }
    const { id, role } = user.dataValues;

    const token = await getTokens({ userId: id, role: role });

    return {
      token, user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        schoolId: user.schoolId,
        doamin: user.School.subdomain
      }
    };
  } catch (error) {
    throw new CustomError(
      error.message,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const registerService = async (req) => {
  try {

    const { value, error } = registerValidation(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, HttpStatus.BAD_REQUEST);
    }

    const { name, email, password, schoolId, role } = value;

    const user = await createDataQuery(User, {
      name: name,
      email: email,
      password: await hashPassword(password),
      schoolId: schoolId,
      role: role || "teacher",
    });

    if (!user) {
      throw new CustomError(
        commonMessages.USER_NOT_CREATED,
        HttpStatus.BAD_REQUEST
      );
    }

    return {};
  } catch (error) {
    throw new CustomError(
      error.message,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export default { loginService, registerService };
import { School } from "../../../config/db";
import { commonMessages } from "../../../helpers/commanMsg";
import { createDataQuery, getOneDataQuery, updateDataQuery } from "../../../helpers/dbQuery";
import { CustomError } from "../../../helpers/handleResponse";
import HttpStatus = require("../../../helpers/httpCodes");
import { generateSubdomain } from "../../../helpers/utils";
import { registerValidation } from "../auth/auth.validation";
import { createSchoolValidation } from "./school.validation";

const getSchoolService = async (req) => {
    try {
        const subdomain = req.subdomains[0];

        if (!subdomain) {
            throw new CustomError(commonMessages.SUBDOMAIN_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }

        const school = getOneDataQuery(School, { subdomain: subdomain }, null, ["profile"]);

        if (!school) {
            throw new CustomError(commonMessages.SCHOOL_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return school;
    } catch (error) {
        throw new CustomError(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

const createSchoolService = async (req) => {
    try {

        const { value, error } = createSchoolValidation(req.body);

        if (error) {
            throw new CustomError(error.details[0].message, HttpStatus.BAD_REQUEST);
        }

        const subdomain = generateSubdomain(value?.subdomain);
        const school = await getOneDataQuery(School, { subdomain });

        if (school) {
            throw new CustomError(commonMessages.SUBDOMAIN_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        }

        const newSchool = await createDataQuery(School, { ...value, subdomain });

        return newSchool;
    }
    catch (error) {
        throw new CustomError(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

const updateSchoolService = async (req) => {
    try {
        const { name } = req.body;
        const subdomain = req.subdomains[0];

        const school = await getOneDataQuery(School, { subdomain: subdomain });

        if (!school) {
            throw new CustomError(commonMessages.SCHOOL_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const updatedSchool = await updateDataQuery(School, { name, subdomain }, { subdomain: subdomain });

        return updatedSchool;
    }
    catch (error) {
        throw new CustomError(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

const getAllSchoolService = async (req) => {
    try {
        const schools = await School.findAll();

        return schools;
    }
    catch (error) {
        throw new CustomError(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

export default { getSchoolService, createSchoolService, updateSchoolService, getAllSchoolService };
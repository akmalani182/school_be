
import { commonMessages } from '../../../helpers/commanMsg';
import { sendResponse } from '../../../helpers/handleResponse';
import HttpStatus = require('../../../helpers/httpCodes');
import schoolService from './school.service';
const getSchool = async (req: Request, res: Response) => {
    try {
        const result = await schoolService.getSchoolService(req);
        return sendResponse(
            res,
            HttpStatus.OK,
            commonMessages.SUCCESS,
            result
        );
    } catch (error) {
        return sendResponse(
            res,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error.message || commonMessages.INTERNAL_SERVER_ERROR,
            null,
            true
        );
    }
};

const createSchool = async (req: Request, res: Response) => {
    try {
        const result = await schoolService.createSchoolService(req);
        return sendResponse(
            res,
            HttpStatus.OK,
            commonMessages.SCHOOL_CREATE_SUCCESS,
            result
        );
    } catch (error) {
        return sendResponse(
            res,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error.message || commonMessages.INTERNAL_SERVER_ERROR,
            null,
            true
        );
    }
};

const updateSchool = async (req: Request, res: Response) => {
    try {
        const result = await schoolService.updateSchoolService(req);
        return sendResponse(
            res,
            HttpStatus.OK,
            commonMessages.SCHOOL_UPDATE_SUCCESS,
            result
        );
    } catch (error) {
        return sendResponse(
            res,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error.message || commonMessages.INTERNAL_SERVER_ERROR,
            null,
            true
        );
    }
};

const getAllSchools = async (req: Request, res: Response) => {
    try {
        const result = await schoolService.getAllSchoolService(req);
        return sendResponse(
            res,
            HttpStatus.OK,
            commonMessages.SUCCESS,
            result
        );
    }
    catch (error) {
        return sendResponse(
            res,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error.message || commonMessages.INTERNAL_SERVER_ERROR,
            null,
            true
        );
    }
};

export default { getSchool, createSchool, updateSchool, getAllSchools };
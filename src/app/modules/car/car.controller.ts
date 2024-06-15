import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CarServices } from "./car.service";

const createCar = catchAsync(async (req, res) => {
    const body = req.body;

    const result = await CarServices.createCarIntoDB(body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Car created successfully',
        data: result,
    });
});
export const carController = {
    createCar
}
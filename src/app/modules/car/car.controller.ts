import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { CarServices } from './car.service';

//create car by admin
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

//get all car
const getAllCars = catchAsync(async (req, res) => {
  const result = await CarServices.getCarFromDB();
  if (!result.length) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car retrieved successfully',
    data: result,
  });
});

//get single car
const getACar = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CarServices.getACarFromDB(id);
  if (!result || result.isDeleted === true) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car retrieved successfully',
    data: result,
  });
});

//update a car by admin
const updateCar = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await CarServices.updateACarIntoDB(id, body, res);
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Car not found',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  });
});

//Return The Car (Only Accessible To Admin)
const returnCar = catchAsync(async (req, res) => {
  const result = await CarServices.returnTheCarIntoDB(req, res);
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Car not found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car returned successfully',
    data: result,
  });
});

//soft delete a car by admin
const deleteACarIntoDB = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CarServices.deleteACarIntoDB(id, res);
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Car not found',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car deleted successfully',
    data: result,
  });
});
//export car controller
export const carController = {
  createCar,
  getAllCars,
  getACar,
  updateCar,
  deleteACarIntoDB,
  returnCar,
};

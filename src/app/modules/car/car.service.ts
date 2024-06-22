/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Booking } from '../booking/booking.model';
import { TCar } from './car.interface';
import { Car } from './car.model';
import mongoose from 'mongoose';
import { sendResponse } from '../../utils/sendResponse';

//create a car into database by admin
const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong',
    );
  }
  return result;
};

//get single car from database
const getCarFromDB = async () => {
  const result = await Car.find({ isDeleted: false });
  return result;
};
//Get A Car from database by all
const getACarFromDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};
//Update A Car from database by admin
const updateACarIntoDB = async (id: string, payload: TCar, res: any) => {
  const carId = await Car.findById(id);
  if (!carId) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Car not found',
      data: [],
    });
  }
  const result = await Car.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Car not found',
      data: [],
    });
  }
  return result;
};
//Delete A Car from database by admin
const deleteACarIntoDB = async (id: string, res: any) => {
  const findDeletedCar = await Car.findById(id);
  if (findDeletedCar?.isDeleted) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Car not found',
      data: [],
    });
  }
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
//Return The Car only accesalble by admin
const returnTheCarIntoDB = async (req: any, res: any) => {
  const bookingId = req.body.bookingId;
  const endTime = req.body.endTime;
  const checkIsBooked = await Booking.findById(bookingId);
  if (!checkIsBooked) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Booking not found',
      data: [],
    });
  }
  if (checkIsBooked?.endTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'this booking already return your car',
    );
  }
  const findCar = await Car.findById(checkIsBooked?.car);

  if (!findCar) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }
  // Convert start and end times to Date objects
  const startDate = timeCalc(checkIsBooked?.startTime);
  const endDate = timeCalc(endTime);
  if (endDate <= startDate) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'End time cannot be before or equal to start time',
    );
  }
  // Calculate the difference in milliseconds
  const diffInMilliseconds = endDate.getTime() - startDate.getTime();
  // Convert the difference from milliseconds to hours
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  // Calculate the total cost
  const totalCost = diffInHours * findCar?.pricePerHour;
  const session = await mongoose.startSession();
  if (endTime) {
    try {
      session.startTransaction();

      const carUpdate = await Car.findByIdAndUpdate(
        checkIsBooked?.car._id,
        { status: 'available' },
        { new: true, session },
      );
      if (!carUpdate) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'failed to update car startus',
        );
      }
      const bookingUpdate = await Booking.findByIdAndUpdate(
        bookingId,
        { endTime: endTime, totalCost: totalCost },
        { new: true, session },
      )
        .populate('car')
        .populate({
          path: 'user',
          select: { name: 1, email: 1, address: 1, role: 1, phone: 1 },
        });
      if (!bookingUpdate) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to update booking');
      }
      await session.commitTransaction();
      await session.endSession();
      return bookingUpdate;
    } catch (err) {
      await session.abortTransaction();
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update Return Car',
      );
    }
  }

  function timeCalc(timeString: any) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
};
// export all functions
export const CarServices = {
  createCarIntoDB,
  getCarFromDB,
  getACarFromDB,
  updateACarIntoDB,
  deleteACarIntoDB,
  returnTheCarIntoDB,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Car } from '../car/car.model';
import { Booking } from './booking.model';
import mongoose from 'mongoose';
import { sendResponse } from '../../utils/sendResponse';

//Get all car booking by admin
const getAllBookingFromDB = async (query: Record<string, unknown>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (query.carId) {
    query.car = query.carId;
    delete query.carId;
  }
  const offeredCourseQuery = new QueryBuilder(
    Booking.find()
      .populate('car')
      .populate({
        path: 'user',
        select: { name: 1, email: 1, address: 1, role: 1, phone: 1 },
      }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

//book cara by user
const bookACarIntoDB = async (data: Record<string, unknown>, res: any) => {
  const isCarBooked = await Car.findById(data.carId);
  const checkStatus = isCarBooked?.status;
  const isDeleted = isCarBooked?.isDeleted;
  if (isDeleted) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: 'Car not found',
      data: [],
    });
  }
  if (!isCarBooked) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: 'Car not found',
      data: [],
    });
  }
  if (checkStatus === 'unavailable') {
    throw new AppError(
      httpStatus.BAD_GATEWAY,
      'Car is not available for booking',
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateStarus = await Car.findByIdAndUpdate(
      data.carId,
      { status: 'unavailable' },
      { session, new: true },
    );
    if (!updateStarus) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update car status');
    }
    const newData = await {
      ...data,
      car: data.carId,
      user: data.userId,
    };
    const createdBookings = await Booking.create([newData], { session });
    if (!createdBookings) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking');
    }

    await session.commitTransaction();
    await session.endSession();
    const result = await Booking.populate(createdBookings, [
      { path: 'car' },
      {
        path: 'user',
        select: { name: 1, email: 1, address: 1, role: 1, phone: 1 },
      },
    ]);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
//get booking data by user
const getBookingByUserFromDB = async (userId: string) => {
  const result = await Booking.find({ user: userId })
    .populate('car')
    .populate({
      path: 'user',
      select: { name: 1, email: 1, address: 1, role: 1, phone: 1 },
    });
  return result;
};
export const bookingsService = {
  getAllBookingFromDB,
  bookACarIntoDB,
  getBookingByUserFromDB,
};

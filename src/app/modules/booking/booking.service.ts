import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Car } from "../car/car.model";
import { Booking } from "./booking.model"
import mongoose from "mongoose";

//Get all car booking
const getAllBookingFromDB = async (query: Record<string, unknown>)=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if(query.carId){
        query.car =query.carId;
        delete query.carId

    }
    const offeredCourseQuery = new QueryBuilder(Booking.find()
        .populate("car")
        .populate({ path: "user", select: { name: 1, email: 1, address: 1, role: 1, phone: 1 } }),
        query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await offeredCourseQuery.modelQuery;
    return result;
}

const bookACarIntoDB=async (data:Record<string,unknown>)=>{
    const isCarBooked = await Car.findById(data.carId);
    const checkStatus = isCarBooked?.status;
    if (!isCarBooked){
        throw new AppError(httpStatus.BAD_REQUEST, "Car not found !");}
    if (checkStatus === "unavailable") {
        throw new AppError(
            httpStatus.BAD_GATEWAY,
            "Car is not available for booking"
        )
    }
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
      const updateStarus= await Car.findByIdAndUpdate(
            data.carId,
            { status: "unavailable" },
            { new: true, session }
        );
        if (!updateStarus || updateStarus.status != "unavailable") {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update car status');
        }
        const newData = {
            ...data,
            car: data.carId,
            user: data.userId,
        }
        const createdBookings = await Booking.create([newData], { session });
        const result = await Booking.populate(createdBookings, [
            { path: "car" },
            { path: "user", select: { name: 1, email: 1, address: 1, role: 1, phone: 1 } }
        ]);
        await session.commitTransaction();
        await session.endSession();
        return result[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
    
}
//get booking data by user
const getBookingByUserFromDB=async (userId:string)=>{
    const result=await Booking.find({user:userId})
        .populate("car")
        .populate({ path: "user", select: { name: 1, email: 1, address: 1, role: 1, phone: 1 } })
    return result;
}
export const bookingsService={
    getAllBookingFromDB,
    bookACarIntoDB,
    getBookingByUserFromDB,
} 


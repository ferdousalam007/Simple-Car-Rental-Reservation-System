import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { bookingsService } from "./booking.service";
//Search for admin
const getAllBooking=catchAsync(async(req,res)=>{
    // const { carId, date, isBooked } = req.query;

    const result = await bookingsService.getAllBookingFromDB(req.query);
    if (!result.length) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'No Data Found',
            data: []
        });
    }
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"All Booking fetched successfully",
        data:result
    })
})
//create booking for create  user
const bookACar= catchAsync(async(req,res)=>{
    const userId = req.user?.userId;
    const newBody = {...req.body, userId}
    // const { carId, date, isBooked } = req.body;
    const result = await bookingsService.bookACarIntoDB(newBody);

    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Booking created successfully",
        data:result
    })
})

//get all booking get user
const getBookingByUser=catchAsync(async(req, res)=>{
    const userId = req.user?.userId;
    const result = await bookingsService.getBookingByUserFromDB(userId);
    if (!result.length) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'No Data Found',
            data: []
        });
    }
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"All Booking fetched successfully",
        data:result
    })
})


export const bookingController = {
    getAllBooking,
    bookACar,
    getBookingByUser
}
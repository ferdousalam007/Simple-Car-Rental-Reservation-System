import { Types } from "mongoose";
import { USER_ROLE } from "./car.booking.constant";


//create type in typescript

export type  TBooking ={
    date: string;
    startTime: string;
    endTime?: string; // Optional because it's not marked as required in the schema
    user: Types.ObjectId;
    car: Types.ObjectId;
    totalCost: number;
}
export type TUserRole = keyof typeof USER_ROLE;


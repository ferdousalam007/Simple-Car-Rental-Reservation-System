import { z } from "zod";

const createBookingSchema = z.object({
   body: z.object({
       carId: z.string({
           required_error: "Car Id is required hjhjh",

       }),
       date: z.string({
           required_error: "Date is required",
       }),
       startTime: z.string({
           required_error: "Start Time is required",
       }),
   })
});
const returnCarSchema = z.object({
    bookingId: z.string(),
    endTime: z.string(),
});
export const bookingValidation = {
    createBookingSchema,
    returnCarSchema
}
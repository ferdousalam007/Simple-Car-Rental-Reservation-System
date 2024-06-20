import { z } from 'zod';
const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);
const createBookingSchema = z.object({
  body: z.object({
    carId: z.string({
      required_error: 'Car Id is required hjhjh',
    }),
    date: z.string({
      required_error: 'Date is required',
    }),
    startTime: timeStringSchema,
  }),
});
const returnCarSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: timeStringSchema,
  }),
});
export const bookingValidation = {
  createBookingSchema,
  returnCarSchema,
};

import { z } from 'zod';

const dateSchema = z.string().refine(
  (value) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(value)) {
      return false;
    }

    const [year, month, day] = value.split('-').map(Number);
    if (year < 1000 || year > 9999 || month < 1 || month > 12) {
      return false;
    }

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }

    return day > 0 && day <= monthLength[month - 1];
  },
  {
    message: "Invalid date format. Expected 'YYYY-MM-DD'",
  },
);

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
      required_error: 'Car Id is required',
    }),
    date: dateSchema,
    // date: z.string({
    //   required_error: 'Date is required',
    // }),
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

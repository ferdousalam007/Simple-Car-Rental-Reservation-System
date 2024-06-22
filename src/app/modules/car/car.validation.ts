import { z } from 'zod';

//car validation schema
export const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    color: z.string({ required_error: 'Color is required' }),
    isElectric: z.boolean({ required_error: 'isElectric is required' }),
    features: z.array(z.string(), { required_error: 'Features is required' }),
    pricePerHour: z.number({
      required_error: 'Price per hour is required',
      invalid_type_error: 'Price per hour must be a number',
    }),
  }),
});
//car update validation schema
export const updatedCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    description: z
      .string({ required_error: 'Description is required' })
      .optional(),
    color: z.string({ required_error: 'Color is required' }).optional(),
    isElectric: z
      .boolean({ required_error: 'isElectric is required' })
      .optional(),
    features: z
      .array(z.string(), { required_error: 'Features is required' })
      .optional(),
    pricePerHour: z
      .number({
        required_error: 'Price per hour is required',
        invalid_type_error: 'Price per hour must be a number',
      })
      .optional(),
  }),
});

export const carValidations = {
  createCarValidationSchema,
  updatedCarValidationSchema,
};

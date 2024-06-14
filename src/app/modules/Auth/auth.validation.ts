import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'email is required.' }),
    password: z.string({ 
      required_error: 'Password is required',

     }).max(
      20, { message: 'password must be less than 20 characters' }
     ),
  }),
});


export const AuthValidation = {
  loginValidationSchema
};

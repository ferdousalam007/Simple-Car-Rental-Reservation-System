import { z } from 'zod';

export const createUserValidationSchema=z.object({
    body:z.object({
        name:z.string({required_error:"Name is required"}),
        email:z.string({required_error:"Email is required"}).email("Invalid email"),
        password:z.string({
            required_error:"Password is required",
            invalid_type_error:"Password must be String"
        }).max(
            20,{
                message:"Password cannot be more than 20 characters"
            }
        ),
        role:z.enum(['admin','user'],{
            required_error:"Role is required"
        }),
        phone:z.string({required_error:"Phone is required"}),
        address:z.string({required_error:"Address is required"}),
    })
})
export const userValidations ={
    createUserValidationSchema
}
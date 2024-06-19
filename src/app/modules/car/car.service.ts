import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (payload: TCar) => {
    const result = await Car.create(payload);
    return result
}
const getCarFromDB = async () => {
    const result = await Car.find();
    return result
}
//Get A Car
const getACarFromDB = async (id: string) => {
    const result = await Car.findById(id);
    return result
}
//Update A Car 
const updateACarIntoDB=async(id:string,payload:TCar)=>{
    const result=await Car.findByIdAndUpdate(id,payload);
    return result
}
//Delete A Car
const deleteACarIntoDB=async(id:string)=>{
    const result = await Car.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );

    // const result=await Car.findByIdAndDelete(id);
    return result
}
//Delete A Car
// export all functions
export const CarServices = {
    createCarIntoDB,
    getCarFromDB,
    getACarFromDB,
    updateACarIntoDB,
    deleteACarIntoDB
}
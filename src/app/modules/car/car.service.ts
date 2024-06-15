import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (payload: TCar) => {
    const result = await Car.create(payload);
    return result
}

export const CarServices = {
    createCarIntoDB
}
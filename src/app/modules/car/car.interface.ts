import { USER_ROLE } from "./car.constant";

//create type in typescript
export type TCar= {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    status: 'available' | 'unavailable'; // Assuming 'available' and 'unavailable' are the only statuses
    features: string[];
    pricePerHour: number;
    isDeleted: boolean;
}
export type TUserRole = keyof typeof USER_ROLE;


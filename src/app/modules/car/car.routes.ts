import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carValidations } from './car.validation';
import { carController } from './car.controller';
import auth from '../../middlewares/auth';
import { bookingValidation } from '../booking/booking.validation';
const router = express.Router();

router.post('/',
    auth('admin'),
    validateRequest(carValidations.createCarValidationSchema),
    carController.createCar
);
router.get('/',
    carController.getAllCars
);
router.put('/return',
   validateRequest(bookingValidation.returnCarSchema),
    carController.returnCar
);
router.get('/:id',
    carController.getACar
);
router.delete('/:id',
    carController.deleteACarIntoDB
);
export const CarRoutes = router;
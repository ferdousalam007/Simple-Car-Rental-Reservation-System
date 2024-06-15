import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carValidations } from './car.validation';
import { carController } from './car.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post('/',
    auth('admin'),
    validateRequest(carValidations.createCarValidationSchema),
    carController.createCar
);
export const CarRoutes = router;
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carValidations } from './car.validation';
import { carController } from './car.controller';
import auth from '../../middlewares/auth';
import { bookingValidation } from '../booking/booking.validation';
const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(carValidations.createCarValidationSchema),
  carController.createCar,
);
router.get('/', carController.getAllCars);
router.get('/:id', carController.getACar);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(carValidations.updatedCarValidationSchema),
  carController.updateCar,
);
router.delete('/:id', auth('admin'), carController.deleteACarIntoDB);
router.put(
  '/return',
  validateRequest(bookingValidation.returnCarSchema),
  carController.returnCar,
);

export const CarRoutes = router;

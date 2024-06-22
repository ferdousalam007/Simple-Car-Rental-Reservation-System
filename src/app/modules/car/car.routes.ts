import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carValidations } from './car.validation';
import { carController } from './car.controller';
import auth from '../../middlewares/auth';
import { bookingValidation } from '../booking/booking.validation';
const router = express.Router();

//create car by admin route
router.post(
  '/',
  auth('admin'),
  validateRequest(carValidations.createCarValidationSchema),
  carController.createCar,
);
//get all car by all
router.get('/', carController.getAllCars);

//return car by admin
router.put(
  '/return',
  auth('admin'),
  validateRequest(bookingValidation.returnCarSchema),
  carController.returnCar,
);
//update car by admin
router.put(
  '/:id',
  auth('admin'),
  validateRequest(carValidations.updatedCarValidationSchema),
  carController.updateCar,
);
//get single car by all
router.get('/:id', carController.getACar);

//delete car by admin
router.delete('/:id', auth('admin'), carController.deleteACarIntoDB);

//export car routes
export const CarRoutes = router;

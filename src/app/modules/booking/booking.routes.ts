import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { bookingController } from './booking.controller';
import { bookingValidation } from './booking.validation';
const router = express.Router();

router.post('/',
    auth('user'),
    validateRequest(bookingValidation.createBookingSchema),
    bookingController.bookACar
);
router.get('/my-bookings',
    auth('user'),
    bookingController.getBookingByUser
);
// router.post('/',
//     auth('admin'),
//     validateRequest(carValidations.createCarValidationSchema),
//     carController.createCar
// );
router.get('/',
   bookingController.getAllBooking
);
// router.get('/:id',
//     carController.getACar
// );
// router.delete('/:id',
//     carController.deleteACarIntoDB
// );
export const BookingRoutes = router;
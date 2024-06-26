import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import { userController } from './user.controller';
const router = express.Router();

//create user or admin route
router.post(
  '/signup',
  validateRequest(userValidations.createUserValidationSchema),
  userController.createUser,
);
export const UserRoutes = router;

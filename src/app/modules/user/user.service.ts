import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

//create user or admin into db
const createUserIntoDB = async (payload: TUser) => {
  const checkUser = await User.findOne({ email: payload.email });
  if (checkUser) {
    throw new AppError(httpStatus.CONFLICT, 'this email already exists');
  }
  const result = await User.create(payload);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};

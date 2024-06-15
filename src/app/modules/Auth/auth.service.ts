import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const {email,password}=payload
  // checking if the user is exist
  const user = await User.findOne({email});

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
 
  //checking if the password is correct
  const isMatch = await bcrypt.compare(password, user?.password as string);
  if (!isMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }
  // if (!(await User.isPasswordMatched(payload?.password, user?.password)))
  //   throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  
  return ({user,
    token})
 
};

export const AuthServices = {
  loginUser
};

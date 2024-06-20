import httpStatus from 'http-status';
// import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import { sendResponse2 } from '../../utils/sendResponse';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { token } = result;
  const copyResult = { ...result };
  copyResult.user.password = undefined;

  sendResponse2(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: copyResult.user,
    token, // Use the actual token variable here
  });
});

export const AuthControllers = {
  loginUser,
};

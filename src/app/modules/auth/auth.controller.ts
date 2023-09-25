import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import config from '../../routes/config';
import { AuthService } from './auth.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result: any = await AuthService.insertIntoDB(req.body);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user Created!!',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...others } = result;
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  // sendResponse<ILoginUserResponse>(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'User login successfully !',
  //   data: others,
  // });
  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User signin successfully!',
    token: others.accessToken,
  });
});

export const AuthController = {
  insertIntoDB,
  loginUser,
};

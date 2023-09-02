import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfileFromDB = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  console.log('controller', userId);
  const result = await ProfileService.getProfileFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' data fetched!!',
    data: result,
  });
});

export const ProfileController = {
  getProfileFromDB,
};

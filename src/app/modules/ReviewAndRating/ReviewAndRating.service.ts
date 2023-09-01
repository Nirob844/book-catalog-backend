import { ReviewAndRating } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  data: ReviewAndRating
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.create({
    data,
    include: {
      user: true,
      book: true,
    },
  });

  return result;
};

const getAllFromDB = async (): Promise<ReviewAndRating[]> => {
  const result = await prisma.reviewAndRating.findMany({
    include: {
      user: true,
      book: true,
    },
  });
  return result;
};

const getDataById = async (id: string): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<ReviewAndRating>
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ReviewAndRatingService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB,
};

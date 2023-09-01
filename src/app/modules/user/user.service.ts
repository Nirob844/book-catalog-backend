import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};

const getAllFromDB = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const getDataById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB,
};

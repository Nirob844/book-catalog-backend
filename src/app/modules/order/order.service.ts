import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { IOrderData, IOrderedBook } from './order.interface';

const insertIntoDB = async (userId: string, data: IOrderData): Promise<any> => {
  console.log('service userid', userId);
  data.userId = userId;
  console.log(data);
  const { orderedBooks, ...orderData } = data;
  const newOrder = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.order.create({
      data: orderData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create');
    }

    if (orderedBooks && orderedBooks.length > 0) {
      await asyncForEach(orderedBooks, async (orderBook: IOrderedBook) => {
        const createOrderBook = await transactionClient.orderedBook.create({
          data: {
            orderId: result.id,
            bookId: orderBook?.bookId,
            quantity: orderBook?.quantity,
          },
        });
        console.log(createOrderBook);
      });
    }
    return result;
  });

  if (newOrder) {
    const responseData = await prisma.order.findUnique({
      where: {
        id: newOrder.id,
      },
      include: {
        user: true,
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
};

const getAllFromDB = async (): Promise<Order[]> => {
  const reviewsAndRatings = await prisma.order.findMany({
    include: {
      user: true,
      orderedBooks: {
        include: {
          book: true,
        },
      },
    },
  });
  return reviewsAndRatings;
};

const getDataById = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      orderedBooks: {
        include: {
          book: true,
        },
      },
    },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Order>
): Promise<Order> => {
  const result = await prisma.order.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Order> => {
  const result = await prisma.order.delete({
    where: {
      id,
    },
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB,
};

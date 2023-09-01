import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { IOrderData, IOrderedBook } from './order.interface';

const insertIntoDB = async (data: IOrderData): Promise<any> => {
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

export const OrderService = {
  insertIntoDB,
};

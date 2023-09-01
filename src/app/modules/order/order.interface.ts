import { Status } from '@prisma/client';

export type IOrderData = {
  id: string;
  userId: string;
  status: Status;
  orderedBooks: IOrderedBook[];
};

export type IOrderedBook = {
  Id: string;
  bookId: string;
  quantity: number;
};

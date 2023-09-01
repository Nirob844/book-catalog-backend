/*
  Warnings:

  - You are about to drop the `OrderedBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderedBook" DROP CONSTRAINT "OrderedBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "OrderedBook" DROP CONSTRAINT "OrderedBook_orderId_fkey";

-- DropTable
DROP TABLE "OrderedBook";

-- CreateTable
CREATE TABLE "order_book" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_book" ADD CONSTRAINT "order_book_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_book" ADD CONSTRAINT "order_book_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

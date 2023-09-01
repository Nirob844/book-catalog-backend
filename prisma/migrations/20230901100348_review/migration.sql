/*
  Warnings:

  - Added the required column `updatedAt` to the `review_and_rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review_and_rating" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

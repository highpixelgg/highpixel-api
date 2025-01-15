/*
  Warnings:

  - You are about to drop the column `authorId` on the `updates` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `updates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "updates" DROP COLUMN "authorId",
DROP COLUMN "userId";

/*
  Warnings:

  - You are about to drop the column `user1Slug` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `user2Slug` on the `Follow` table. All the data in the column will be lost.
  - Added the required column `userId1` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId2` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "user1Slug",
DROP COLUMN "user2Slug",
ADD COLUMN     "userId1" TEXT NOT NULL,
ADD COLUMN     "userId2" TEXT NOT NULL;

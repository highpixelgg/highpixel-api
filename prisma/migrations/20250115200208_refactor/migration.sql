/*
  Warnings:

  - Added the required column `authorId` to the `updates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `updates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "updates" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "updates" ADD CONSTRAINT "updates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

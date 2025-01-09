/*
  Warnings:

  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_postId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "asset" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "asset" TEXT;

-- DropTable
DROP TABLE "Asset";

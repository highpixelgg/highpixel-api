/*
  Warnings:

  - You are about to drop the `updates_changelogs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `changelogs` to the `updates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "updates_changelogs" DROP CONSTRAINT "updates_changelogs_updateId_fkey";

-- AlterTable
ALTER TABLE "updates" ADD COLUMN     "changelogs" TEXT NOT NULL;

-- DropTable
DROP TABLE "updates_changelogs";

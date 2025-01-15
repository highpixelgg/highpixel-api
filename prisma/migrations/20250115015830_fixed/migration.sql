/*
  Warnings:

  - You are about to drop the `game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `game_changelog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "game_changelog" DROP CONSTRAINT "game_changelog_gameId_fkey";

-- DropTable
DROP TABLE "game";

-- DropTable
DROP TABLE "game_changelog";

-- CreateTable
CREATE TABLE "updates" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "download" TEXT NOT NULL,
    "release" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "update_changelog" (
    "id" TEXT NOT NULL,
    "updateId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "update_changelog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "updates_id_key" ON "updates"("id");

-- AddForeignKey
ALTER TABLE "update_changelog" ADD CONSTRAINT "update_changelog_updateId_fkey" FOREIGN KEY ("updateId") REFERENCES "updates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

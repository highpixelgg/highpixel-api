/*
  Warnings:

  - You are about to drop the column `changelogs` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `directory` on the `game` table. All the data in the column will be lost.
  - Changed the type of `money` on the `player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "game" DROP COLUMN "changelogs",
DROP COLUMN "directory";

-- AlterTable
ALTER TABLE "player" DROP COLUMN "money",
ADD COLUMN     "money" DECIMAL(65,30) NOT NULL;

-- CreateTable
CREATE TABLE "game_changelog" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_changelog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "playerOwner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "game_changelog" ADD CONSTRAINT "game_changelog_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_playerOwner_fkey" FOREIGN KEY ("playerOwner") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

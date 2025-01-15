/*
  Warnings:

  - You are about to drop the `player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `update_changelog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_nickname_fkey";

-- DropForeignKey
ALTER TABLE "update_changelog" DROP CONSTRAINT "update_changelog_updateId_fkey";

-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_playerOwner_fkey";

-- DropTable
DROP TABLE "player";

-- DropTable
DROP TABLE "update_changelog";

-- DropTable
DROP TABLE "vehicle";

-- CreateTable
CREATE TABLE "updates_changelogs" (
    "id" TEXT NOT NULL,
    "updateId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "updates_changelogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "money" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_vehicles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_vehicles" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "purchasedIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_id_key" ON "players"("id");

-- CreateIndex
CREATE UNIQUE INDEX "players_nickname_key" ON "players"("nickname");

-- AddForeignKey
ALTER TABLE "updates_changelogs" ADD CONSTRAINT "updates_changelogs_updateId_fkey" FOREIGN KEY ("updateId") REFERENCES "updates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_nickname_fkey" FOREIGN KEY ("nickname") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_vehicles" ADD CONSTRAINT "player_vehicles_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_vehicles" ADD CONSTRAINT "player_vehicles_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "game_vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

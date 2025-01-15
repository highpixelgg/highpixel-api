-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "download" TEXT NOT NULL,
    "directory" TEXT NOT NULL,
    "release" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changelogs" TEXT[],

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "money" TEXT NOT NULL,
    "vehicles" TEXT[],

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_id_key" ON "game"("id");

-- CreateIndex
CREATE UNIQUE INDEX "player_id_key" ON "player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "player_nickname_key" ON "player"("nickname");

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_nickname_fkey" FOREIGN KEY ("nickname") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

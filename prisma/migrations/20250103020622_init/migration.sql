-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'default.jpg',
    "cover" TEXT NOT NULL DEFAULT 'default.jpg',
    "bio" TEXT,
    "link" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tweet" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answerOf" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TweetLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tweetId" TEXT NOT NULL,

    CONSTRAINT "TweetLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "user1Slug" TEXT NOT NULL,
    "user2Slug" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trend" (
    "id" TEXT NOT NULL,
    "hashtag" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetLike" ADD CONSTRAINT "TweetLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetLike" ADD CONSTRAINT "TweetLike_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

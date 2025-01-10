-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "avatar" SET DEFAULT 'https://google.com',
ALTER COLUMN "cover" DROP NOT NULL,
ALTER COLUMN "cover" SET DEFAULT 'https://google.com',
ALTER COLUMN "nickname" DROP NOT NULL;

/*
  Warnings:

  - You are about to drop the `visitors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_visitor_id_fkey";

-- DropForeignKey
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_visitors_id_fkey";

-- DropTable
DROP TABLE "visitors";

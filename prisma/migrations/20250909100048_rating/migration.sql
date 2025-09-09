/*
  Warnings:

  - You are about to drop the column `rate` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `score` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Rating" DROP COLUMN "rate",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "score" INTEGER NOT NULL;

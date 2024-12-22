/*
  Warnings:

  - Added the required column `release` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "release" TIMESTAMP(3) NOT NULL;

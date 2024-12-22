/*
  Warnings:

  - You are about to drop the column `content` on the `review` table. All the data in the column will be lost.
  - Added the required column `opinion` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review" DROP COLUMN "content",
ADD COLUMN     "opinion" TEXT NOT NULL;

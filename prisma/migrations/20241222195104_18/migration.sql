-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_reviewId_fkey";

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

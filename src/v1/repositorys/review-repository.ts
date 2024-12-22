import { review } from "@prisma/client";
import prisma from "../libs/prisma";
import { ReviewDTO } from "../DTO/review-DTO";

class ReviewRepository {
  async create(dto: ReviewDTO): Promise<review> {
    const { images, ...review } = dto;

    return prisma.review.create({
      data: {
        ...review,
        rating: +review.rating,
        images: {
          createMany: {
            data:
              images?.map((image) => {
                return { imageUrl: image };
              }) || [],
          },
        },
      },
      include: {
        images: true,
      },
    });
  }

  async getAll(): Promise<review[]> {
    return prisma.review.findMany({ include: { images: true, user: true } });
  }

  async update(dto: ReviewDTO): Promise<review> {
    const { images, ...data } = dto;

    return prisma.review.update({
      where: {
        id: `${dto.id}`,
      },
      data: {
        ...data,
        rating: +data.rating,
      },
    });
  }

  async delete(reviewId: string): Promise<review> {
    return await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
  }
  async getAllByUserId(userId: string): Promise<review[]> {
    return await prisma.review.findMany({
      where: {
        userId: userId,
      },
      include: { images: true, user: true },
    });
  }
}

export default new ReviewRepository();

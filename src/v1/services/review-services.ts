import { review, user } from "@prisma/client";
import { ReviewDTO } from "./../DTO/review-DTO";
import reviewRepository from "../repositorys/review-repository";

class ReviewService {
  async create(dto: ReviewDTO): Promise<review> {
    const user = await reviewRepository.create(dto);

    return user;
  }

  async getAll(): Promise<review[]> {
    const reviews = await reviewRepository.getAll();
    return reviews;
  }
  async getAllByUserId(userId: string): Promise<review[]> {
    const review = await reviewRepository.getAllByUserId(userId);
    return review;
  }

  async update(dto: ReviewDTO): Promise<review> {
    const review = await reviewRepository.update(dto);

    return review;
  }
  async delete(reviewId: string): Promise<review> {
    const review = await reviewRepository.delete(reviewId);

    return review;
  }
}

export default new ReviewService();

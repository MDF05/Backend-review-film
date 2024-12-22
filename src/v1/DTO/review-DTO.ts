export interface ReviewDTO {
  id?: string;
  userId: string;
  tittle: string;
  opinion: string;
  rating: number;
  release: string;
  images?: string[];
}

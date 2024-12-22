import { user } from "@prisma/client";

export interface AuthDTO {
  user: Omit<user, "password">;
  token: string;
}

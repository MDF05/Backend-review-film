import { user } from "@prisma/client";
import prisma from "../libs/prisma";
import { RegisterDTO } from "../DTO/register-DTO";
import { ProfileDTO } from "../DTO/profile-DTO";

class userRepository {
  async create(dto: RegisterDTO): Promise<user> {
    return prisma.user.create({ data: dto });
  }
  async findByEmailOrName(emailORName: string): Promise<user | null> {
    return prisma.user.findFirst({
      where: {
        OR: [{ email: emailORName }, { name: emailORName }],
      },
    });
  }

  async update(dto: ProfileDTO): Promise<user> {
    return prisma.user.update({
      where: {
        email: dto.email,
      },
      data: {
        name: dto.name,
        email: dto.email,
        gender: dto.gender,
        image: dto.image,
      },
    });
  }
}

export default new userRepository();

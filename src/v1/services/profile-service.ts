import { user } from "@prisma/client";
import { ProfileDTO } from "../DTO/profile-DTO";
import { RegisterDTO } from "../DTO/register-DTO";
import userRepository from "../repositorys/user-repository";

class ProfileService {
  async put(dto: ProfileDTO): Promise<user> {
    const user = await userRepository.update(dto);

    return user;
  }
}

export default new ProfileService();

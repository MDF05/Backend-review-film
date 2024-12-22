import bcrypt from "bcrypt";
import userRepository from "../repositorys/user-repository";
import { user } from "@prisma/client";
import { LoginDTO } from "../DTO/login-DTO";
import { RegisterDTO } from "../DTO/register-DTO";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthDTO } from "../DTO/auth-DTO";
dotenv.config();

class AuthService {
  async login(dto: LoginDTO): Promise<AuthDTO> {
    const { password, emailORName } = dto;

    const user = await userRepository.findByEmailOrName(emailORName);
    if (!user) throw new Error("user or email not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("invalid password");

    const { password: hidden, ...other } = user;

    const token = jwt.sign(other, `${process.env.JWT_SECRET}`, { expiresIn: "1h" });

    return { user: other, token: token };
  }

  async register(dto: RegisterDTO): Promise<AuthDTO> {
    const { password } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    dto.password = hashedPassword;

    const user = await userRepository.create(dto);
    const { password: hidden, ...other } = user;
    const token = jwt.sign(other, `${process.env.JWT_SECRET}`, { expiresIn: "1h" });

    return { user: other, token: token };
  }
  async checkToken(token: string): Promise<AuthDTO> {
    const decodedToken: any = jwt.verify(token, `${process.env.JWT_SECRET}`);

    return { user: decodedToken, token: token };
  }
}

export default new AuthService();

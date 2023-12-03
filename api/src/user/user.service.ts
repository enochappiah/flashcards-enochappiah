import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDTO } from "./create-user.dto";
import * as bcrypt from "bcrypt";
import { userInfo } from "os";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  // You can add more methods as required, like createUser, updateUser, etc.
  async createUser(userDto: CreateUserDTO): Promise<User> {
    const existingUser = await this.findOne(userDto.username);
    if (existingUser) {
      throw new BadRequestException("Username already exists");
    }
    const { password, ...userInfo } = userDto;
    const user = this.userRepository.create({
      ...userInfo,
      password: await bcrypt.hash(password, 10),
    });
    return this.userRepository.save(user);
  }
}

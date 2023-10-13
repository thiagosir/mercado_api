import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user)
  }

  async findAll() {
    return this.users
  }

  async findByEmail(email: string) {
    const hasUser = this.users.find(
      user => user.email === email
    );

    return hasUser !== undefined;
  }
}
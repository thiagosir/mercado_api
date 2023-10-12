import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
  private users = [];

  async save(user) {
    if (user in this.users) {
      return "Usuario ja existe"
    }
    this.users.push(user)
  }

  async findAll(){
    return this.users
  }
}
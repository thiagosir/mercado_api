import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./repositories/users.repository";


@Controller('/usuarios')
export class UserController {
  constructor(private readonly repository: UserRepository){}

  @Post()
  async createUser(@Body() usersDTO) {
    this.repository.save(usersDTO)
    return usersDTO;
  }

  @Get()
  async listUsers() {
    return this.repository.findAll();
  }
}
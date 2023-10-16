import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./repositories/users.repository";
import { CreateUserDTO } from "./users-dto/createUser.dto";
import { UserEntity } from "./entities/user.entity";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./users-dto/ListaUsuario.dto";


@Controller('/usuarios')
export class UserController {
  constructor(private readonly repository: UserRepository) { }

  @Post()
  async createUser(@Body() usersDTO: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = usersDTO.email;
    userEntity.name = usersDTO.name;
    userEntity.password = usersDTO.password;
    userEntity.id = uuid();

    this.repository.save(userEntity);
    return { id: userEntity.id }
  }

  @Get()
  async listUsers() {
    const saveUsers = await this.repository.findAll();
    const userList = saveUsers.map(
      user => new ListaUsuarioDTO(
        user.id,
        user.name
      )
    );
    
    return userList;
  }
}
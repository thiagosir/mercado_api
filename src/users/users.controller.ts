import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { UserRepository } from "./repositories/users.repository";
import { CreateUserDTO } from "./users-dto/createUser.dto";
import { UserEntity } from "./entities/user.entity";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./users-dto/ListaUsuario.dto";
import { UpdateDTO } from "./users-dto/updateDTO.dto";


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
    return {
      usuario: new ListaUsuarioDTO(userEntity.id, userEntity.name),
      message: 'Usuário criado com sucesso'
    }
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

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() updateDTO: UpdateDTO) {
    const updatedUser = await this.repository.update(id, updateDTO);

    return {
      usuario: updatedUser,
      message: 'Usuário atualizado com sucesso'
    }
  }

  @Delete('/:id')
  async removeUser(@Param('id') id:string){

  }
}
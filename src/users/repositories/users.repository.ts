import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { UpdateDTO } from "../users-dto/updateDTO.dto";

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

  async update(id: string, updateData: Partial<UserEntity>) {
    const possibleUser = this.users.find(
      saveUser => saveUser.id === id
    )

    if (!possibleUser) {
      throw new Error('Usuário não existe');
    }

    Object.entries(updateData).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      possibleUser[chave] = valor;
    });
    return possibleUser;
  }

  async remove(id: string) {
    return this.users.pop()
  }
}
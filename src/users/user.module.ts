import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserRepository } from './repositories/users.repository';
import { EmailIsUnique } from './validation/emailIsUnique.validator';


@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository, EmailIsUnique],
})
export class UserModule {}

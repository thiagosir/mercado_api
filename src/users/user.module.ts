import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserRepository } from './repositories/users.repository';


@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule {}

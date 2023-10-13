import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validation/emailIsUnique.validator";

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @UniqueEmail({ message: 'Email already exists' })
  email: string;

  @IsNotEmpty()
  @MinLength(2)
  password: string;
}
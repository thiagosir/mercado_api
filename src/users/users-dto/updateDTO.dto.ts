import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validation/emailIsUnique.validator";

export class UpdateDTO {

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  @UniqueEmail({ message: 'Email already exists' })
  email: string;

  @IsNotEmpty()
  @IsOptional()
  @MinLength(2)
  password: string;
}
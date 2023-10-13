import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "../repositories/users.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUnique implements ValidatorConstraintInterface {
  constructor(private usersRepository: UserRepository) { }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const userEmailExists = await this.usersRepository.findByEmail(value)
    return !userEmailExists
  }
}

export const UniqueEmail = (optionsValidatios: ValidationOptions) => {
  return (object: Object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: optionsValidatios,
      constraints: [],
      validator: EmailIsUnique
    });
  }
}
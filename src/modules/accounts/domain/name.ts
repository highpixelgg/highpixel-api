import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";

export class Name {
  private readonly name: string;

  private constructor(name: string) {
    this.name = name
  }

  get value(): string {
    return this.name
  }

  static validate(name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 255) {
      return false
    }
    return true
  }

  static create(name: string): Either<ParametersErrors, Name> {
    if (!this.validate(name)) {
      return left(new ParametersErrors('Invalid name.', 400))
    }
    return right(new Name(name))
  }
}
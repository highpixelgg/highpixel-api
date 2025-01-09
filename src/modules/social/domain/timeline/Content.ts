import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";

export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private constructor(content: string) {
    this.content = content;
  }

  static validate(content: string): boolean {
    if (!content || content.trim().length < 1 || content.trim().length > 280) {
      return false;
    }

    return true;
  }

  static create(content: string): Either<ParametersErrors, Content> {
    if (!this.validate(content)) {
      return left(new ParametersErrors('Invalid content.'));
    }

    return right(new Content(content));
  }
}
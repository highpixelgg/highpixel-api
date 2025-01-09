import { Entity } from "core/domain/Entity"
import { ParametersErrors } from "core/domain/errors/ParameterErrors"
import { Either, left, right } from "core/logic/Either"

export interface ITrending {
  hashtag: string,
  counter: number,
  updatedAt: Date,
}

export class Trending extends Entity<ITrending> {
  private constructor(props: ITrending, id?: string) {
    super(props, id)
  }

  get hashtag() {
    return this.props.hashtag
  }

  get counter() {
    return this.props.counter
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  public static create(props: ITrending, id?: string): Either<ParametersErrors, Trending> {
    if (!props.hashtag || props.hashtag.trim() === "") {
      left(new ParametersErrors("Invalid hashtag.", 400));
    }
    if (props.counter < 0) {
      left(new ParametersErrors("Invalid counter", 400))
    }

    const trend = new Trending({
      ...props,
      updatedAt: new Date(props.updatedAt),
      hashtag: props.hashtag.trim(),
    }, id)
    
    return right(trend);
  }
}
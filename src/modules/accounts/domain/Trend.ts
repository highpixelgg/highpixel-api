import { ParametersErrors } from "core/domain/errors/ParameterErrors"
import { Either, left, right } from "core/logic/Either"
import { Entity } from "../../../core/domain/Entity"

export interface ITrend {
  hashtag: string,
  counter: number,
  updatedAt: Date,
}

export class Trend extends Entity<ITrend> {
  private constructor(props: ITrend, id?: string) {
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

  public static create(props: ITrend, id?: string): Either<ParametersErrors, Trend> {
    if (!props.hashtag || props.hashtag.trim() === "") {
      left(new ParametersErrors("Invalid hashtag.", 400));
    }
    if (props.counter < 0) {
      left(new ParametersErrors("Invalid counter", 400))
    }

    const trend = new Trend({
      ...props,
      updatedAt: new Date(props.updatedAt),
      hashtag: props.hashtag.trim(),
    }, id)
    return right(trend);
  }
}
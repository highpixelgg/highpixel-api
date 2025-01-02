import { Entity } from "../../../core/domain/Entity"

export interface ITrend {
  hashtag: string,
  counter: number,
  updatedAt: Date,
}

export class Trend extends Entity<ITrend> {
  private constructor(props: ITrend, id?: number) {
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
}
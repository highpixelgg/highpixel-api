import { Entity } from "../../../core/domain/Entity";

export interface IFollow {
  userId1: string,
  userId2: string,
}

export class Follow extends Entity<IFollow> {
  private constructor(props: IFollow, id?: string) {
    super(props, id)
  }

  get userId1() {
    return this.props.userId1
  }

  get userId2() {
    return this.props.userId2
  }

  public static create(props: IFollow, id?: string): Follow {
    const follow = new Follow(props, id);
    return follow
  }
}
import { Entity } from "../../../core/domain/Entity";

export interface IFollow {
  user1Slug: string,
  user2Slug: string,
}

export class Follow extends Entity<IFollow> {
  private constructor(props: IFollow, id?: number) {
    super(props, id)
  }

  get user1Slug() {
    return this.props.user1Slug
  }

  get user2Slug() {
    return this.props.user2Slug
  }

  public static create(props: IFollow, id?: number): Follow {
    const follow = new Follow(props, id);
    return follow
  }
}
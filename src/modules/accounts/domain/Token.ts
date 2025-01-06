import { Entity } from "core/domain/Entity";
import dayjs from "dayjs";

interface IToken {
  used?: boolean;
  type: string;
  user_id: string;
  expiresIn?: number;
}

export class Token extends Entity<IToken> {
  private constructor(props: IToken, id?: string) {
    super(props, id)
  }

  get used() {
    return this.props.used
  }

  get type() {
    return this.props.type
  }

  get user_id() {
    return this.props.user_id
  }

  get expiresIn() {
    return this.props.expiresIn
  }

  set MarkHasUsed(used: boolean) {
    this.props.used = used;
  }

  static create(props: IToken, id?: string): Token {
    const answer = new Token({
      ...props,
      expiresIn: props.expiresIn ?? dayjs().add(10, 'minutes').unix(),
    }, id)
    return answer
  }
}
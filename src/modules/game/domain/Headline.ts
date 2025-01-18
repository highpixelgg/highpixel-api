import { Entity } from "@core/domain/Entity"
import { ParametersErrors } from "@core/domain/errors/ParameterErrors"
import { Either, right } from "@core/logic/Either"

export interface IHeadlineProps {
  title: string,
  description: string,
  img: string,
  createAt: Date,
}

export class Headline extends Entity<IHeadlineProps> {
  constructor(props: IHeadlineProps, id?: string) {
    super(props, id)
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get img() {
    return this.props.img;
  }

  get createAt() {
    return this.props.createAt;
  }

  set setTitle(title: string) {
    this.props.title = title;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set img(img: string) {
    this.props.img = img;
  }

  set createAt(createAt: Date) {
    this.props.createAt = createAt;
  }

  static create(props: IHeadlineProps, id?: string): Either<ParametersErrors, Headline> {
    return right(new Headline(props, id));
  }
}
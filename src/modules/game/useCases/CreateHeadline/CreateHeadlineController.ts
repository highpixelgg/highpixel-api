import { Controller } from "core/infra/Controller";
import { clientError, created, HttpResponse } from "core/infra/HttpResponse";
import { CreateHeadline } from "./CreateHeadline";

type CreateHeadlineControllerRequest = {
  title: string,
  description: string,
  img: string,
  user: { id: string },
};

export class CreateHeadlineController implements Controller {
  constructor(private createHeadline: CreateHeadline) { }

  async handle({
    title,
    description,
    img,
    user,
  }: CreateHeadlineControllerRequest): Promise<HttpResponse> {
    const result = await this.createHeadline.execute({
      title,
      description,
      img,
      authorId: user.id,
    });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return created();
    }
  }
} 
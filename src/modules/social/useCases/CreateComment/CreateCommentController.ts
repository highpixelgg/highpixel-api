import { Controller } from "core/infra/Controller";
import { HttpResponse, clientError, ok } from "core/infra/HttpResponse";
import { CreateComment } from "./CreateComment";

type CreateCommentRequest = {
  postId: string;
  content: string;
  user: { id: string };
};

export class CreateCommentController implements Controller {
  constructor(private createComment: CreateComment) { }

  async handle({
    postId,
    content,
    user,
  }: CreateCommentRequest): Promise<HttpResponse> {
    const result = await this.createComment.execute({
      postId,
      content,
      user,
    });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return ok(result.value);
    }
  }
}
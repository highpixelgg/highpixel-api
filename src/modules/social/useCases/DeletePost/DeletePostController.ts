import { Controller } from "core/infra/Controller";
import { clientError, HttpResponse, ok } from "core/infra/HttpResponse";
import { DeletePost } from "./DeletePost";

type DeletePostRequest = {
  postId: string;
  user: { id: string };
};

export class DeletePostController implements Controller {
  constructor(private deletePost: DeletePost) { }

  async handle({ user, postId }: DeletePostRequest): Promise<HttpResponse> {
    const result = await this.deletePost.execute({ user, postId });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return ok({});
    }
  }
}
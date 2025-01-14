import { Controller } from "core/infra/Controller";
import { fail, HttpResponse, ok } from "core/infra/HttpResponse";
import { CreatePost } from "./CreatePost";

type CreatePostControllerRequest = {
  user: { id: string };
  content: string;
  file?: Express.Multer.File;
};

export class CreatePostController implements Controller {
  constructor(private createUser: CreatePost) { }

  async handle({ user, content, file }: CreatePostControllerRequest): Promise<HttpResponse> {
    const result = await this.createUser.execute({
      authorId: user.id,
      content,
      file,
    });

    if (result.isLeft()) {
      const error = result.value;
      return fail(error);
    } else {
      return ok(result.value);
    }
  }
}
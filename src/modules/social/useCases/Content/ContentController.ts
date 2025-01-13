import { Controller } from "core/infra/Controller";
import { fail, HttpResponse, ok } from "core/infra/HttpResponse";
import { ContentAvatar } from "./Avatar";
import { ContentBanner } from "./Banner";

type ContentRequest = {
  file: Express.Multer.File;
  avatar?: boolean;
  banner?: boolean;
  post?: boolean;
  user: { id: string };
};

export class ContentController implements Controller {
  constructor(
    private avatarContent: ContentAvatar,
    private bannerContent: ContentBanner,
  ) { }

  private async handleUpdateAvatar(
    file: Express.Multer.File,
    id: string
  ): Promise<HttpResponse> {
    const result = await this.avatarContent.execute({
      file,
      id,
    });

    if (result.isLeft()) {
      const error = result.value;
      return fail(error);
    } else {
      return ok(result.value);
    }
  }

  private async handleUpdateBanner(
    file: Express.Multer.File,
    id: string
  ): Promise<HttpResponse> {
    const result = await this.bannerContent.execute({
      file,
      id,
    });

    if (result.isLeft()) {
      const error = result.value;
      return fail(error);
    } else {
      return ok(result.value);
    }
  }

  async handle({
    file,
    avatar,
    banner,
    user,
  }: ContentRequest): Promise<HttpResponse> {
    if (Boolean(avatar)) {
      return this.handleUpdateAvatar(file, user.id);
    } else if (Boolean(banner)) {
      return this.handleUpdateBanner(file, user.id);
    } else {
      return ok({});
    }
  }
}
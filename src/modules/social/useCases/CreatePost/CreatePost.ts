import { uploadConfig } from "@config/upload-config";
import { CloudinaryUploadService } from "@infra/http/services/cloudinary/CloudinaryStorage";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { Content } from "modules/social/domain/timeline/Content";
import { Post } from "modules/social/domain/timeline/Post";
import { IPostsRepository } from "modules/social/repositories/IPostsRepository";

type CreatePostRequest = {
  content: string;
  file?: Express.Multer.File;
  authorId: string;
};

type FileResponse = {
  file: string;
};

type CreatePostResponse = Either<ParametersErrors, Post>;

export class CreatePost {
  constructor(
    private usersRepository: IUserRepository,
    private postsRepository: IPostsRepository
  ) { }

  async execute({
    content,
    file,
    authorId,
  }: CreatePostRequest): Promise<CreatePostResponse> {
    const uploadService = new CloudinaryUploadService();

    const contentOrError = Content.create(content);

    if (contentOrError.isLeft()) {
      return left(new ParametersErrors('Invalid post content length.'));
    }

    const user = await this.usersRepository.findOne(authorId);
    if (!user) {
      return left(new ParametersErrors('User not found'));
    }

    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const isValidBase64 = base64.startsWith(`data:${file.mimetype};base64,`);

    if (!isValidBase64) {
      throw new Error("Formato base64 inválido ou tipo MIME não suportado.");
    }


    const userMimeTypes = user.isPremium
      ? uploadConfig.post.mimeTypes.premium
      : uploadConfig.post.mimeTypes.default;

    const userLimits = user.isPremium
      ? uploadConfig.post.limits.premium
      : uploadConfig.post.limits.default;

    // Verifique se o tipo de arquivo é permitido
    if (!userMimeTypes[file.mimetype]) {
      throw new Error(`Tipo de arquivo não permitido: ${file.mimetype}`);
    }

    // Verifique se o tamanho do arquivo está dentro do limite permitido
    const maxSize = userLimits[file.mimetype];
    if (!maxSize || file.size > maxSize) {
      throw new Error(`Arquivo excede o limite permitido (${maxSize / (1024 * 1024)} MB).`);
    }


    try {
      const upload = await uploadService.uploadPost(file)

      const postOrError = Post.create({
        authorId: user.id,
        content: contentOrError.value.value,
        asset: upload.url,
      });

      if (postOrError.isLeft()) {
        return left(postOrError.value);
      }

      const post = postOrError.value;
      post.setAsset = upload.url;

      await this.postsRepository.create(post);

      return right(post);
    } catch (error) {
      console.log(error);
      return left(new ParametersErrors('Error creating post'));
    }
  }
}
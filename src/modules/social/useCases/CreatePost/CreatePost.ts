import { uploadConfig } from "@config/upload-config";
import { CloudinaryUploadService } from "@infra/http/services/cloudinary/CloudinaryStorage";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { getMimeTypeAndExtensionFromBase64 } from "@utils/getMimeType";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { Content } from "modules/social/domain/timeline/Content";
import { Post } from "modules/social/domain/timeline/Post";
import { IPostsRepository } from "modules/social/repositories/IPostsRepository";

type CreatePostRequest = {
  content: string;
  authorId: string;
  asset?: Express.Multer.File;
};

type CreatePostResponse = Either<ParametersErrors, Post>;

export class CreatePost {
  constructor(
    private usersRepository: IUserRepository,
    private postsRepository: IPostsRepository
  ) { }

  async execute({
    content,
    authorId,
    asset,
  }: CreatePostRequest): Promise<CreatePostResponse> {
    const uploadService = new CloudinaryUploadService();
    const contentOrError = Content.create(content);

    if (contentOrError.isLeft()) {
      return left(new ParametersErrors('Invalid post content length.'));
    }

    if (content.length < 1) {
      return left(new ParametersErrors('Invalid post content length.'));
    }

    const user = await this.usersRepository.findOne(authorId);
    if (!user) {
      return left(new ParametersErrors('User not found'));
    }

    // verify if file is a base64
    const base64 = `data:${asset.mimetype};base64,${asset.buffer.toString("base64")}`;
    const fileInfo = getMimeTypeAndExtensionFromBase64(base64, "post");

    if (fileInfo.error) {
      return left(new ParametersErrors(fileInfo.error));
    }

    // Check limits based on user type
    const limits = user.isPremium
      ? uploadConfig.post.limits.premium
      : uploadConfig.post.limits.default;

    const fileLimit = limits[asset.mimetype];

    // Check if the file type is allowed
    const mimeTypesConfig = user.isPremium ? uploadConfig.post.mimeTypes.premium : uploadConfig.post.mimeTypes.default;
    const allowedExtensions = Object.keys(mimeTypesConfig);

    if (!allowedExtensions.includes(asset.mimetype)) {
      return left(
        new ParametersErrors(
          `Invalid file type. Allowed types: ${allowedExtensions.join(", ")}.`
        )
      );
    }

    // Check if the file size exceeds the limit
    if (asset.size > fileLimit) {
      return left(
        new ParametersErrors(
          `File size exceeds the limit for ${asset.mimetype}.`
        )
      );
    }

    try {
      const upload = await uploadService.uploadPost(asset);

      const post = Post.create({
        authorId,
        content,
        asset: upload.url,
      });

      if (post.isLeft()) {
        return left(post.value);
      }

      const newPost = post.value;
      await this.postsRepository.create(newPost);

      return right(newPost);
    } catch (error) {
      return left(new ParametersErrors('Error creating post'));
    }
  }
}
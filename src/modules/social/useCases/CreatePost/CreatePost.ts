import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { cloudinaryUpload } from "infra/http/services/cloudinary/CloudinaryStorage";
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
  constructor(private postsRepository: IPostsRepository) { }

  async execute({
    content,
    authorId,
    asset,
  }: CreatePostRequest): Promise<CreatePostResponse> {
    const contentOrError = Content.create(content);

    if (contentOrError.isLeft()) {
      return left(new ParametersErrors('Invalid post content length.'));
    }

    if (content.length < 1) {
      return left(new ParametersErrors('Invalid post content length.'));
    }

    const upload = await cloudinaryUpload(asset, 'posts');

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
  }
}
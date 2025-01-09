import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { Content } from "modules/social/domain/timeline/Content";
import { Post } from "modules/social/domain/timeline/Post";
import { IPostsRepository } from "modules/social/repositories/IPostsRepository";

type CreatePostRequest = {
  content: string;
  authorId: string;
};

type CreatePostResponse = Either<ParametersErrors,Post>;

export class CreatePost {
  constructor(private postsRepository: IPostsRepository) { }

  async execute({
    content,
    authorId,
  }: CreatePostRequest): Promise<CreatePostResponse> {
    const contentOrError = Content.create(content);

    if (contentOrError.isLeft()) {
      return left(new ParametersErrors('Invalid post content length.'));
    }

    const post = Post.create({
      authorId,
      content,
    });

    if (post.isLeft()) {
      return left(post.value);
    }

    const newPost = post.value;
    await this.postsRepository.create(newPost);

    return right(newPost);
  }
}
import { Comment } from "modules/social/domain/timeline/Comment";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IPostsRepository } from "modules/social/repositories/IPostsRepository";

type CreateCommentRequest = {
  postId: string;
  content: string;
  user: { id: string };
};

type CreateCommentResponse = Either<ParametersErrors, Comment>;

export class CreateComment {
  constructor(private postsRepository: IPostsRepository) { }

  async execute({
    postId,
    content,
    user,
  }: CreateCommentRequest): Promise<CreateCommentResponse> {
    const exists = await this.postsRepository.exists(postId);

    if (!exists) {
      return left(new ParametersErrors('Post not found.'));
    }

    const post = await this.postsRepository.findOne(postId);

    const createComment = Comment.create({
      authorId: user.id,
      content: content,
      postId: post.id,
    });

    post.addComment(createComment);

    await this.postsRepository.save(post);

    return right(createComment);
  }
}
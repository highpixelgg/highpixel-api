import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { Like } from "modules/social/domain/timeline/Like";
import ILikesRepository from "modules/social/repositories/ILikesRepository";
import { IPostsRepository } from "modules/social/repositories/IPostsRepository";

type LikePostRequest = {
  postId: string;
  unlike: boolean;
  authorId: string;
};

type LikePostResponse = Either<ParametersErrors, Like>;

export class LikePost {
  constructor(
    private postsRepository: IPostsRepository,
    private likesRepository: ILikesRepository
  ) { }

  async execute({
    postId,
    unlike,
    authorId,
  }: LikePostRequest): Promise<LikePostResponse> {
    const exists = await this.postsRepository.exists(postId);

    if (!exists) {
      return left(new ParametersErrors('Post not found.'));
    }

    const alreadyLiked = await this.likesRepository.exists(postId, authorId);
    const post = await this.postsRepository.findOne(postId);

    if (alreadyLiked) {
      if (unlike) {
        const like = await this.likesRepository.findOne(postId, authorId);
        post.deslike(like);

        await this.postsRepository.save(post);

        return right(like);
      }

      return left(new ParametersErrors('Already liked.'));
    }

    const like = Like.create({
      authorId: authorId,
      postId: postId,
    });

    post.like(like);

    await this.postsRepository.save(post);

    return right(like);
  }
}
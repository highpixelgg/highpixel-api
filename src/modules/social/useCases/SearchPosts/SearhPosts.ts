import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { CommentMapper } from "modules/social/mappers/CommentMapper";
import { LikeMapper } from "modules/social/mappers/LikeMapper";
import { IPostsRepository } from "modules/social/repositories/IPostsRepository";
import { IProfilesRepository } from "modules/social/repositories/IProfileRepository";

type SearchPostsResponse = {
  data: Object[];
  totalCount: number;
};

type PromiseSearchResponse = Either<ParametersErrors, SearchPostsResponse>;

export class SearchPosts {
  constructor(
    private postsRepository: IPostsRepository,
    private profilesRepository: IProfilesRepository
  ) { }

  async execute({
    query,
    user,
    page = 1,
    perPage = 19700,
  }: ISearchPostsRequest): Promise<PromiseSearchResponse> {
    const exists = await this.profilesRepository.exists(user.id);

    if (!exists) {
      return left(new ParametersErrors("User not found"));
    }

    const { data, totalCount } = await this.postsRepository.search(
      query,
      page,
      perPage
    );

    const posts = data.map(post => ({
      _id: post.id,
      authorId: post.authorId,
      content: post.content,
      published: post.published,
      Comments: post.Comments.getItems().map(comment =>
        CommentMapper.toPersistence(comment)
      ),
      Likes: post.Likes.getItems().map(like => LikeMapper.toPersistence(like)),
      isLiked: Boolean(
        post.Likes.getItems().find(like => like.authorId === user.id)
      ),
      createdAt: post.createdAt,
    }));

    return right({ data: posts, totalCount });
  }
}
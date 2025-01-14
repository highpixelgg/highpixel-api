import { CloudinaryDeleteService } from "@infra/http/services/cloudinary/CloudinaryStorage";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IPostsRepository } from "modules/social/repositories/IPostsRepository";

type DeletePostRequest = {
  postId: string;
  user: { id: string };
};

type DeletePostResponse = Either<ParametersErrors, boolean>;

export class DeletePost {
  constructor(private postsRepository: IPostsRepository) { }

  async execute({
    user,
    postId,
  }: DeletePostRequest): Promise<DeletePostResponse> {
    const deleteService = new CloudinaryDeleteService();
    const exists = await this.postsRepository.exists(postId);

    if (!exists) {
      return left(new ParametersErrors('Post not found.'));
    }

    const post = await this.postsRepository.findOne(postId);

    if (post.authorId !== user.id) {
      return left(new ParametersErrors('Permission denied.'));
    }

    post.Comments.getItems().map(comment => post.removeComment(comment));
    post.Likes.getItems().map(like => post.deslike(like));

    if (post.asset) {
      const public_id = post.asset.split('/').pop()?.split('.')[0];  // Extrai o public_id da URL
      if (public_id) {
        await deleteService.deletePost(public_id);
      }
    }

    await this.postsRepository.delete(post);

    return right(true);
  }
}

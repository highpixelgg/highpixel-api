import { Controller } from "core/infra/Controller";
import { PrismaCommentRepository } from "modules/social/repositories/implementations/PrismaCommentsRepository";
import { PrismaLikesRepository } from "modules/social/repositories/implementations/PrismaLikesRepository";
import { PrismaPostsRepository } from "modules/social/repositories/implementations/PrismaPostsRepository";
import { DeletePost } from "./DeletePost";
import { DeletePostController } from "./DeletePostController";

export function makeDeletePostController(): Controller {
  const likesRepo = new PrismaLikesRepository();
  const commentsRepo = new PrismaCommentRepository();
  const repository = new PrismaPostsRepository(likesRepo, commentsRepo);
  const useCase = new DeletePost(repository);
  const controller = new DeletePostController(useCase);

  return controller;
}
import { Controller } from "core/infra/Controller";
import { PrismaLikesRepository } from "modules/social/repositories/implementations/PrismaLikesRepository";
import { PrismaPostsRepository } from "modules/social/repositories/implementations/PrismaPostsRepository";
import { LikePost } from "./LikePost";
import { LikePostController } from "./LikePostController";

export function makeLikePostController(): Controller {
  const likesRepository = new PrismaLikesRepository();
  const repository = new PrismaPostsRepository(likesRepository);
  const useCase = new LikePost(repository, likesRepository);
  const controller = new LikePostController(useCase);

  return controller;
}
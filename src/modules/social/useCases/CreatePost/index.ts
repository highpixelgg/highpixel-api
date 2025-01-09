import { Controller } from "core/infra/Controller";
import { PrismaPostsRepository } from "modules/social/repositories/implementations/PrismaPostsRepository";
import { CreatePost } from "./CreatePost";
import { CreatePostController } from "./CreatePostController";

export function makeCreatePostController(): Controller {
  const repository = new PrismaPostsRepository();
  const useCase = new CreatePost(repository);
  const controller = new CreatePostController(useCase);

  return controller;
}
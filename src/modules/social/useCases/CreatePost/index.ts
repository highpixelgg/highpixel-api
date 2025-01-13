import { PrismaUsersRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { Controller } from "core/infra/Controller";
import { PrismaPostsRepository } from "modules/social/repositories/implementations/PrismaPostsRepository";
import { CreatePost } from "./CreatePost";
import { CreatePostController } from "./CreatePostController";

export function makeCreatePostController(): Controller {
  const usersRepository = new PrismaUsersRepository();
  const postsRepository = new PrismaPostsRepository();
  const useCase = new CreatePost(usersRepository, postsRepository);
  const controller = new CreatePostController(useCase);

  return controller;
}
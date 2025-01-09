import { Controller } from "core/infra/Controller";
import { PrismaPostsRepository } from "modules/social/repositories/implementations/PrismaPostsRepository";
import { PrismaProfilesRepository } from "modules/social/repositories/implementations/PrismaProfilesRepository";
import { SearchPostsController } from "./SearchPostsController";
import { SearchPosts } from "./SearhPosts";

export function makeSearchPostsController(): Controller {
  const repository = new PrismaPostsRepository();
  const profilesRepository = new PrismaProfilesRepository();
  const useCase = new SearchPosts(repository, profilesRepository);
  const controller = new SearchPostsController(useCase);

  return controller;
}
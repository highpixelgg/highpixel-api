import { Controller } from "core/infra/Controller";
import { PrismaUsersRepository } from "modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaPostsRepository } from "modules/social/repositories/implementations/PrismaPostsRepository";
import { PrismaProfilesRepository } from "modules/social/repositories/implementations/PrismaProfilesRepository";
import { ContentAvatar } from "./Avatar";
import { ContentBanner } from "./Banner";
import { ContentController } from "./ContentController";
import { ContentPost } from "./Post";

export function makeContentController(): Controller {
  const profileRepository = new PrismaProfilesRepository();
  const userRepository = new PrismaUsersRepository();
  const postRepository = new PrismaPostsRepository();
  const contentBanner = new ContentBanner(userRepository, profileRepository);
  const contentAvatar = new ContentAvatar(userRepository, profileRepository);
  const contentPost = new ContentPost(userRepository, postRepository);
  const controller = new ContentController(contentAvatar, contentBanner, contentPost);

  return controller;
}
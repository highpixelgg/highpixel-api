import { Controller } from "core/infra/Controller";
import { PrismaUsersRepository } from "modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaProfilesRepository } from "modules/social/repositories/implementations/PrismaProfilesRepository";
import { ContentAvatar } from "./Avatar";
import { ContentBanner } from "./Banner";
import { ContentController } from "./ContentController";

export function makeContentController(): Controller {
  const profileRepository = new PrismaProfilesRepository();
  const userRepository = new PrismaUsersRepository();
  const contentBanner = new ContentBanner(userRepository, profileRepository);
  const contentAvatar = new ContentAvatar(userRepository, profileRepository);
  const controller = new ContentController(contentAvatar, contentBanner);

  return controller;
}
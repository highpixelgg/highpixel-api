import { Controller } from "core/infra/Controller";
import { PrismaFollowsRepository } from "modules/social/repositories/implementations/PrismaFollowsRepository";
import { PrismaProfilesRepository } from "modules/social/repositories/implementations/PrismaProfilesRepository";
import { SubscribeFollower } from "./SubscribeFollower";
import { SubscribeFollowerController } from "./SubscribeFollowerController";
import { SubscribeFollowerFindAll } from "./SubscribeFollowerFindAll";
import { SubscribeFollowerUnsubscribe } from "./SubscribeFollowUnfollow";

export function makeSubscribeFollowerController(): Controller {
  const followersRepository = new PrismaFollowsRepository();
  const profileRepository = new PrismaProfilesRepository(
    null,
    followersRepository
  );

  const useCase = new SubscribeFollower(followersRepository, profileRepository);
  const useCaseFindAll = new SubscribeFollowerFindAll(
    followersRepository,
    profileRepository
  );

  const useCaseUnfollow = new SubscribeFollowerUnsubscribe(
    followersRepository,
    profileRepository
  );

  const controller = new SubscribeFollowerController(
    useCase,
    useCaseFindAll,
    useCaseUnfollow
  );

  return controller;
}
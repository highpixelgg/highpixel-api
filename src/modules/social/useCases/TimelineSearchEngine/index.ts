import { Controller } from "core/infra/Controller";
import { PrismaPostsRepository } from "modules/social/repositories/implementations/PrismaPostsRepository";
import { PrismaProfilesRepository } from "modules/social/repositories/implementations/PrismaProfilesRepository";
import { TimelineSearchEngine } from "./TimelineSearchEngine";
import { TimelineSearchEngineController } from "./TimelineSearchEngineController";

export function makeTimelineSearchEngineController(): Controller {
  const repository = new PrismaProfilesRepository();
  const repository2nd = new PrismaPostsRepository();
  const useCase = new TimelineSearchEngine(repository2nd, repository);
  const controller = new TimelineSearchEngineController(useCase);

  return controller;
}
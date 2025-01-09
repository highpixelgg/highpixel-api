import { Controller } from "core/infra/Controller";
import { PrismaProfilesRepository } from "modules/social/repositories/implementations/PrismaProfilesRepository";
import { PrismaVisitorsRepository } from "modules/social/repositories/implementations/PrismaVisitorsRepository";
import { GetProfileVisitors } from "./GetProfileVisitors";
import { GetProfileVisitorsController } from "./GetProfileVisitorsController";

export function makeGetProfileSubscribedVisitorsController(): Controller {
  const repository2nd = new PrismaVisitorsRepository();
  const repository1nd = new PrismaProfilesRepository(repository2nd);
  const useCase = new GetProfileVisitors(repository2nd, repository1nd);
  const controller = new GetProfileVisitorsController(useCase);

  return controller;
}
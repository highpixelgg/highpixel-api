import { Controller } from "core/infra/Controller";
import { PrismaProfilesRepository } from "modules/social/repositories/implementations/PrismaProfilesRepository";
import { PrismaVisitorsRepository } from "modules/social/repositories/implementations/PrismaVisitorsRepository";
import { SubscribeVisitor } from "./SubscribeVisitor";
import { SubscribeVisitorController } from "./SubscribeVisitorController";

export function makeSubscribeVisitorController(): Controller {
  const repository2nd = new PrismaVisitorsRepository();
  const repository1nd = new PrismaProfilesRepository(repository2nd);
  const useCase = new SubscribeVisitor(repository1nd, repository2nd);
  const controller = new SubscribeVisitorController(useCase);

  return controller;
}
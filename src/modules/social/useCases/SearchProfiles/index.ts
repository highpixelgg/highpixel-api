import { Controller } from "core/infra/Controller";
import { PrismaProfilesRepository } from "modules/social/repositories/implementations/PrismaProfilesRepository";
import { SearchProfiles } from "./SearchProfiles";
import { SearchProfilesController } from "./SearchProfilesController";

export function makeSearchProfilesController(): Controller {
  const repository = new PrismaProfilesRepository();
  const useCase = new SearchProfiles(repository);
  const controller = new SearchProfilesController(useCase);

  return controller;
}
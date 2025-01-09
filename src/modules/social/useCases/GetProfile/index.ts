import { Controller } from "core/infra/Controller";
import { PrismaProfilesRepository } from "modules/social/repositories/implementations/PrismaProfilesRepository";
import { GetProfile } from "./GetProfile";
import { GetProfileController } from "./GetProfileController";

export function makeGetProfileController(): Controller {
  const repository = new PrismaProfilesRepository();
  const useCase = new GetProfile(repository);
  const controller = new GetProfileController(useCase);

  return controller;
}
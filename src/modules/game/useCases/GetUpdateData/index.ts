import { PrismaUpdateRepository } from "@modules/game/repositories/implementations/PrismaUpdateRepository";
import { Controller } from "core/infra/Controller";
import { PrismaUsersRepository } from "modules/accounts/repositories/implementations/PrismaUsersRepository";
import { GetUpdateData } from "./GetUpdateData";
import { GetUpdateDataController } from "./GetUpdateDataController";

export function makeGetUpdateDataController(): Controller {
  const updatesRepository = new PrismaUpdateRepository();
  const userRepository = new PrismaUsersRepository();
  const useCase = new GetUpdateData(updatesRepository, userRepository);
  const controller = new GetUpdateDataController(useCase);

  return controller;
}
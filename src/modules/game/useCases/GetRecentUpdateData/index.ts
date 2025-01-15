import { PrismaUpdateRepository } from "@modules/game/repositories/implementations/PrismaUpdateRepository";
import { Controller } from "core/infra/Controller";
import { PrismaUsersRepository } from "modules/accounts/repositories/implementations/PrismaUsersRepository";
import { GetRecentUpdateData } from "./GetRecentUpdateData";
import { GetRecentUpdateDataController } from "./GetRecentUpdateDataController";

export function makeGetRecentUpdateDataController(): Controller {
  const updatesRepository = new PrismaUpdateRepository();
  const userRepository = new PrismaUsersRepository();
  const useCase = new GetRecentUpdateData(updatesRepository, userRepository);
  const controller = new GetRecentUpdateDataController(useCase);

  return controller;
}
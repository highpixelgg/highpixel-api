import { Controller } from "core/infra/Controller";
import { GetAccountData } from "./GetAccountData";
import { GetAccountDataController } from "./GetAccountDataController";
import { PrismaUsersRepository } from "modules/accounts/repositories/implementations/PrismaUsersRepository";

export function makeGetAccountDataController(): Controller {
  const repository = new PrismaUsersRepository();
  const useCase = new GetAccountData(repository);
  const controller = new GetAccountDataController(useCase);

  return controller;
}
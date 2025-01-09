import { Controller } from "core/infra/Controller";
import { PrismaTokensRepository } from "modules/accounts/repositories/implementations/PrismaTokensRepository";
import { RecoveryPassword } from "./RecoveryUser";
import { PrismaUsersRepository } from "modules/accounts/repositories/implementations/PrismaUsersRepository";
import { RecoveryPasswordController } from "./RecoveryUserController";

export function makeRecoveryPasswordController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const repository = new PrismaUsersRepository(null, tokensRepository);
  const useCase = new RecoveryPassword(repository, tokensRepository);
  const controller = new RecoveryPasswordController(useCase);

  return controller;
}
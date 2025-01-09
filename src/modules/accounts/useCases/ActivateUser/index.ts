import { Controller } from "core/infra/Controller";
import { PrismaNotificationsRepository } from "modules/accounts/repositories/implementations/PrismaNotificationsRepository";
import { PrismaTokensRepository } from "modules/accounts/repositories/implementations/PrismaTokensRepository";
import { PrismaUsersRepository } from "../../repositories/implementations/PrismaUsersRepository";
import { ActivateUser } from "./ActivateUser";
import { ActivateUserController } from "./ActivateUserController";

export function makeActivateUserController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const notificationsRepository = new PrismaNotificationsRepository();
  const userRepository = new PrismaUsersRepository(notificationsRepository, tokensRepository);
  const activateUser = new ActivateUser(userRepository, tokensRepository);
  const controller = new ActivateUserController(activateUser);

  return controller;
}



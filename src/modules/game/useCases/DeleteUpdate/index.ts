import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaUpdateRepository } from "@modules/game/repositories/implementations/PrismaUpdateRepository";
import { DeleteUpdate } from "./DeleteUpdate";
import { DeleteUpdateController } from "./DeleteUpdateController";

export function makeDeleteUpdateController(): Controller {
  const usersRepository = new PrismaUsersRepository();
  const updateRepository = new PrismaUpdateRepository();
  const deleteUpdate = new DeleteUpdate(usersRepository, updateRepository);
  const controller = new DeleteUpdateController(deleteUpdate)

  return controller
}
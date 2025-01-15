import { PrismaUsersRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { Controller } from "core/infra/Controller";
import { CreateUpdate } from "./CreateUpdate";
import { CreateUpdateController } from "./CreateUpdateController";
import { PrismaUpdateRepository } from "@modules/game/repositories/implementations/PrismaUpdateRepository";

export function makeCreateUpdateController(): Controller {
  const updateRepository = new PrismaUpdateRepository();
  const usersRepository = new PrismaUsersRepository();
  const createUpdate = new CreateUpdate(updateRepository, usersRepository);
  const controller = new CreateUpdateController(createUpdate)

  return controller
}
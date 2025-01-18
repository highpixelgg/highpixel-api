import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaHeadlineRepository } from "@modules/game/repositories/implementations/PrismaHeadlineRepository";
import { PrismaUpdateRepository } from "@modules/game/repositories/implementations/PrismaUpdateRepository";
import { DeleteHeadline } from "./DeleteHeadline";
import { DeleteHeadlineController } from "./DeleteHeadlineController";

export function makeDeleteHeadlineController(): Controller {
  const usersRepository = new PrismaUsersRepository();
  const headlineRepository = new PrismaHeadlineRepository();
  const deleteHeadline = new DeleteHeadline(usersRepository, headlineRepository);
  const controller = new DeleteHeadlineController(deleteHeadline)

  return controller
}
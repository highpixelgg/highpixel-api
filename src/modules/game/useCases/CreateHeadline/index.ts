import { PrismaUsersRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaHeadlineRepository } from "@modules/game/repositories/implementations/PrismaHeadlineRepository";
import { Controller } from "core/infra/Controller";
import { CreateHeadline } from "./CreateHeadline";
import { CreateHeadlineController } from "./CreateHeadlineController";

export function makeCreateHeadlineController(): Controller {
  const headlineRepository = new PrismaHeadlineRepository();
  const usersRepository = new PrismaUsersRepository();
  const createHeadline = new CreateHeadline(headlineRepository, usersRepository);
  const controller = new CreateHeadlineController(createHeadline)

  return controller
}
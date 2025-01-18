import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaHeadlineRepository } from "@modules/game/repositories/implementations/PrismaHeadlineRepository";
import { GetAllHeadlinesData } from "./GetAllHeadlinesData";
import { GetAllHeadlinesController } from "./GetAllHeadlinesDataController";

export function makeGetAllHeadlinesController(): Controller {
  const headlinesRepository = new PrismaHeadlineRepository();
  const usersRepository = new PrismaUsersRepository();
  const getAllHeadlines = new GetAllHeadlinesData(headlinesRepository, usersRepository);
  const controller = new GetAllHeadlinesController(getAllHeadlines)

  return controller
}
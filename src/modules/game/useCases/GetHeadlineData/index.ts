import { PrismaHeadlineRepository } from "@modules/game/repositories/implementations/PrismaHeadlineRepository";
import { Controller } from "core/infra/Controller";
import { PrismaUsersRepository } from "modules/accounts/repositories/implementations/PrismaUsersRepository";
import { GetHeadlineData } from "./GetHeadlineData";
import { GetHeadlineDataController } from "./GetHeadlineDataController";

export function makeGetHeadlineDataController(): Controller {
  const headlinesRepository = new PrismaHeadlineRepository()
  const userRepository = new PrismaUsersRepository();
  const useCase = new GetHeadlineData(headlinesRepository, userRepository);
  const controller = new GetHeadlineDataController(useCase);

  return controller;
}
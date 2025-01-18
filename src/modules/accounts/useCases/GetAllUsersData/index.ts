import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { GetAllUsersData } from "./GetAllUsersData";
import { GetAllUsersController } from "./GetAllUsersDataController";

export function makeGetAllUsersController(): Controller {
  const usersRepository = new PrismaUsersRepository();
  const getAllUsers = new GetAllUsersData(usersRepository);
  const controller = new GetAllUsersController(getAllUsers)

  return controller
}
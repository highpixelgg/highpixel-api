import { PrismaTokensRepository } from "modules/accounts/repositories/implementations/PrismaTokensRepository";
import { PrismaUsersRepository } from "../../repositories/implementations/PrismaUsersRepository";
import { ActivateUser } from "./ActivateUser";
import { ActivateUserController } from "./ActivateUserController";

const makeActivateUserController = () => {
  const tokensRepository = new PrismaTokensRepository();
  const userRepository = new PrismaUsersRepository(null, null, tokensRepository);
  const activateUser = new ActivateUser(userRepository, tokensRepository);
  const activateUserController = new ActivateUserController(activateUser);

  return activateUserController.handle.bind(activateUserController)
}

export { ActivateUser, makeActivateUserController };


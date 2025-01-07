import { MailProvider } from "infra/providers/mail/implementations/MailProvider";
import { PrismaTokensRepository } from "modules/accounts/repositories/implementations/PrismaTokensRepository";
import { PrismaUsersRepository } from "../../repositories/implementations/PrismaUsersRepository";
import { CreateUser } from "./CreateUser";
import { CreateUserController } from "./CreateUserController";

const makeCreateUserController = () => {
  const tokensRepository = new PrismaTokensRepository();
  const mailProvider = new MailProvider();
  const prismaUsersRepository = new PrismaUsersRepository(null, null, tokensRepository);
  const createUser = new CreateUser(prismaUsersRepository, mailProvider);
  const createUserController = new CreateUserController(createUser)

  return createUserController.handle.bind(createUserController)
}

export { CreateUser, makeCreateUserController };


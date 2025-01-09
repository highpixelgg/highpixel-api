import { MailProvider } from "infra/providers/mail/implementations/MailProvider";
import { PrismaTokensRepository } from "modules/accounts/repositories/implementations/PrismaTokensRepository";
import { PrismaUsersRepository } from "../../repositories/implementations/PrismaUsersRepository";
import { CreateUser } from "./CreateUser";
import { CreateUserController } from "./CreateUserController";
import { Controller } from "core/infra/Controller";

export function makeCreateUserController(): Controller{
  const tokensRepository = new PrismaTokensRepository();
  const mailProvider = new MailProvider();
  const prismaUsersRepository = new PrismaUsersRepository(null, tokensRepository);
  const createUser = new CreateUser(prismaUsersRepository, mailProvider);
  const controller = new CreateUserController(createUser)

  return controller
}
import { Controller } from "core/infra/Controller";
import { AuthenticateUser } from "./AuthenticateUser";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { MailProvider } from "infra/providers/mail/implementations/MailProvider";
import { PrismaUsersRepository } from "modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaTokensRepository } from "@modules/accounts/repositories/implementations/PrismaTokensRepository";

export function makeAuthenticateController(): Controller {
  const userRepository = new PrismaUsersRepository();
  const mailProvider = new MailProvider();
  const tokenRepository = new PrismaTokensRepository();
  const authenticateUser = new AuthenticateUser(userRepository, mailProvider, tokenRepository);
  const controller = new AuthenticateUserController(authenticateUser);

  return controller;
}
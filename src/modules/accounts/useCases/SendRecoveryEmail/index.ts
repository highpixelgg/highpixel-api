import { Controller } from "core/infra/Controller";
import { PrismaTokensRepository } from "modules/accounts/repositories/implementations/PrismaTokensRepository";
import { SendRecoveryEmail } from "./SendRecoveryEmail";
import { SendRecoveryEmailController } from "./SendRecoveryEmailController";
import { PrismaUsersRepository } from "modules/accounts/repositories/implementations/PrismaUsersRepository";
import { MailProvider } from "infra/providers/mail/implementations/MailProvider";

export function makeSendRecoveryEmailController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const mailProvider = new MailProvider();
  const userRepository = new PrismaUsersRepository(null, tokensRepository);
  const useCase = new SendRecoveryEmail(userRepository, mailProvider);
  const controller = new SendRecoveryEmailController(useCase);

  return controller;
}
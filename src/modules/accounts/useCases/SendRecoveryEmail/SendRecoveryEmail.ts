import { ITokensRepository } from "@modules/accounts/repositories/ITokensRepository";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IMailProvider } from "infra/providers/mail/models/IMailProvider";
import { RecoveryEmailTemplate } from "infra/providers/mail/templates/RecoveryEmailTemplate";
import { Token } from "modules/accounts/domain/Token";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";
import { SendRecoveryEmailRequest } from "./SendRecoveryEmailDTO";

type SendRecoveryEmailResponse = Either<ParametersErrors, Token>;

export class SendRecoveryEmail {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider,
    private tokenRepository: ITokensRepository,
  ) { }

  async execute({
    email,
  }: SendRecoveryEmailRequest): Promise<SendRecoveryEmailResponse> {
    const account = await this.usersRepository.findOne(email);

    if (!account) {
      return left(new ParametersErrors('User not found.', 404));
    }

    const unusedRecoveryTokens = await this.tokenRepository.findByTypeAndUserIdAndUsed(
      'recovery',
      account.id,
      false
    );

    // Remove todos os tokens de recuperação não utilizados
    if (unusedRecoveryTokens.length > 0) {
      await Promise.all(
        unusedRecoveryTokens.map(token => this.tokenRepository.remove(token.id))
      );
    }

    const token = Token.create({
      type: 'recovery',
      user_id: account.id,
      used: false,
    });

    account.addToken(token);
    await this.usersRepository.save(account);
    await this.tokenRepository.saveSingle(token);

    await this.mailProvider.sendMail({
      to: {
        name: account.username.value,
        email: account.email.value,
      },
      from: {
        name: `${process.env.MAILER_DISPLAY_NAME}`,
        email: `${process.env.MAILER_USERNAME}`
      },
      subject: 'Recuperação de Senha',
      body: RecoveryEmailTemplate(account.username.value, token.id)
    })

    return right(token);
  }
}
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
    private mailProvider: IMailProvider
  ) { }

  async execute({
    email,
  }: SendRecoveryEmailRequest): Promise<SendRecoveryEmailResponse> {
    const user = await this.usersRepository.findOne(email);

    if (!user) {
      return left(new ParametersErrors('User not found.', 404));
    }

    const token = Token.create({
      type: 'recovery',
      user_id: user.id,
      used: false,
    });

    // const tokenObject = await this.usersRepository.createRecoveryToken(user.id)

    await this.mailProvider.sendMail({
      to: {
        name: user.username.value,
        email: user.email.value,
      },
      from: {
        name: `${process.env.MAILER_DISPLAY_NAME}`,
        email: `${process.env.MAILER_USERNAME}`
      },
      subject: 'Ative sua conta',
      body: RecoveryEmailTemplate(user.username.value, token.id)
    })

    user.addToken(token);
    
    await this.usersRepository.save(user);
    return right(token);
  }
}
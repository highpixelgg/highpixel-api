import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IMailProvider } from "infra/providers/mail/models/IMailProvider";
import { RegistrationEmailTemplate } from "infra/providers/mail/templates/RegistrationMailTemplate";
import { Email } from "modules/accounts/domain/email";
import { Name } from "modules/accounts/domain/name";
import { Password } from "modules/accounts/domain/password";
import { Token } from "modules/accounts/domain/Token";
import { User } from "../../domain/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequest } from "./CreateUserDTO";

type CreateUserResponse = Either<ParametersErrors, User>

export class CreateUser {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider,
  ) { }

  async execute({ name, email, password }: ICreateUserRequest): Promise<CreateUserResponse> {
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const accountOrErr = User.create({
      username: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
    });

    if (accountOrErr.isLeft()) {
      return left(accountOrErr.value);
    }

    const account = accountOrErr.value;

    const emailAleardyExists = await this.usersRepository.exists(account.email.value);

    if (emailAleardyExists) {
      return left(new ParametersErrors('Invalid email', 400));
    }

    // Here is called the email sending service,
    // where the email will be sent to the user to confirm.
    const token = Token.create({
      type: 'activation',
      user_id: account.id,
      used: false,
    })
    account.addToken(token)

    await this.usersRepository.create(account);
    await this.mailProvider.sendMail({
      to: {
        name: account.username.value,
        email: account.email.value,
      },
      from: {
        name: `${process.env.DISPLAY_NAME}`,
        email: `${process.env.EMAIL_USERNAME}`
      },
      subject: 'Ative sua conta',
      body: RegistrationEmailTemplate(account.username.value, token.id)
    })

    return right(account)
  }
}
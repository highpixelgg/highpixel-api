import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IMailProvider } from "infra/providers/mail/models/IMailProvider";
import { RegistrationEmailTemplate } from "infra/providers/mail/templates/RegistrationMailTemplate";
import { Token } from "modules/accounts/domain/Token";
import { User } from "../../domain/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequest } from "./CreateUserDTO";

type CreateUserResponse = Either<ParametersErrors, ICreateUserRequest>

export class CreateUser {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) { }

  async execute({ name, email, password }: ICreateUserRequest): Promise<CreateUserResponse> {
    if (!name || name.trim().length < 2 || name.trim().length > 50) {
      return left(new ParametersErrors('Invalid name.', 400))
    }

    if (!email || email.trim().length > 255 || !email.trim().includes('@')) {
      return left(new ParametersErrors('Invalid email.', 400))
    }

    if (!password || password.trim().length < 6 || password.trim().length > 100) {
      return left(new ParametersErrors('Invalid password.', 400))
    }

    const emailExists = await this.usersRepository.findUserByEmail(email);
    if (emailExists) {
      return left(new ParametersErrors("Email already in use.", 409));
    }

    const userOrError = User.create({
      name,
      email,
      password,
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    const token = Token.create({
      type: 'activation',
      user_id: user.id,
      used: false,
    })
    user.addToken(token)

    await this.usersRepository.create(user);
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: `${process.env.DISPLAY_NAME}`,
        email: `${process.env.EMAIL_USERNAME}`
      },
      subject: 'Ative sua conta',
      body: RegistrationEmailTemplate(user.name, token.id)
    })
    return right(user)
  }
}
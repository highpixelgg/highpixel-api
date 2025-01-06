import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { Token } from "modules/accounts/domain/Token";
import { IMailProvider } from "../../../../infra/providers/models/IMailProvider";
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
      return left(new ParametersErrors("Email already in use.", 400));
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
      body: `<h2>Olá ${user.name}!</h2> <p>Muito obrigado por se registrar no Low Racing! Clique no botão abaixo para verificar seu e-mail. Se você não solicitou este registro recomendamos que entre em contato conosco.</p><br><h4>${token.id}<br><br><h4>Tenha uma otima semana.</h4><br><h4>Feito com amor pela equipe Low Racing.</h4>`
    })
    return right(user)
  }
}
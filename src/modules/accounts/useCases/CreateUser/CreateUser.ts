import { IMailProvider } from "../../../../infra/providers/models/IMailProvider";
import { User } from "../../domain/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUser {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) { }

  async execute({ name, email, password }: ICreateUserDTO) {
    const user = User.create({
      name,
      email,
      password, //await bcrypt.hash(password, 10),
    });

    await this.usersRepository.create(user);
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: 'Low Racing',
        email: 'contactlowracing@gmail.com'
      },
      subject: 'Ative sua conta',
      body: '<h2>Ativação de conta</h2> <p>Clique no link abaixo para ativar sua conta na plataforma do Low Racing.</p> <br> <p>{ Link }</p>'
    })
  }
}
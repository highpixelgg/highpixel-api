import { IMailProvider } from "../../../../infra/providers/models/IMailProvider";
import { User } from "../../domain/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUser {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) { }

  async execute({name, email, password}: ICreateUserDTO) {
    // const userAlreadyExists = await this.usersRepository.getUserByEmail(data.email)
    // if (userAlreadyExists) {
    //   throw new Error('User already exists.')
    // }

    // const user = new User(data);
    
    // await this.usersRepository.create(user)

    // await this.usersRepository.save(user)
    // await this.mailProvider.sendMail({
    //   to: {
    //     name: data.name,
    //     email: data.email,
    //   },
    //   from: {
    //     name: 'Low Racing',
    //     email: 'contactlowracing@gmail.com'
    //   },
    //   subject: 'Ative sua conta',
    //   body: '<h2>Ativação de conta</h2> <p>Clique no link abaixo para ativar sua conta na plataforma do Low Racing.</p> <br> <p>{ Link }</p>'
    // })
  }
}
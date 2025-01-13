import { Either, left, right } from 'core/logic/Either';
import dayjs from 'dayjs';
import { ITokensRepository } from 'modules/accounts/repositories/ITokensRepository';
import { IUserRepository } from 'modules/accounts/repositories/IUserRepository';
import { Token } from 'modules/accounts/domain/Token';
import { ParametersErrors } from 'core/domain/errors/ParameterErrors';
import { IActivateUserRequest } from './ActivationUserDTO';
import { Notification } from 'modules/accounts/domain/Notification';

type ActivateUserResponse = Either<ParametersErrors, Token>;

export class ActivateUser {
  constructor(
    private usersRepository: IUserRepository,
    private tokenRepository: ITokensRepository
  ) { }

  async execute({ id }: IActivateUserRequest): Promise<ActivateUserResponse> {
    const token = await this.tokenRepository.getById(id);

    if (!token) {
      return left(new ParametersErrors('Token Not Found', 404));
    }

    if (token.type !== 'activation') {
      return left(new ParametersErrors('Invalid Token', 400));
    }

    if (token.used) {
      return left(new ParametersErrors('Token already used', 400));
    }

    if (dayjs().isAfter(dayjs.unix(token.expiresIn))) {
      return left(new ParametersErrors('Token expired', 400));
    }

    const account = await this.usersRepository.findOne(token.userId);

    const notify = Notification.create({
      read: false,
      small:
        'Hey ' +
        account.username.value +
        ', é ótimo ter você por aqui! Lembre-se que esta é uma versão Beta da plataforma. Se você estiver com alguma dúvida, ou encontrar algum erro, não hesite em entrar em contato com nosso time de suporte no Discord!',
      userid: account.id,
    });

    account.markAsVerified = true;
    account.addNotification(notify)

    // mark the request token to used
    // await this.usersRepository.markActivationTokenHasUsed(token)

    token.MarkHasUsed = true;
    await this.usersRepository.save(account);
    await this.tokenRepository.saveSingle(token);

    return right(token);
  }
}
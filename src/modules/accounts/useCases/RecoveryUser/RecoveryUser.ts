import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import dayjs from "dayjs";
import { Password } from "modules/accounts/domain/password";
import { Token } from "modules/accounts/domain/Token";
import { ITokensRepository } from "modules/accounts/repositories/ITokensRepository";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";
import { IRecoveryPasswordRequest } from "./RecoveryUserDTO";

type RecoveryPasswordResponse = Either<ParametersErrors, Token>;

export class RecoveryPassword {
  constructor(
    private usersRepository: IUserRepository,
    private tokensRepository: ITokensRepository
  ) { }

  async execute({
    id,
    password,
  }: IRecoveryPasswordRequest): Promise<RecoveryPasswordResponse> {
    const token = await this.tokensRepository.getById(id);

    if (!token) {
      return left(new ParametersErrors('Token not found.', 404));
    }

    if (token.type !== 'recovery') {
      return left(new ParametersErrors('Invalid token type.', 400));
    }

    if (token.used) {
      return left(new ParametersErrors('This recovery link has already been used. Please request a new password recovery.', 400));
    }

    const isExpired = dayjs().isAfter(dayjs.unix(token.expiresIn));
    if (isExpired) {
      return left(new ParametersErrors('Recovery link has expired. Please request a new password recovery.', 401));
    }

    const account = await this.usersRepository.findOne(token.userId);
    if (!account) {
      return left(new ParametersErrors('User not found.', 404));
    }

    const passwordOrError = Password.create(password);
    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    account.setPassword = passwordOrError.value;
    token.MarkHasUsed = true;

    await this.tokensRepository.saveSingle(token);
    await this.usersRepository.save(account);

    return right(token);
  }
}
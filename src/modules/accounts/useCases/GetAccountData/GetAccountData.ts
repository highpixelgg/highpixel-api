import { User } from "modules/accounts/domain/User";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";

type GetAccountDataResponse = Either<ParametersErrors, User>;

export class GetAccountData {
  constructor(private usersRepository: IUserRepository) { }

  async execute({ user }): Promise<GetAccountDataResponse> {
    const account = await this.usersRepository.findOne(user.id);

    if (!account) {
      return left(new ParametersErrors('User not exists', 404));
    }

    return right(account);
  }
}
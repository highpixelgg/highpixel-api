import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { User } from "modules/accounts/domain/User";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";
import { IGetAccountDataRequest } from "./GetAccountDataDTO";

type GetAccountDataResponse = Either<ParametersErrors, User>;

export class GetAccountData {
  constructor(private usersRepository: IUserRepository) { }

  async execute({ ident }: IGetAccountDataRequest): Promise<GetAccountDataResponse> {
    const account = await this.usersRepository.findOne(ident);

    if (!account) {
      return left(new ParametersErrors('User not exists', 404));
    }

    return right(account);
  }
}
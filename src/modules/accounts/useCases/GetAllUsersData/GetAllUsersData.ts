import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, right } from "@core/logic/Either";
import { User } from "@modules/accounts/domain/User";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

type GetAllUsersRequest = {
  authorId: string,
};

type GetAllUsersResponse = Either<ParametersErrors, User[]>

export class GetAllUsersData {
  constructor(
    private userRepository: IUserRepository,
  ) { }

  async execute({ authorId }: GetAllUsersRequest): Promise<GetAllUsersResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    // if (!userExist) {
    //   return left(new ParametersErrors('User not found.'))
    // }

    const users = await this.userRepository.findAll();

    return right(users)
  }
}
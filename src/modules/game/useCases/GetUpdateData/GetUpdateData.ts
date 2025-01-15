import { Update } from "@modules/game/domain/Update";
import { IUpdateRepository } from "@modules/game/repositories/IUpdateRepository";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";

type DeleteUpdateRequest = {
  updateId: string;
  authorId: string,
};

type GetUpdateDataResponse = Either<ParametersErrors, Update>;

export class GetUpdateData {
  constructor(
    private updatesRepository: IUpdateRepository,
    private userRepository: IUserRepository,
  ) { }

  async execute({ updateId, authorId }: DeleteUpdateRequest): Promise<GetUpdateDataResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    if (userExist.role !== "ADMIN") {
      return left(new ParametersErrors('Access denied.'))
    }

    if (!updateId) {
      return left(new ParametersErrors('Update not found.'))
    }

    const update = await this.updatesRepository.findOne(updateId);
    if (!update) {
      return left(new ParametersErrors('Update not found.'))
    }

    return right(update)
  }
}
import { Update } from "@modules/game/domain/Update";
import { IUpdateRepository } from "@modules/game/repositories/IUpdateRepository";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";

type RecentUpdateRequest = {
  authorId: string,
};

type GetUpdateDataResponse = Either<ParametersErrors, Update>;

export class GetRecentUpdateData {
  constructor(
    private updatesRepository: IUpdateRepository,
    private userRepository: IUserRepository,
  ) { }

  async execute({ authorId }: RecentUpdateRequest): Promise<GetUpdateDataResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    // if (userExist.role !== "ADMIN") {
    //   return left(new ParametersErrors('Access denied.'))
    // }

    const update = await this.updatesRepository.findRecentUpdate();

    return right(update)
  }
}
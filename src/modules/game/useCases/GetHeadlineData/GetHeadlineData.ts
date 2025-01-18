import { Headline } from "@modules/game/domain/Headline";
import { Update } from "@modules/game/domain/Update";
import { IHeadlineRepository } from "@modules/game/repositories/IHeadlineRepository";
import { IUpdateRepository } from "@modules/game/repositories/IUpdateRepository";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";

type GetHeadlineRequest = {
  headlineId: string;
  authorId: string,
};

type GetHeadlineDataResponse = Either<ParametersErrors, Headline>;

export class GetHeadlineData {
  constructor(
    private headlinesRepository: IHeadlineRepository,
    private userRepository: IUserRepository,
  ) { }

  async execute({ headlineId, authorId }: GetHeadlineRequest): Promise<GetHeadlineDataResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    // if (userExist.role !== "ADMIN") {
    //   return left(new ParametersErrors('Access denied.'))
    // }

    if (!headlineId) {
      return left(new ParametersErrors('Headline not found.'))
    }

    const headline = await this.headlinesRepository.findOne(headlineId);
    if (!headline) {
      return left(new ParametersErrors('Update not found.'))
    }

    return right(headline)
  }
}
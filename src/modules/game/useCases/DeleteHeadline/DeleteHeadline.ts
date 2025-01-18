import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, left, right } from "@core/logic/Either";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IHeadlineRepository } from "@modules/game/repositories/IHeadlineRepository";

type DeleteHeadlineRequest = {
  headlineId: string;
  authorId: string,
};

type DeleteHeadlineResponse = Either<ParametersErrors, boolean>

export class DeleteHeadline {
  constructor(
    private userRepository: IUserRepository,
    private headlineRepository: IHeadlineRepository,
  ) { }

  async execute({ headlineId, authorId }: DeleteHeadlineRequest): Promise<DeleteHeadlineResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    if (userExist.role !== "ADMIN") {
      return left(new ParametersErrors('Access denied.'))
    }

    if (!headlineId) {
      return left(new ParametersErrors('Headline not found.'))
    }

    const headline = await this.headlineRepository.findOne(headlineId);
    await this.headlineRepository.delete(headline)

    return right(true)
  }
}
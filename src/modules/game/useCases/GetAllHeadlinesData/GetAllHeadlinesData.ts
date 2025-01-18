import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, left, right } from "@core/logic/Either";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { Headline } from "@modules/game/domain/Headline";
import { IHeadlineRepository } from "@modules/game/repositories/IHeadlineRepository";

type GetAllHeadlinesRequest = {
  authorId: string,
};

type GetAllHeadlinesResponse = Either<ParametersErrors, Headline[]>

export class GetAllHeadlinesData {
  constructor(
    private headlinesRepository: IHeadlineRepository,
    private userRepository: IUserRepository,
  ) { }

  async execute({ authorId }: GetAllHeadlinesRequest): Promise<GetAllHeadlinesResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    if (!userExist) {
      return left(new ParametersErrors('User not found.'))
    }

    const headlines = await this.headlinesRepository.findAll();

    return right(headlines)
  }
}
import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, left, right } from "@core/logic/Either";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { Headline } from "@modules/game/domain/Headline";
import { IHeadlineRepository } from "@modules/game/repositories/IHeadlineRepository";

type CreateHeadlineRequest = {
  title: string,
  description: string,
  img: string,
  authorId: string,
};

type CreateHeadlineResponse = Either<ParametersErrors, Headline>

export class CreateHeadline {
  constructor(
    private headlineRepository: IHeadlineRepository,
    private userRepository: IUserRepository,
  ) { }

  async execute({ title, description, img, authorId }: CreateHeadlineRequest): Promise<CreateHeadlineResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    if (!userExist) {
      return left(new ParametersErrors('User not found.'))
    }

    if (userExist.role !== "ADMIN") {
      return left(new ParametersErrors('Acess denied.'))
    }

    if (!title || !description || !img) {
      return left(new ParametersErrors('Invalid field.'))
    }

    const headlineOrErr = Headline.create({
      title,
      description,
      img,
      createAt: new Date(),
    });

    if (headlineOrErr.isLeft()) {
      return left(headlineOrErr.value);
    }

    const headline = headlineOrErr.value;
    await this.headlineRepository.create(headline);

    return right(headline)
  }
}
import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, left, right } from "@core/logic/Either";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { Update } from "@modules/game/domain/Update";
import { IUpdateRepository } from "@modules/game/repositories/IUpdateRepository";

type CreateUpdateRequest = {
  product: string,
  version: string,
  download: string,
  changelogs: string,
  authorId: string,
};

type CreateUpdateResponse = Either<ParametersErrors, Update>

export class CreateUpdate {
  constructor(
    private updateRepository: IUpdateRepository,
    private userRepository: IUserRepository,

  ) { }

  async execute({ product, version, download, changelogs, authorId }: CreateUpdateRequest): Promise<CreateUpdateResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    if (!userExist) {
      return left(new ParametersErrors('User not found.'))
    }

    if (userExist.role !== "ADMIN") {
      return left(new ParametersErrors('Acess denied.'))
    }

    if (!product || !version || !download || !changelogs) {
      return left(new ParametersErrors('Invalid field.'))
    }

    const updateOrErr = Update.create({
      product,
      version,
      download,
      release: new Date(),
      changelogs,
    });
    
    if (updateOrErr.isLeft()) {
      return left(updateOrErr.value);
    }

    const game = updateOrErr.value;
    await this.updateRepository.create(game);

    return right(game)
  }
}
import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, left, right } from "@core/logic/Either";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUpdateRepository } from "@modules/game/repositories/IUpdateRepository";

type DeleteUpdateRequest = {
  updateId: string;
  authorId: string,
};

type DeleteUpdateResponse = Either<ParametersErrors, boolean>

export class DeleteUpdate {
  constructor(
    private userRepository: IUserRepository,
    private updateRepositoy: IUpdateRepository,
  ) { }

  async execute({ updateId, authorId }: DeleteUpdateRequest): Promise<DeleteUpdateResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    if (userExist.role !== "ADMIN") {
      return left(new ParametersErrors('Access denied.'))
    }

    if (!updateId) {
      return left(new ParametersErrors('Update not found.'))
    }

    const update = await this.updateRepositoy.findOne(updateId);
    await this.updateRepositoy.delete(update)

    return right(true)
  }
}
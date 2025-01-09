import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IProfilesRepository } from "modules/social/repositories/IProfileRepository";
import { IVisitorRepository } from "modules/social/repositories/IVisitorRepository";
import { Visitor } from "modules/social/domain/profile/Visitor";

type GetProfileVisitorsRequest = {
  visitors_id: string;
};

type GetProfileVisitorsResponse = Either<ParametersErrors, Visitor[]>;

export class GetProfileVisitors {
  constructor(
    private visitorsRepository: IVisitorRepository,
    private profilesRepository: IProfilesRepository
  ) { }

  async execute({
    visitors_id,
  }: GetProfileVisitorsRequest): Promise<GetProfileVisitorsResponse> {
    const exists = await this.profilesRepository.exists(visitors_id);

    if (!exists) {
      return left(new ParametersErrors('Profile not found.'));
    }

    const visitors = await this.visitorsRepository.findAllByProfileParams({
      visitors_id,
    });

    return right(visitors);
  }
}
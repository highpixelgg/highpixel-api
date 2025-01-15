import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, left, right } from "@core/logic/Either";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { Vehicle } from "@modules/game/domain/Vehicle";
import { IVehiclesRepository } from "@modules/game/repositories/IVehicleRepository";

type GetAllVehicleRequest = {
  authorId: string,
};

type GetAllVehiclesResponse = Either<ParametersErrors, Vehicle[]>

export class GetAllVehicleData {
  constructor(
    private vehiclesRepository: IVehiclesRepository,
    private userRepository: IUserRepository,
  ) { }

  async execute({ authorId }: GetAllVehicleRequest): Promise<GetAllVehiclesResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    if (!userExist) {
      return left(new ParametersErrors('User not found.'))
    }

    if (userExist.role !== "ADMIN") {
      return left(new ParametersErrors('Access denied.'))
    }

    const vehicles = await this.vehiclesRepository.findAll();

    return right(vehicles)
  }
}
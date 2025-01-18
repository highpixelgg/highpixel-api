import { Vehicle } from "@modules/game/domain/Vehicle";
import { IVehiclesRepository } from "@modules/game/repositories/IVehicleRepository";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";

type GetVehicleDataRequest = {
  vehicleId: string;
  authorId: string,
};

type GetVehicleDataResponse = Either<ParametersErrors, Vehicle>;

export class GetVehicleData {
  constructor(
    private vehiclesRepository: IVehiclesRepository,
    private userRepository: IUserRepository,
  ) { }

  async execute({ vehicleId, authorId }: GetVehicleDataRequest): Promise<GetVehicleDataResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    // if (userExist.role !== "ADMIN") {
    //   return left(new ParametersErrors('Access denied.'))
    // }

    if (!vehicleId) {
      return left(new ParametersErrors('Vehicle not found.'))
    }

    const vehicle = await this.vehiclesRepository.findOne(vehicleId);
    if(!vehicle) {
      return left(new ParametersErrors('Vehicle not found.'))
    }

    return right(vehicle)
  }
}
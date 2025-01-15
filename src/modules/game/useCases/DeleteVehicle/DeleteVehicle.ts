import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, left, right } from "@core/logic/Either";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUpdateRepository } from "@modules/game/repositories/IUpdateRepository";
import { IVehiclesRepository } from "@modules/game/repositories/IVehicleRepository";

type DeleteVehicleRequest = {
  vehicleId: string;
  authorId: string,
};

type DeleteVehicleResponse = Either<ParametersErrors, boolean>

export class DeleteVehicle {
  constructor(
    private userRepository: IUserRepository,
    private vehicleRepository: IVehiclesRepository,
  ) { }

  async execute({ vehicleId, authorId }: DeleteVehicleRequest): Promise<DeleteVehicleResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    if (userExist.role !== "ADMIN") {
      return left(new ParametersErrors('Access denied.'))
    }

    if (!vehicleId) {
      return left(new ParametersErrors('Update not found.'))
    }

    const vehicle = await this.vehicleRepository.findOne(vehicleId);
    await this.vehicleRepository.delete(vehicle)
    
    return right(true)
  }
}
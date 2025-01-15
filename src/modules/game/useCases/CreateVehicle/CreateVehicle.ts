import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, left, right } from "@core/logic/Either";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { Vehicle } from "@modules/game/domain/Vehicle";
import { IVehiclesRepository } from "@modules/game/repositories/IVehicleRepository";

type CreateVehicleRequest = {
  name: string,
  type: string,
  price: number,
  authorId: string,
};

type CreateVehicleResponse = Either<ParametersErrors, Vehicle>

export class CreateVehicle {
  constructor(
    private vehiclesRepository: IVehiclesRepository,
    private userRepository: IUserRepository,
  ) { }

  async execute({ name, type, price, authorId }: CreateVehicleRequest): Promise<CreateVehicleResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    if (!userExist) {
      return left(new ParametersErrors('User not found.'))
    }

    if (userExist.role !== "ADMIN") {
      return left(new ParametersErrors('Access denied.'))
    }

    if (!name || !type || !price) {
      return left(new ParametersErrors('Invalid field.'))
    }

    const vehicleOrErr = Vehicle.create({
      name,
      type,
      price,
      createdAt: new Date(),
    });

    if (vehicleOrErr.isLeft()) {
      return left(vehicleOrErr.value);
    }

    const vehicle = vehicleOrErr.value;
    await this.vehiclesRepository.create(vehicle);

    return right(vehicle)
  }
}
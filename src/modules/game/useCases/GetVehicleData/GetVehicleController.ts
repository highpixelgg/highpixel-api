import { Controller } from "@core/infra/Controller";
import { clientError, created, HttpResponse, ok } from "@core/infra/HttpResponse";
import { GetVehicleData } from "./GetVehicle";

type GetVehicleControllerRequest = {
  vehicleId: string;
  user: { id: string },
};

export class GetVehicleDataController implements Controller {
  constructor(private getVehicleData: GetVehicleData) { }

  async handle({ vehicleId, user }: GetVehicleControllerRequest): Promise<HttpResponse> {
    const result = await this.getVehicleData.execute({
      vehicleId,
      authorId: user.id,
    });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return ok({
        ...result.value,
      });
    }
  }
}
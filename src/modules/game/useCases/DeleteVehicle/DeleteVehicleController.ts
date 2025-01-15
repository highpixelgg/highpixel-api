import { Controller } from "@core/infra/Controller";
import { HttpResponse, clientError, created } from "@core/infra/HttpResponse";
import { DeleteUpdate } from "../DeleteUpdate/DeleteUpdate";
import { DeleteVehicle } from "./DeleteVehicle";

type DeleteVehicleControllerRequest = {
  vehicleId: string;
  user: { id: string },
};

export class DeleteVehicleController implements Controller {
  constructor(private deleteVehicle: DeleteVehicle) { }

  async handle({
    vehicleId,
    user,
  }: DeleteVehicleControllerRequest): Promise<HttpResponse> {
    const result = await this.deleteVehicle.execute({
      vehicleId,
      authorId: user.id,
    });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return created();
    }
  }
} 
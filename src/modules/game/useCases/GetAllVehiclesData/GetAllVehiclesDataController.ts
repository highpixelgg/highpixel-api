import { Controller } from "core/infra/Controller";
import { clientError, HttpResponse, ok } from "core/infra/HttpResponse";
import { GetAllVehicleData } from "./GetAllVehiclesData";

type GetAllVehiclesControllerRequest = {
  user: { id: string },
};

export class GetAllVehiclesController implements Controller {
  constructor(private getAllVehicleData: GetAllVehicleData) { }

  async handle({ user }: GetAllVehiclesControllerRequest): Promise<HttpResponse> {
    const result = await this.getAllVehicleData.execute({
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
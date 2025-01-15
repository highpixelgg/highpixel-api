import { Controller } from "core/infra/Controller";
import { clientError, created, HttpResponse } from "core/infra/HttpResponse";
import { CreateVehicle } from "./CreateVehicle";

type CreateVehicleControllerRequest = {
  name: string,
  type: string,
  price: number,
  user: { id: string },
};

export class CreateVehicleController implements Controller {
  constructor(private createVehicle: CreateVehicle) { }

  async handle({
    name,
    type,
    price,
    user,
  }: CreateVehicleControllerRequest): Promise<HttpResponse> {
    const result = await this.createVehicle.execute({
      name,
      type, 
      price, 
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
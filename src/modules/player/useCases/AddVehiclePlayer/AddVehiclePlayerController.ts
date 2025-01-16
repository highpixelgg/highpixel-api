import { Controller } from "@core/infra/Controller";
import { clientError, HttpResponse, ok } from "@core/infra/HttpResponse";
import { AddVehiclePlayer } from "./AddVehiclePlayer";

type AddVehiclePlayerControllerRequest = {
  nickname: string;
  vehicleId: string;
  user: { id: string },
};

export class AddVehiclePlayerController implements Controller {
  constructor(private addVehiclePlayer: AddVehiclePlayer) { }

  async handle({ nickname, vehicleId, user }: AddVehiclePlayerControllerRequest): Promise<HttpResponse> {
    const result = await this.addVehiclePlayer.execute({
      nickname,
      vehicleId,
      authorId: user.id,
    });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return ok();
    }
  }
}
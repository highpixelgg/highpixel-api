import { Controller } from "core/infra/Controller";
import { clientError, HttpResponse, ok } from "core/infra/HttpResponse";
import { GetAllUsersData } from "./GetAllUsersData";

export class GetAllUsersController implements Controller {
  constructor(private getAllUsersData: GetAllUsersData) { }

  async handle(): Promise<HttpResponse> {
    const result = await this.getAllUsersData.execute();

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      const users = result.value.map(user => ({
        _id: user.id,
        username: user.props.username.value,
        email: user.props.email.value,
        role: user.props.role,
        isPremium: user.props.isPremium
      }));

      return ok(users);
    }
  }
} 
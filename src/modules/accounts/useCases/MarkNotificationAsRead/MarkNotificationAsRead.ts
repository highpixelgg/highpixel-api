import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, left, right } from "@core/logic/Either";
import { INotificationsRepository } from "@modules/accounts/repositories/INotificationsRepository";

type MarkNotificationAsReadRequest = {
  id: string;
};

type MarkNotificationAsReadResponse = Either<ParametersErrors, boolean>;

export class MarkNotificationAsRead {
  constructor(private notificationsRepository: INotificationsRepository) { }

  async execute({
    id,
  }: MarkNotificationAsReadRequest): Promise<MarkNotificationAsReadResponse> {
    const exists = await this.notificationsRepository.exists(id);

    if (!exists) {
      return left(new ParametersErrors('Notification not found', 404));
    }

    const notification = await this.notificationsRepository.findById(id);

    if (notification.read) {
      return left(new ParametersErrors('Notification already read', 400));
    }

    notification.markAsRead = true;
    await this.notificationsRepository.saveSingle(notification);

    return right(true);
  }
}
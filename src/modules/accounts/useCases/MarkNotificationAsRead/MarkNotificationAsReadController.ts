import { Controller } from 'core/infra/Controller';
import { clientError, HttpResponse, ok } from 'core/infra/HttpResponse';
import { MarkNotificationAsRead } from './MarkNotificationAsRead';

type MarkNotificationAsReadRequestController = {
  id: string;
};

export class MarkNotificationAsReadController implements Controller {
  constructor(private markNotificationAsRead: MarkNotificationAsRead) { }

  async handle({ id }: MarkNotificationAsReadRequestController): Promise<HttpResponse> {
    const result = await this.markNotificationAsRead.execute({ id });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return ok();
    }
  }
}
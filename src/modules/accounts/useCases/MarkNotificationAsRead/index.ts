import { Controller } from "core/infra/Controller";
import { PrismaNotificationsRepository } from "modules/accounts/repositories/implementations/PrismaNotificationsRepository";
import { MarkNotificationAsRead } from "./MarkNotificationAsRead";
import { MarkNotificationAsReadController } from "./MarkNotificationAsReadController";

export function makeNotificationController(): Controller {
  const repository = new PrismaNotificationsRepository();
  const useCase = new MarkNotificationAsRead(repository);
  const controller = new MarkNotificationAsReadController(useCase);

  return controller;
}
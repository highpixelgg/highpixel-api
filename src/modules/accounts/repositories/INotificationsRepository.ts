import { Notification } from "../domain/Notification";
import { Notifications } from "../domain/Notifications";

export interface INotificationsRepository {
  exists(id: string): Promise<boolean>;
  findById(id: string): Promise<Notification>;
  save(notifications: Notifications): Promise<void>;
  create(notifications: Notifications): Promise<void>;
  saveSingle(notification: Notification): Promise<void>;
}
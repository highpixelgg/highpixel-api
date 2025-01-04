import { User } from "../domain/User";

export interface IUserRepository {
    exists(email: string): Promise<boolean>;
    findUserBySlug(email: string): Promise<boolean>;
    save(user: User): Promise<void>;
    create(user: User): Promise<void>;
}
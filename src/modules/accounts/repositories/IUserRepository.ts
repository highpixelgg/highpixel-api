import { User } from "../domain/User";

export interface IUserRepository {
    exists(email: string, slug: string): Promise<boolean>
    create(user: User): Promise<void>
    save(user: User): Promise<void>;
}
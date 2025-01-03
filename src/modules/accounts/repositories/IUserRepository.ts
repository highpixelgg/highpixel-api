import { User } from "../domain/User";

export interface IUserRepository {
    exists(email: string): Promise<boolean>;
    findOne(email: string): Promise<User>;
    create(user: User): Promise<void>;
    save(user: User): Promise<void>;
}
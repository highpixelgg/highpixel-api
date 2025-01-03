import { User } from "../domain/User";

export interface IUserRepository {
    exists(email: string): Promise<boolean>;
    findOne(email: string): Promise<User>;
    save(user: User): Promise<void>;
    create(user: User): Promise<void>;
}
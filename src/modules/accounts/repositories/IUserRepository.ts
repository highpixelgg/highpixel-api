import { Prisma } from "@prisma/client";
import { User } from "../domain/User";

export interface IUserRepository {
    findUserByEmail(email: string): Promise<boolean>;
    findUserBySlug(slug: string): Promise<boolean>;
    findOne(ident: string): Promise<User>;
    getUserSuggestions(userId: string): Promise<void>;
    update(userId: string, data: Prisma.UserUpdateInput): Promise<void>;
    create(user: User): Promise<void>;
    save(user: User): Promise<void>;
}

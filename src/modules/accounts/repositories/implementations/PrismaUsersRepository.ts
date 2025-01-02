import { prisma } from "../../../../infra/prisma/prisma-client";
import { User } from "../../domain/User";
import { UserMapper } from "../../mappers/UserMapper";
import { IUserRepository } from "../IUserRepository";

export class PrismaUsersRepository implements IUserRepository {
  async exists(userOrEmail: string): Promise<boolean> {
    const query = await prisma.user.findFirst({
      where: {
        OR: [{
          email: userOrEmail,
          slug: userOrEmail
        }]
      }
    })
    return !!query
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    const query = await prisma.user.create({ data });
    console.log(query)
  }

  async save(user: User): Promise<void> {
  }

}
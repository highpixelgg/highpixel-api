import { prisma } from "../../../../infra/prisma/prisma-client";
import { User } from "../../domain/User";
import { UserMapper } from "../../mappers/UserMapper";
import { IUserRepository } from "../IUserRepository";

export class PrismaUsersRepository implements IUserRepository {
  async exists(email: string): Promise<boolean> {
    const query = await prisma.user.findFirst({
      where: {
        email,
      }
    })
    return !!query
  }

  async findOne(email: string): Promise<User> {
    const query = await prisma.user.findFirst({
      where: {
        email
      },
      include: {
        tweets: true,
        likes: true,
      }
    })

    if (!query) {
      return null;
    }
    return UserMapper.toDomain(query);
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);
    await prisma.user.create({ data });
  }

  async save(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      }
    })
  }
}
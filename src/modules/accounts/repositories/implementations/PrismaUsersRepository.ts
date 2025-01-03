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

  async findOne(ident: string): Promise<User> {
    const query = await prisma.user.findFirst({
      where: {
        OR: [{ email: ident }, { slug: ident }]
      },
      include: {
        tweets: true,
        likes: true,
      }
    })
    return 
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
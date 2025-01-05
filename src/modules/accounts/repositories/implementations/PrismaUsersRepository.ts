import slug from "slug";
import { prisma } from "../../../../infra/prisma/prisma-client";
import { User } from "../../domain/User";
import { UserMapper } from "../../mappers/UserMapper";
import { IUserRepository } from "../IUserRepository";

export class PrismaUsersRepository implements IUserRepository {
  async findUserByEmail(email: string): Promise<boolean> {
    const query = await prisma.user.findFirst({
      where: {
        email,
      }
    });
    return !!query;
  }

  async findUserBySlug(slug: string): Promise<boolean> {
    const query = await prisma.user.findFirst({
      where: {
        slug,
      },
    });
    return !!query;
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    let genSlug = true;
    let userSlug = slug(data.name);
    while (genSlug) {
      const hasSlug = await this.findUserBySlug(userSlug);
      if (hasSlug) {
        let slugSuffix = Math.floor(Math.random() * 999999).toString().toLowerCase();
        userSlug = slug(data.name + slugSuffix);
      } else {
        genSlug = false;
      }
    }

    data.slug = userSlug;

    await prisma.user.create({
      data: {
        ...data,
        slug: userSlug,
      },
    });
  }

  async save(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    const existingUser = await prisma.user.findUnique({
      where: { id: data.id },
    });

    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
  }
}

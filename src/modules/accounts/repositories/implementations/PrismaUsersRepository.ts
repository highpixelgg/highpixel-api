import { prisma } from "../../../../infra/prisma/prisma-client";
import { User } from "../../domain/User";
import { UserMapper } from "../../mappers/UserMapper";
import { INotificationsRepository } from "../INotificationsRepository";
import { ITokensRepository } from "../ITokensRepository";
import { IUserRepository } from "../IUserRepository";

export class PrismaUsersRepository implements IUserRepository {
  constructor(
    private notificationsRepository?: INotificationsRepository,
    private tokensRepository?: ITokensRepository,
  ) { }

  async exists(userOrEmail: string): Promise<boolean> {
    const dbQuery = await prisma.user.findFirst({
      where: {
        OR: [{ email: userOrEmail }, { username: userOrEmail }],
      },
    });

    return !!dbQuery;
  }

  async findOne(ident: string): Promise<User> {
    const dbQuery = await prisma.user.findFirst({
      where: {
        OR: [{ username: ident }, { id: ident }, { email: ident }],
      },
      include: {
        Profile: true,
        Player: true,
      },
    });

    if (!dbQuery) {
      return null;
    }

    return UserMapper.toDomain(dbQuery);
  }

  async findAll(): Promise<User[]> {
    const dbQuery = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Profile: true,
        Player: true,
        notifications: true,
      }
    });

    return dbQuery.map(user => UserMapper.toDomain(user));
  }

  async save(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });

    if (this.notificationsRepository) {
      this.notificationsRepository.save(user.notifications);
    }

    if (this.tokensRepository) {
      this.tokensRepository.save(user.tokens);
    }
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);
    const randomSuffixSlug = Math.floor(Math.random() * 999999).toString();

    await prisma.user.create({
      data: {
        ...data,
        Profile: {
          create: {
            nickname: data.username,
            slug: `${data.username}-${randomSuffixSlug}`.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(" ", "-"),
          }
        },
        Player: {
          create: {
            money: 0,
            vehicles: {
              create: []
            },
          }
        }
      }
    });

    if (this.notificationsRepository) {
      this.notificationsRepository.create(user.notifications);
    }

    if (this.tokensRepository) {
      this.tokensRepository.save(user.tokens)
    }
  }
}
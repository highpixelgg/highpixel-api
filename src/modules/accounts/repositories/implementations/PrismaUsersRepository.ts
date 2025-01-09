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

  async exists(email: string): Promise<boolean> {
    const query = await prisma.user.findFirst({
      where: {
        email
      }
    })
    return !!query
  }

  async findOne(ident: string): Promise<User> {
    const query = await prisma.user.findFirst({
      where: {
        OR: [{ email: ident }, { id: ident }],
      },
      include: {
        Profile: true,
        notifications: true,
      },
    });

    if (!query) {
      return null;
    }

    return UserMapper.toDomain(query);
  }

  async save(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...data
      }
    });

    if (this.notificationsRepository) {
      this.notificationsRepository.save(user.notifications);
    }

    if (this.tokensRepository) {
      this.tokensRepository.save(user.Tokens);
    }
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    await prisma.user.create({
      data: {
        ...data,
        Profile: {
          create: {
            slug: data.name,
            nickname: data.name,
            avatar: 'https://i.postimg.cc/4yNScCKL/defaultuser.jpg',
          }
        }
      }
    });

    if (this.notificationsRepository) {
      this.notificationsRepository.create(user.notifications);
    }

    if (this.tokensRepository) {
      this.tokensRepository.save(user.Tokens)
    }
  }}

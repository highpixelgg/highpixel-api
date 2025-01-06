import { Prisma } from "@prisma/client";
import slug from "slug";
import { prisma } from "../../../../infra/prisma/prisma-client";
import { User } from "../../domain/User";
import { UserMapper } from "../../mappers/UserMapper";
import { ITokensRepository } from "../ITokensRepository";
import { ITweetsLikesRepository } from "../ITweetsLikesRepository";
import { ITweetsRepository } from "../ITweetsRepository";
import { IUserRepository } from "../IUserRepository";

export class PrismaUsersRepository implements IUserRepository {
  constructor(
    private TweetsRepositoy?: ITweetsRepository,
    private TweetsLikesRepository?: ITweetsLikesRepository,
    private tokensRepository?: ITokensRepository,
  ) { }
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

  async save(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    await prisma.user.findUnique({
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

  async update(userId: string, data: Prisma.UserUpdateInput): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

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

    if (this.TweetsRepositoy) {
      this.TweetsRepositoy.save(user.Tweet)
    }

    if (this.TweetsLikesRepository) {
      this.TweetsLikesRepository.save(user.TweetLike)
    }

    if (this.tokensRepository) {
      this.tokensRepository.save(user.Tokens)
    }
  }
}

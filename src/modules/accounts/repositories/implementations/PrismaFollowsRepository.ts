import { prisma } from "infra/prisma/prisma-client";
import { Follows } from "modules/accounts/domain/Follows";
import { FollowMapper } from "modules/accounts/mappers/FollowMapper";
import { IFollowRepository } from "../IFollowRepository";
import { User } from "modules/accounts/domain/User";

export class PrismaFollowsRepository implements IFollowRepository {
  async follow(follows: Follows): Promise<void> {
    const data = follows.getItems().map(follow => FollowMapper.toPersistence(follow));

    await prisma.follow.createMany({
      data: await Promise.all(data),
    });
  }

  async unfollow(follows: Follows): Promise<void> {
    const data = follows.getItems().map(unfollow => FollowMapper.toPersistence(unfollow));

    await prisma.follow.createMany({
      data: await Promise.all(data),
    });
  }

  async getUserFollowingCount(userId1: string): Promise<number> {
    const count = await prisma.follow.count({
      where: {
        userId1: userId1,
      },
    });
    return count
  }

  async getUserFollowersCount(userId2: string): Promise<number> {
    const count = await prisma.follow.count({
      where: { userId2: userId2 }
    });
    return count;
  }

  async checkIfFollows(userId1: string, userId2: string): Promise<boolean> {
    const follows = await prisma.follow.findFirst({
      where: { userId1, userId2 }
    });
    return follows ? true : false;
  }

  async getUserFollowing(userId: string): Promise<User[]> {
    const following = [];
    const reqFollow = await prisma.follow.findMany({
        select: { userId2: true },
        where: { userId1: userId }
    });

    for (let reqItem of reqFollow) {
        following.push(reqItem.userId2);
    }

    return following;
  }
}
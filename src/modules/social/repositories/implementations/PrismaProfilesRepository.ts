import { prisma } from '@infra/prisma/prisma-client';
import { Profile } from '@modules/social/domain/profile/Profile';
import { ProfileMapper } from '@modules/social/mappers/ProfileMapper';
import { IFollowsRepository } from '../IFollowsRepository';
import { IProfilesRepository, SearchResponse } from '../IProfileRepository'; // Fixed import

export class PrismaProfilesRepository implements IProfilesRepository {
  constructor(
    private followsRepository?: IFollowsRepository
  ) { }

  async exists(slugORId: string): Promise<boolean> {
    const dbQuery = await prisma.profile.findFirst({
      where: {
        OR: [{ slug: slugORId }, { userId: slugORId }],
      },
    });

    return !!dbQuery;
  }

  async findOne(slugORID: string): Promise<Profile> {
    const dbQuery = await prisma.profile.findFirst({
      where: {
        OR: [{ userId: slugORID }, { slug: slugORID }],
      },
      include: {
        badges: true,
        User: true,
        following: true,
        followers: true,
      },
    });

    return ProfileMapper.toDomain(dbQuery);
  }

  async findAll(): Promise<Profile[]> {
    const dbQuery = await prisma.profile.findMany({
      include: {
        User: true,
        badges: true,
        following: true,
        followers: true,
      },
    });

    return dbQuery.map(profile => ProfileMapper.toDomain(profile));
  }

  async save(profile: Profile): Promise<void> {
    const data = ProfileMapper.toPersistence(profile);

    await prisma.profile.update({
      where: {
        userId: profile.userId,
      },
      data,
    });

    if (this.followsRepository) {
      await this.followsRepository.save(profile.follows);
    }
  }

  async search(
    query: string,
    page: number,
    perPage: number,
    randomize: boolean
  ): Promise<SearchResponse> {
    const totalProfiles = await prisma.profile.count();

    let queryPayload: any = {
      take: perPage,
      skip: randomize
        ? Math.floor(Math.random() * totalProfiles)
        : (page - 1) * perPage || 0,
      where: {},
    };

    if (query) {
      queryPayload.where = {
        OR: [
          {
            User: {
              username: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      };
    }

    if (randomize) {
      queryPayload.orderBy = { id: 'asc' };
    } else {
      queryPayload.orderBy = {
        User: {
          username: 'asc',
        },
      };
    }

    const profiles = await prisma.profile.findMany({
      ...queryPayload,
      include: {
        badges: true,
        User: true,
        following: true,
        followers: true,
      },
    });

    const profileCount = await prisma.profile.aggregate({
      _count: true,
      where: queryPayload.where,
    });

    return {
      data: profiles.map(profile => ProfileMapper.toDomain(profile)),
      totalCount: profileCount._count,
    };
  }
}
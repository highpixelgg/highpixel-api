import { prisma } from '@infra/prisma/prisma-client';
import { Tokens } from '@modules/accounts/domain/Tokens';
import { Token } from '@modules/accounts/domain/Token';
import { TokenMapper } from '../../mappers/TokenMapper';
import { ITokensRepository } from '../ITokensRepository';

export class PrismaTokensRepository implements ITokensRepository {
  async create(tokens: Tokens): Promise<void> {
    const data = tokens
      .getNewItems()
      .map(token => TokenMapper.toPersistence(token));

    await prisma.tokens.createMany({ data });
  }

  async save(tokens: Tokens): Promise<void> {
    if (tokens.getNewItems().length > 0) {
      const data = tokens
        .getNewItems()
        .map(token => TokenMapper.toPersistence(token));

      await prisma.tokens.createMany({
        data,
      });
    }

    if (tokens.getRemovedItems().length > 0) {
      const removeIds = tokens.getRemovedItems().map(token => token.id);

      await prisma.tokens.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      });
    }
  }

  async getById(id: string): Promise<Token> {
    const dbQuery = await prisma.tokens.findUnique({ where: { id } });

    if (!dbQuery) {
      return null;
    }

    return TokenMapper.toDomain(dbQuery);
  }

  async exists(id: string): Promise<boolean> {
    const dbQuery = await prisma.tokens.findUnique({
      where: {
        id: id,
      },
    });
    return !!dbQuery;
  }

  async remove(id: string): Promise<void> {
    await prisma.tokens.delete({
      where: {
        id,
      },
    });
  }

  async saveSingle(token: Token): Promise<void> {
    const data = TokenMapper.toPersistence(token);

    await prisma.tokens.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findByTypeAndUserIdAndUsed(type: string, userId: string, used: boolean): Promise<Token[]> {
    const tokens = await prisma.tokens.findMany({
      where: {
        type,
        user_id: userId,
        used,
      },
    });

    return tokens.map(token => TokenMapper.toDomain(token));
  }
}
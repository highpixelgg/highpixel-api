import { prisma } from "infra/prisma/prisma-client";
import { Token } from "modules/accounts/domain/Token";
import { Tokens } from "modules/accounts/domain/Tokens";
import { TokenMapper } from "modules/accounts/mappers/TokenMapper";
import { ITokensRepository } from "../ITokensRepository";

export class PrismaTokensRepository implements ITokensRepository {
  async create(tokens: Tokens): Promise<void> {
    const data = tokens.getNewItems().map(token => TokenMapper.toPersistence(token));
    await prisma.tokens.createMany({ data })
  }

  async save(tokens: Tokens): Promise<void> {
    if (tokens.getNewItems().length > 0) {
      const data = tokens.getNewItems().map(token => TokenMapper.toPersistence(token))
      await prisma.tokens.createMany({
        data
      })
    }
  }

  async getById(id: string): Promise<Token> {
    const query = await prisma.tokens.findUnique({
      where: {
        id: id,
      }
    })

    if (!query) {
      return null
    }

    return TokenMapper.toDomain(query)
  }

  async exists(id: string): Promise<boolean> {
    const query = await prisma.tokens.findUnique({
      where: {
        id: id,
      }
    });
    return !!query;
  }

  async saveSingle(token: Token): Promise<void> {
    const data = TokenMapper.toPersistence(token);

    await prisma.tokens.update({
      where: {
        id: data.id
      },
      data
    })
  }
}

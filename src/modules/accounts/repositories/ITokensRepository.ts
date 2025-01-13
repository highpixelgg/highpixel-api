import { Token } from "../domain/Token";
import { Tokens } from "../domain/Tokens";

export interface ITokensRepository {
  create(tokens: Tokens): Promise<void>;
  save(tokens: Tokens): Promise<void>;
  getById(id: string): Promise<Token>;
  exists(id: string): Promise<boolean>;
  remove(id: string): Promise<void>;
  saveSingle(token: Token): Promise<void>;
  findByTypeAndUserIdAndUsed(type: string, userId: string, used: boolean): Promise<Token[]>;
}
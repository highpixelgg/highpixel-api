import { Token } from "../domain/Token";
import { Tokens } from "../domain/Tokens";

export interface ITokensRepository {
  exists(id: string): Promise<boolean>;
  create(tokens: Tokens): Promise<void>;
  save(tokens: Tokens): Promise<void>;
  getById(id: string): Promise<Token>;
  saveSingle(token: Token): Promise<void>;
}
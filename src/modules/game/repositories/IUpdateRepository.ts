import { Update } from "../domain/Update";

export interface IUpdateRepository {
  create(update: Update): Promise<void>;
  findOne(ident: string): Promise<Update>;
  findRecentUpdate(): Promise<Update>;
  save(update: Update): Promise<void>;
  delete(raw: Update): Promise<void>;
}
import { Headline } from "../domain/Headline";

export interface IHeadlineRepository {
  create(headline: Headline): Promise<void>;
  findOne(ident: string): Promise<Headline>;
  findRecentHeadline(): Promise<Headline>;
  save(headline: Headline): Promise<void>;
  delete(raw: Headline): Promise<void>;
  findAll(): Promise<Headline[]>;
}
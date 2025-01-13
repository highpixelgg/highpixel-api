import { Profile } from '../domain/profile/Profile';

export interface SearchResponse {
  data: Profile[];
  totalCount: number;
}

export interface IProfilesRepository {
  exists(slugORId: string): Promise<boolean>;
  findOne(slugORID: string): Promise<Profile>;
  findAll(): Promise<Profile[]>;
  save(profile: Profile): Promise<void>;
  search(
    query: string,
    page: number,
    perPage: number,
    randomize: boolean
  ): Promise<SearchResponse>;
}
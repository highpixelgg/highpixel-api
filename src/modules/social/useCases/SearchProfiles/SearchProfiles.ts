import { IProfilesRepository } from "@modules/social/repositories/IProfileRepository";
import { Profile } from "@modules/social/domain/profile/Profile";

type SearchProfilesRequest = {
  query?: string;
  page?: number;
  perPage?: number;
  randomize?: boolean;
};

type SearchProfilesResponse = {
  data: Profile[];
  totalCount: number;
};

export class SearchProfiles {
  constructor(private profilesRespository: IProfilesRepository) { }

  async execute({
    query,
    page = 1,
    perPage = 20,
    randomize = false,
  }: SearchProfilesRequest): Promise<SearchProfilesResponse> {
    const { data, totalCount } = await this.profilesRespository.search(
      query,
      page,
      perPage,
      randomize
    );

    return { data, totalCount };
  }
}
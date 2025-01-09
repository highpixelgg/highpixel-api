import { Controller } from "core/infra/Controller";
import { fail, HttpResponse, ok } from "core/infra/HttpResponse";
import { SearchProfiles } from "./SearchProfiles";

type SearchProfilesControllerRequest = {
  query?: string;
  page?: string;
  per_page?: string;
  randomize?: string;
};

export class SearchProfilesController implements Controller {
  constructor(private searchProfiles: SearchProfiles) { }

  async handle({
    query,
    page,
    per_page,
    randomize,
  }: SearchProfilesControllerRequest): Promise<HttpResponse> {
    try {
      const { data, totalCount } = await this.searchProfiles.execute({
        query,
        page: page ? Number(page) : undefined,
        randomize: randomize === 'true' ? true : false,
        perPage: per_page ? Number(per_page) : undefined,
      });

      const profiles = data.map(profile => {
        return {
          id: profile.id,
          username: profile.User.username,
          userid: profile.User.id,
          createdAt: profile.User.createdAt,
          role: profile.User.role,
          isPremium: profile.User.isPremium,
          isVerified: profile.User.isVerified,
          avatar: profile.avatar,
          cover: profile.cover,
          bio: profile.bio,
          link: profile.link,
          nickname: profile.nickname,
          badges: profile.badges,
          slug: profile.slug,
        };
      });

      return ok({ data: profiles, totalCount });
    } catch (err) {
      return fail(err);
    }
  }
}
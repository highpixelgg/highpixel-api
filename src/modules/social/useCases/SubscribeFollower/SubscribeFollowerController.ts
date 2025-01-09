import { Controller } from "core/infra/Controller";
import { HttpResponse, ok, fail } from "core/infra/HttpResponse";
import { SubscribeFollower } from "./SubscribeFollower";
import { SubscribeFollowerFindAll } from "./SubscribeFollowerFindAll";
import { SubscribeFollowerUnsubscribe } from "./SubscribeFollowUnfollow";

type SubscribeFollowerControllerRequest = {
  followers_id?: string;
  findAll?: boolean;
  unfollow?: boolean;
  user: { id: string };
};

export class SubscribeFollowerController implements Controller {
  constructor(
    private subscribeFollower: SubscribeFollower,
    private subscribeFollowerFindAll: SubscribeFollowerFindAll,
    private subscribeFollowerUnFollow: SubscribeFollowerUnsubscribe
  ) { }

  private async handleUnSubscribeFollower(
    followers_id: string,
    user: { id: string }
  ): Promise<HttpResponse> {
    const result = await this.subscribeFollowerUnFollow.execute({
      followers_id,
      user,
    });

    if (result.isLeft()) {
      const error = result.value;
      return fail(error);
    } else {
      return ok(result.value);
    }
  }

  private async handleSubscribeFollowerFindAll(followers_id: string) {
    const result = await this.subscribeFollowerFindAll.execute({
      followers_id,
    });

    if (result.isLeft()) {
      const error = result.value;
      return fail(error);
    } else {
      return ok(result.value);
    }
  }

  private async handleSubscribeFollower(
    followers_id: string,
    user: { id: string }
  ) {
    const result = await this.subscribeFollower.execute({
      followers_id,
      user,
    });

    if (result.isLeft()) {
      const error = result.value;
      return fail(error);
    }

    return ok({});
  }

  async handle({
    followers_id,
    user,
    findAll,
    unfollow,
  }: SubscribeFollowerControllerRequest): Promise<HttpResponse> {
    if (Boolean(unfollow)) {
      return this.handleUnSubscribeFollower(followers_id, user);
    }

    if (Boolean(findAll)) {
      return this.handleSubscribeFollowerFindAll(followers_id);
    } else {
      return this.handleSubscribeFollower(followers_id, user);
    }
  }
}
import { User } from "modules/accounts/domain/User";
import { Follows } from "../domain/profile/Follows";
import { Follow } from "../domain/profile/Follow";

export type FindByProfileParams = {
  following_id?: string;
  followers_id: string;
};

export interface IFollowsRepository {
  findByProfileParams(params: FindByProfileParams): Promise<Follow>;
  findAllByProfileParams(params: FindByProfileParams): Promise<Follow[]>;
  save(follows: Follows): Promise<void>;
  create(follows: Follows): Promise<void>;
}
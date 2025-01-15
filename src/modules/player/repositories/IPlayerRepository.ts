import { Player } from "../domain/Player";

export interface IPlayerRepository {
  exists(nickname: string): Promise<boolean>;
  findByNickname(nickname: string): Promise<Player>;
  findAll(): Promise<Player[]>;
  save(player: Player): Promise<void>;
}
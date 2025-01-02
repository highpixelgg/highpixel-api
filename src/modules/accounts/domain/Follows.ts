import { Follow } from "./Follow";
import { WatchedList } from "core/domain/WatchedList";

export class Follows extends WatchedList<Follow> {
  private constructor(follows: Follow[]) {
    super(follows)
  }

  public compareItems(a: Follow, b: Follow): boolean {
    return a.equals(b)
  }

  static create(follows?: Follow[]): Follows {
    return new Follows(follows || [])
  }
}
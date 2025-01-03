import { WatchedList } from "core/domain/WatchedList";
import { TweetLike } from "./TweetLike";

export class TweetsLikes extends WatchedList<TweetLike> {
  private constructor(tweetsLikes: TweetLike[]) {
    super(tweetsLikes)
  }

  public compareItems(a: TweetLike, b: TweetLike): boolean {
    return a.equals(b)
  }

  static create(tweetsLikes?: TweetLike[]): TweetsLikes {
    return new TweetsLikes(tweetsLikes || [])
  }
}
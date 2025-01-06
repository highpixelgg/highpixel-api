import { WatchedList } from "../../../core/domain/WatchedList";
import { Tweet } from "./Tweet";

export class Tweets extends WatchedList<Tweet> {
  private constructor(tweets: Tweet[]) {
    super(tweets)
  }

  public compareItems(a: Tweet, b: Tweet): boolean {
    return a.equals(b)
  }

  public static create(tweets?: Tweet[]):Tweets {
    return new Tweets(tweets || [])
  }
}
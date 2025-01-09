import { Comment } from "./Comment";
import { WatchedList } from "core/domain/WatchedList";

export class Comments extends WatchedList<Comment> {
  private constructor(comments: Comment[]) {
    super(comments);
  }

  public compareItems(a: Comment, b: Comment): boolean {
    return a.equals(b);
  }

  public static create(comments?: Comment[]): Comments {
    return new Comments(comments || []);
  }
}
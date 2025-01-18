import { Headlines as PersistenceHeadlinesRaw } from "@prisma/client";
import { Headline } from "../domain/Headline";

export class HeadlineMapper {
  static toDomain(raw: PersistenceHeadlinesRaw) {
    const updateOrError = Headline.create({
      title: raw.title,
      description: raw.description,
      img: raw.img,
      createAt: raw.createAt,
    }, raw.id)

    if (updateOrError.isRight()) {
      return updateOrError.value;
    }

    return null
  }

  static toPersistence(raw: Headline) {
    return {
      id: raw.id,
      title: raw.title,
      description: raw.description,
      img: raw.img,
      createAt: raw.createAt,
    };
  }
}
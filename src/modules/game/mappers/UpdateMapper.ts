import { Update as PersistenceUpdateRaw } from "@prisma/client";
import { Update } from "../domain/Update";


export class UpdateMapper {
  static toDomain(raw: PersistenceUpdateRaw) {
    const updateOrError = Update.create({
      product: raw.product,
      version: raw.version,
      download: raw.download,
      changelogs: raw.changelogs,
      release: raw.release,
    }, raw.id)

    if (updateOrError.isRight()) {
      return updateOrError.value;
    }

    return null
  }

  static toPersistence(raw: Update) {
    return {
      id: raw.id,
      product: raw.product,
      version: raw.version,
      download: raw.download,
      release: raw.release,
      changelogs: raw.changelogs
    };
  }
}
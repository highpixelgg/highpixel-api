import { ParametersErrors } from "core/domain/errors/ParameterErrors"
import { Either, left, right } from "core/logic/Either"
import slug from "slug"

export class Slug {
  private readonly slug: string
  private readonly genSlug?: boolean

  constructor(slug: string, genSlug: boolean) {
    this.slug = slug,
    this.genSlug = this.genSlug
  }

  get value(): string {
    return this.slug
  }

  static validate(slug: string): boolean {
    if (!slug || slug.trim().length < 2 || slug.trim().length > 255) {
      return false
    }
    return true
  }

  public async getGenerateSlug(): Promise<string> {
    if (this.genSlug) {
      return this.slug
    }
    const randomSuffix = Math.floor(Math.random() * 999999).toString();
    return slug(`${this.slug}-${randomSuffix}`.trim(), { lower: true });
  }

  public static create(slug: string, genSlug: boolean = false): Either<ParametersErrors, Slug> {
    if(!genSlug && !this.validate(slug)) {
      return left(new ParametersErrors('Invalid slug.'))
    }
    return right(new Slug(slug, genSlug))
  }
}
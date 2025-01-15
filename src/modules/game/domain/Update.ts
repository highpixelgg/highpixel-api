import { Entity } from "@core/domain/Entity"
import { ParametersErrors } from "@core/domain/errors/ParameterErrors"
import { Either, right } from "@core/logic/Either"

export interface IUpdateProps {
  product: string,
  version: string,
  download: string,
  release: Date,
  changelogs: string,
}

export class Update extends Entity<IUpdateProps> {
  constructor(props: IUpdateProps, id?: string) {
    super(props, id)
  }

  get product() {
    return this.props.product
  }

  get version() {
    return this.props.version
  }

  get download() {
    return this.props.download
  }

  get release() {
    return this.props.release
  }

  get changelogs() {
    return this.props.changelogs
  }

  set setProduct(product: string) {
    this.props.product = product
  }

  set setVersion(version: string) {
    this.props.version = version
  }

  set setDownload(download: string) {
    this.props.download = download
  }

  set setRelease(release: Date) {
    this.props.release = release
  }

  static create(props: IUpdateProps, id?: string): Either<ParametersErrors, Update> {
    return right(new Update(props, id));
  }
}
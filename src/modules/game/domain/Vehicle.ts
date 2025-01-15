import { Entity } from "@core/domain/Entity";
import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, right } from "@core/logic/Either";

export interface IVehicleProps {
  name: string,
  type: string,
  price: number,
  createdAt: Date,
}

export class Vehicle extends Entity<IVehicleProps> {
  constructor(props: IVehicleProps, id?: string) {
    super(props, id)
  }

  get name() {
    return this.props.name
  }

  get type() {
    return this.props.type
  }

  get price() {
    return this.props.price
  }

  get createdAt() {
    return this.props.createdAt
  }

  set setName(name: string) {
    this.props.name = name;
  }

  set setType(type: string) {
    this.props.type = type;
  }

  set setPrice(newPrice: number) {
    this.props.price = newPrice;
  }

  static create(props: IVehicleProps, id?: string): Either<ParametersErrors, Vehicle> {
    return right(new Vehicle(props, id))
  }
}
import { Entity } from "@core/domain/Entity"
import { ParametersErrors } from "@core/domain/errors/ParameterErrors"
import { Either, right } from "@core/logic/Either"
import { User } from "@prisma/client"
import { PlayerVehicles } from "./PlayerVehicles"
import { PlayerVehicle } from "./PlayerVehicle"

export interface IPlayerProps {
  nickname: string,
  money: number,
  vehicles?: PlayerVehicles,
  user?: User,
}

export class Player extends Entity<IPlayerProps> {
  constructor(props: IPlayerProps, id?: string) {
    super(props, id)
  }

  get nickname() {
    return this.props.nickname
  }

  get money() {
    return this.props.money
  }

  get vehicles() {
    return this.props.vehicles
  }

  get user() {
    return this.props.user
  }

  set setNickname(nickname: string) {
    this.props.nickname = nickname;
  }

  public setMoney(money: number) {
    this.props.money = money;
  }

  public addVehicle(vehicle: PlayerVehicle) {
    this.vehicles.add(vehicle)
  }

  public removeVehicle(vehicle: PlayerVehicle) {
    this.vehicles.remove(vehicle)
  }

  static create(props: IPlayerProps, id?: string): Either<ParametersErrors, Player> {
    const player = new Player({
      ...props,
      vehicles: props.vehicles ?? PlayerVehicles.create([]),
    }, id);

    return right(player)
  }
}
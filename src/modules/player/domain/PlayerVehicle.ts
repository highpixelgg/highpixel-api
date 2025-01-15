import { Entity } from "@core/domain/Entity";
import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, right } from "@core/logic/Either";
import { Vehicle } from "@modules/game/domain/Vehicle";
import { Vehicles } from "@modules/game/domain/Vehicles";
import { Player } from "@prisma/client";

export interface IPlayerVehicleProps {
  player: Player;
  playerId: string;
  vehicle: Vehicles;
  vehicleId: string;
  purchasedIn: Date;
}

export class PlayerVehicle extends Entity<IPlayerVehicleProps> {
  constructor(props: IPlayerVehicleProps, id?: string) {
    super(props, id);
  }

  get player() {
    return this.props.player;
  }

  get playerId() {
    return this.props.playerId;
  }

  get vehicle() {
    return this.props.vehicle;
  }

  get vehicleId() {
    return this.props.vehicleId;
  }

  get purchasedIn() {
    return this.props.purchasedIn;
  }

  set setPlayer(player: Player) {
    this.props.player = player;
  }

  public addVehicle(vehicle: Vehicle) {
    this.vehicle.add(vehicle)
  }

  public removeVehicle(vehicle: Vehicle) {
    this.vehicle.remove(vehicle)
  }

  set setPurchaseIn(purchasedIn: Date) {
    this.props.purchasedIn = purchasedIn;
  }

  static create(props: IPlayerVehicleProps, id?: string): Either<ParametersErrors, PlayerVehicle> {
    return right(new PlayerVehicle(props, id));
  }
}

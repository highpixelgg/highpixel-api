import { WatchedList } from "@core/domain/WatchedList"
import { PlayerVehicle } from "./PlayerVehicle"

export class PlayerVehicles extends WatchedList<PlayerVehicle> {
  private constructor(vehicle: PlayerVehicle[]) {
    super(vehicle)
  }

  compareItems(a: PlayerVehicle, b: PlayerVehicle): boolean {
    return a.equals(b)
  }

  public getItems(): PlayerVehicle[] {
    return this.getItems()
  }
  
  public static create(vehicles?: PlayerVehicle[]): PlayerVehicles {
    return new PlayerVehicles(vehicles || [])
  }
}
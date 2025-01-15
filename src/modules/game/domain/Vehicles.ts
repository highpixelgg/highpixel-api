import { WatchedList } from "@core/domain/WatchedList"
import { Vehicle } from "./Vehicle"

export class Vehicles extends WatchedList<Vehicle> {
  private constructor(vehicle: Vehicle[]) {
    super(vehicle)
  }

  compareItems(a: Vehicle, b: Vehicle): boolean {
    return a.equals(b)
  }

  public getItems(): Vehicle[] {
    return this.getItems()
  }

  public static create(vehicles?: Vehicle[]): Vehicles {
    return new Vehicles(vehicles || [])
  }
}
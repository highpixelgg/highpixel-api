// import { User } from "../../domain/User";
// import { IUserRepository } from "../IUserRepository";

// export class InMemoryUsersRepository implements IUserRepository {
//   constructor(public items: User[] = []) {}

//   async exists(email: string): Promise<boolean> {
//     return this.items.some(user => user.email === email)
//   }

//   async save(user: User): Promise<void> {
//     const userIndex = this.items.findIndex(findUser => findUser.id === user.id)

//     this.items[userIndex] = user
//   }

//   async create(user: User): Promise<void> {
//     this.items.push(user)
//   }
// }
import { Request, Response } from "express";
import { CreateUser } from "./CreateUser";

export class CreateUserController {
  constructor(private createUser: CreateUser) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    await this.createUser.execute({ name, email, password })
    return res.status(201).json({ message: 'Account created successfully' })
  }
} 
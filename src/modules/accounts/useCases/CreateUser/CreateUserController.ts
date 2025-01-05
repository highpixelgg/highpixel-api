import { Request, Response } from "express";
import { CreateUser } from "./CreateUser";

export class CreateUserController {
  constructor(private createUser: CreateUser) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const result = await this.createUser.execute({ name, email, password })

    if(result.isLeft()) {
      return res.status(result.value.statusCode).json(result.value.message)
    }
    
    return res.status(201).json({ message: 'Account created successfully' })
  }
} 
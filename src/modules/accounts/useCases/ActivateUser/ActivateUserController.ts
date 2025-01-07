import { Request, Response } from 'express';
import { ActivateUser } from './ActivateUser';

export class ActivateUserController {
  constructor(private activateUser: ActivateUser) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const result = await this.activateUser.execute({ id });

    if (result.isLeft()) {
      return res.status(result.value.statusCode).json(result.value.message)
    }

    return res.status(200).json({ message: 'Account activated successfully' });
  }
}
import { Request, Response } from "express";
import { IActiveAccount } from "../../../domain/useCases/IActiveAccount";

export default class ActiveAccountController {
  constructor(private readonly ActiveAccount: IActiveAccount) { }

  async handle(req: Request, res: Response) {
    const { secretCode } = req.params;
    await this.ActiveAccount.execute(secretCode);
    res.status(200).json({ message: 'Account activated successfully' });
  };
}

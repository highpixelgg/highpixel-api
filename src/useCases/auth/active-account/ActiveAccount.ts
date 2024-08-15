import { IActiveAccount } from "../../../domain/useCases/IActiveAccount";
import { IEmailVerificationRepository } from "../../../infra/database/interfaces/IEmailVerificationRepository";
import { IUserRepository } from "../../../infra/database/interfaces/IUserRepository";
import { NotFoundError, BadRequestError } from "../../../errors";
import { Transaction } from "../../../infra/database/Transaction";

export default class ActiveAccount implements IActiveAccount {
  constructor(
    private readonly emailVerificationRepository: IEmailVerificationRepository,
    private readonly userRepository: IUserRepository,
    private readonly transaction: Transaction
  ) { }
  async execute(secretCode: string): Promise<void> {
    const emailVerification = await this.emailVerificationRepository.findOne({
      secretCode: secretCode,
      select: {
        used: true,
        userId: true,
      },
    });

    if (!emailVerification || emailVerification.used) {
      throw new NotFoundError('Invalid or expired secret code');
    }

    await this.transaction.run(async (tid) => {
      const userId = emailVerification.userId;
      await this.emailVerificationRepository.updateOne(
        {
          select: {},
          userId,
        },
        {
          used: true,
        }, tid);
      await this.userRepository.updateOne(
        {
          select: {},
          id: userId,
        },
        {
          isVerified: true
        }, tid);
    });
  }
}

import { IRecoveryPassword } from "../../../domain/useCases/IRecoveryPassword";
import { NotFoundError } from "../../../errors";
import { ISecretGenerator } from "../../../infra/interfaces/ISecretGenerator";
// import { IPubliser } from "../../../infra/interfaces/IPublisher";
import { Transaction } from "../../../infra/database/Transaction";
import { Recovery } from "../../../domain/entities/Recovery";
import { IRecoveryRespository } from "../../../infra/database/interfaces/IRecoveryRepository";
import { IUserRepository } from "../../../infra/database/interfaces/IUserRepository"; 
import { sendRecoveryEmail } from "../../../infra/services/mailer";

export default class RecoveryPassword implements IRecoveryPassword {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly secretGenerator: ISecretGenerator,
    private readonly transaction: Transaction,
    // private readonly publisher: IPubliser,
    private readonly RecoveryRepository: IRecoveryRespository,
  ) { }

  async execute(data: { email: string }): Promise<void> {
    const secretCode = this.secretGenerator.generate();

    const user = await this.userRepository.findOne({
      email: data.email,
      select: {
        email: true,
        id: true,
        username: true,
      }
    });

    if (!user) {
      throw new NotFoundError("Invalid email");
    }

    const recovery = new Recovery({
      email: user.email,
      userId: user.id,
      username: user.username,
      secretCode,
    });

    await this.transaction.run(async (tid) => {
      await this.RecoveryRepository.save(recovery, tid);
      sendRecoveryEmail(user.email, secretCode, user.username);
    });
  }
}

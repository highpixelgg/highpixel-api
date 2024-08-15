import { makeUserRepository, makeEmailVerificationRepository, transaction } from "../../../infra/database/repositories";
import ActivateAccount from "./ActiveAccount";
import ActiveAccountController from "./ActiveAccountController";

const makeActiveAccountController = () => {
  const activateAccount = new ActivateAccount(
    makeEmailVerificationRepository(),
    makeUserRepository(),
    transaction
  );

  const activateAccountController = new ActiveAccountController(activateAccount);
  return activateAccountController.handle.bind(activateAccountController);
};

export { makeActiveAccountController };

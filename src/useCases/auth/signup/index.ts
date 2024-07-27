import { Hasher, SecretGenerator } from "../../../infra";
import {
  makeEmailVerificationRepository,
  makeUserRepository,
  transaction,
} from "../../../infra/database/repositories";
import Signup from "./Signup";
import SignupController from "./SignupController";
import SignupDTO from "./SignupDTO";

const makeSignUpController = () => {
  const secretGenerator = new SecretGenerator({
    length: 150,
    numbers: true,
    uppercase: true,
    symbols: false,
  });
  const hasher = new Hasher();
  const singup = new Signup(
    makeUserRepository(),
    makeEmailVerificationRepository(),
    secretGenerator,
    hasher,
    transaction
  );
  const signupControllerClass = new SignupController(singup);
  return signupControllerClass.handle.bind(signupControllerClass);
};

export { makeSignUpController, SignupDTO };

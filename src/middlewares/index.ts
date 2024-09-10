import { Encrypter } from "../infra";
import ValidationMiddleware from "./Validation";
import Auth from "./Auth";
import { config } from "dotenv";
config();

const makeAuthMiddleware = () => {
  const encrypter = new Encrypter(String(process.env.JWT_SECRET));
  const authMiddleware = new Auth(encrypter);
  return authMiddleware.handle.bind(authMiddleware);
};
const validationMiddleware = new ValidationMiddleware();
export { validationMiddleware, makeAuthMiddleware };

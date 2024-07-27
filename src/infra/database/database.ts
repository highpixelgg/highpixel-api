import { Sequelize } from "sequelize-typescript";
import { UserModel } from "./models/UserModel";
import { EmailVerificationModel } from "./models/EmailVerificationModel";
import { RecoveryModel } from "./models/RecoveryModel";
import { SessionModel } from "./models/SessionModel";
export const initDatabase = async () => { };
export const sequelize = new Sequelize("railway", "postgres", "qYmPbvgcunyOMHJjCyzLYxOhXbSYSsQQ", {
  host: "postgres.railway.internal",
  port: 5432,
  dialect: 'postgres',
  logging: false
});
sequelize.addModels([
  UserModel,
  EmailVerificationModel,
  RecoveryModel,
  SessionModel,
]);

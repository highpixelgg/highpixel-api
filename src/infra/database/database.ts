import { Sequelize } from "sequelize-typescript";
import { UserModel } from "./models/UserModel";
import { EmailVerificationModel } from "./models/EmailVerificationModel";
import { RecoveryModel } from "./models/RecoveryModel";
import { SessionModel } from "./models/SessionModel";
import { config } from "dotenv";
config();

export const initDatabase = async () => { };
const { DATABASE_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DATABASE_PROJECTID, DATABASE_PORT } = process.env;

export const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: DATABASE_HOST,
  dialect: "postgres",
  port: 5432,
  logging: false,
  dialectOptions: {
      project: DATABASE_PROJECTID,
      ssl: {
          require: true,
          rejectUnauthorized: false,
      },
  },
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 20000,
  },
});

// export const sequelize = new Sequelize({
//   username: "thunder-db_owner",
//   password: "yLdWfj9a0xNE",
//   database: "thunder-db",
//   host: "ep-aged-darkness-a5618g2w.us-east-2.aws.neon.tech",
//   dialect: "postgres",
//   logging: false,
//   dialectOptions: {
//     project: "ep-aged-darkness-a5618g2w",
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     }
//   }
// });

sequelize.addModels([
  UserModel,
  EmailVerificationModel,
  RecoveryModel,
  SessionModel,
]);



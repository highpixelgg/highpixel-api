import { MailProvider } from "../../../../infra/providers/implementations/MailProvider";
import { PrismaUsersRepository } from "../../repositories/implementations/PrismaUsersRepository";
import { CreateUser } from "./CreateUser";
import { CreateUserController } from "./CreateUserController";

const mailProvider = new MailProvider();
const prismaUsersRepository = new PrismaUsersRepository();
const createUser = new CreateUser(prismaUsersRepository, mailProvider);
const createUserController = new CreateUserController(createUser)

export { createUser, createUserController };
import { ParametersErrors } from "core/domain/errors/ParameterErrors"; // Importar o tipo de erro
import { Either } from "core/logic/Either"; // Certifique-se de importar a definição de Either
import { User } from "../domain/User";

export interface IUserRepository {
    findUserByEmail(email: string): Promise<boolean>;
    findUserBySlug(email: string): Promise<boolean>;
    create(user: User): Promise<void>;
    save(user: User): Promise<void>; 
}

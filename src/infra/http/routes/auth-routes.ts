import express from 'express'
import { createUserController } from '../../../modules/accounts/useCases/CreateUser';

export default (router: express.Router) => {
  router.post(
    "/auth/signup", createUserController.handle);
}
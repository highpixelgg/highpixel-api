import express from 'express';
import { makeActivateUserController } from 'modules/accounts/useCases/ActivateUser';
import { makeCreateUserController } from 'modules/accounts/useCases/CreateUser';

export default (router: express.Router) => {
  router.post("/register", makeCreateUserController());
  router.post("/activate/:id", makeActivateUserController());
}
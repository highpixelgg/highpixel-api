import express from 'express';
import { makeCreateUserController } from 'modules/accounts/useCases/CreateUser';

export default (router: express.Router) => {
  router.post("/auth/signup", makeCreateUserController());
  router.get('/', (request, response) => {
    response.send({ message: 'Online' })
  })
}
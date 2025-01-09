import { adaptRoute } from 'core/infra/adapters/ExpressRouteAdapter';
import express from 'express';

import { makeCreateUserController } from 'modules/accounts/useCases/CreateUser';

const Account = express.Router();

Account.get('/register', (req, res) => {
  res.status(200).send('Route is working');
});

// Account.get(
//   '/authenticate',
//   adaptRoute(makeAuthenticateController())
// );

// Account.post('/register', adaptRoute(makeCreateUserController()));

// Account.patch(
//   '/activate/:id',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 5 * 60 * 1000,
//       max: 5,
//     })
//   ),
//   adaptRoute(makeActivateUserController())
// );

// Account.get(
//   '/recovery/send/:email',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 15 * 60 * 1000,
//       max: 1,
//     })
//   ),
//   adaptRoute(makeSendRecoveryEmailController())
// );

// Account.post(
//   '/recovery/change/:id',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 10 * 60 * 1000,
//       max: 1,
//     })
//   ),
//   adaptRoute(makeRecoveryPasswordController())
// );

// Account.get(
//   '/',
//   adaptMiddleware(makeAuthenticationMiddleware()),
//   adaptRoute(makeGetAccountDataController())
// );

// Account.patch(
//   '/notification/read',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 5 * 60 * 1000,
//       max: 5,
//     })
//   ),
//   adaptMiddleware(makeAuthenticationMiddleware()),
//   adaptRoute(makeNotificationController())
// );

export { Account };

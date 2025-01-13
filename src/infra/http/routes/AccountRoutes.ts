import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { adaptRoute } from 'core/infra/adapters/ExpressRouteAdapter';
import express from 'express';
import { makeRateLimitMiddleware } from '../middlewares/makeRateLimitMiddleware';

import { makeActivateUserController } from '@modules/accounts/useCases/ActivateUser';
import { makeAuthenticateController } from '@modules/accounts/useCases/AuthenticateUser';
import { makeGetAccountDataController } from '@modules/accounts/useCases/GetAccountData';
import { makeNotificationController } from '@modules/accounts/useCases/MarkNotificationAsRead';
import { makeRecoveryPasswordController } from '@modules/accounts/useCases/RecoveryUser';
import { makeSendRecoveryEmailController } from '@modules/accounts/useCases/SendRecoveryEmail';
import { makeCreateUserController } from 'modules/accounts/useCases/CreateUser';
import { makeAuthenticationMiddleware } from '../middlewares/makeAuthenticationMiddleware';

const Account = express.Router();

Account.post('/register', adaptRoute(makeCreateUserController()));

Account.patch(
  '/activate/:id',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 5 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeActivateUserController())
);

Account.get(
  '/authenticate',
  adaptRoute(makeAuthenticateController())
);

Account.get(
  '/recovery/send/:email',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 15 * 60 * 1000,
      max: 1,
    })
  ),
  adaptRoute(makeSendRecoveryEmailController())
);

Account.post(
  '/recovery/change/:id',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 1,
    })
  ),
  adaptRoute(makeRecoveryPasswordController())
);

Account.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeGetAccountDataController())
);

Account.patch(
  '/notification/read',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 5 * 60 * 1000,
      max: 5,
    })
  ),
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeNotificationController())
);

export { Account };

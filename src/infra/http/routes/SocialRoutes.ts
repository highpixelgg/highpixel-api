import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { makeContentController } from '@modules/social/useCases/Content';
import { makeCreateComment } from '@modules/social/useCases/CreateComment';
import { makeCreatePostController } from '@modules/social/useCases/CreatePost';
import { makeDeletePostController } from '@modules/social/useCases/DeletePost';
import { makeGetProfileController } from '@modules/social/useCases/GetProfile';
import { makeLikePostController } from '@modules/social/useCases/LikePost';
import { makeSearchPostsController } from '@modules/social/useCases/SearchPosts';
import { makeSearchProfilesController } from '@modules/social/useCases/SearchProfiles';
import { makeSubscribeFollowerController } from '@modules/social/useCases/SubscribeFollower';
import { makeTimelineSearchEngineController } from '@modules/social/useCases/TimelineSearchEngine';
import { makeUpdateProfileController } from '@modules/social/useCases/UpdateProfile';
import express from 'express';
import multer from 'multer';
import { makeAuthenticationMiddleware } from '../middlewares/makeAuthenticationMiddleware';
import { makeRateLimitMiddleware } from '../middlewares/makeRateLimitMiddleware';

const Social = express.Router();
const upload = multer();

Social.use(adaptMiddleware(makeAuthenticationMiddleware()));

Social.get('/profile/search', adaptRoute(makeSearchProfilesController()));

Social.get(
  '/profiles/:ident',
  adaptRoute(makeGetProfileController())
);

Social.put(
  '/profiles',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeUpdateProfileController())
);

Social.put(
  '/profiles/subscribers/follow',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 2 * 60 * 1000,
      max: 3,
    })
  ),
  adaptRoute(makeSubscribeFollowerController())
);

Social.get(
  '/profiles/subscribers/follow',
  adaptRoute(makeSubscribeFollowerController())
);

Social.delete(
  '/profiles/subscribers/follow',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 2 * 60 * 1000,
      max: 1,
    })
  ),
  adaptRoute(makeSubscribeFollowerController())
);

Social.post(
  '/profiles/images',
  adaptMiddleware(makeContentController()),
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 15 * 60 * 1000,
      max: 1,
    })
  ),
  upload.single('file'),
  adaptRoute(makeContentController())
);

Social.post(
  '/timeline/posts/create',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 3,
    })
  ),
  upload.single("asset"),
  adaptRoute(makeCreatePostController())
);

Social.get(
  '/timeline/posts/search',
  adaptRoute(makeSearchPostsController())
);

Social.patch(
  '/timeline/posts/like',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeLikePostController())
);

Social.get(
  '/timeline/posts/engineFeedSearch',
  adaptRoute(makeTimelineSearchEngineController())
);

Social.post(
  '/timeline/posts/comments/create',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeCreateComment())
);

Social.delete(
  '/timeline/posts/delete',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 5 * 60 * 1000,
      max: 3,
    })
  ),
  adaptRoute(makeDeletePostController())
);

export { Social };

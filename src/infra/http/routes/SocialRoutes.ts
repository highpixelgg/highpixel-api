import express from 'express';
import { makeContentController } from 'modules/social/useCases/Content';
import multer from 'multer';

const Social = express.Router();

// Social.use(adaptMiddleware(makeAuthenticationMiddleware()));

// Social.get('/profile/search', adaptRoute(makeSearchProfilesController()));

// Social.get(
//   '/profiles/:ident',
//   adaptMiddleware(makeFeatureFlagsMiddleware('read:user:self')),
//   adaptRoute(makeGetProfileController())
// );

// Social.put(
//   '/profiles',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 10 * 60 * 1000,
//       max: 5,
//     })
//   ),
//   adaptMiddleware(makeFeatureFlagsMiddleware('update:profile:self')),
//   adaptRoute(makeUpdateProfileController())
// );

// Social.get(
//   '/profiles/subscribers/visitors/:visitors_id',
//   adaptMiddleware(makeFeatureFlagsMiddleware('read:subscribers:list')),
//   adaptRoute(makeGetProfileSubscribedVisitorsController())
// );

// Social.put(
//   '/profiles/subscribers/visitors/:visitors_id',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 3 * 60 * 1000,
//       max: 3,
//     })
//   ),
//   adaptMiddleware(makeFeatureFlagsMiddleware('profile:subscribe')),
//   adaptRoute(makeSubscribeVisitorController())
// );

// Social.put(
//   '/profiles/subscribers/follow',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 2 * 60 * 1000,
//       max: 3,
//     })
//   ),
//   adaptMiddleware(makeFeatureFlagsMiddleware('profile:subscribe')),
//   adaptRoute(makeSubscribeFollowerController())
// );

// Social.get(
//   '/profiles/subscribers/follow',
//   adaptMiddleware(makeFeatureFlagsMiddleware('profile:subscribe')),
//   adaptRoute(makeSubscribeFollowerController())
// );

// Social.delete(
//   '/profiles/subscribers/follow',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 2 * 60 * 1000,
//       max: 1,
//     })
//   ),
//   adaptMiddleware(makeFeatureFlagsMiddleware('profile:unsubscribe')),
//   adaptRoute(makeSubscribeFollowerController())
// );

const upload = multer();

// Social.post(
//   '/profiles/images',
//   adaptMiddleware(makeContentController()),
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 15 * 60 * 1000,
//       max: 1,
//     })
//   ),
//   adaptMiddleware(),
//   upload.single('image'),
//   adaptRoute(makeContentController())
// );

// Social.post(
//   '/timeline/posts/create',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 10 * 60 * 1000,
//       max: 3,
//     })
//   ),
//   adaptMiddleware(makeFeatureFlagsMiddleware('create:post')),
//   adaptRoute(makeCreatePostController())
// );

// Social.get(
//   '/timeline/posts/search',
//   adaptMiddleware(makeFeatureFlagsMiddleware('read:post:list')),
//   adaptRoute(makeSearchPostsController())
// );

// Social.patch(
//   '/timeline/posts/like',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 10 * 60 * 1000,
//       max: 5,
//     })
//   ),
//   adaptMiddleware(makeFeatureFlagsMiddleware('update:post')),
//   adaptRoute(makeLikePostController())
// );

// Social.get(
//   '/timeline/posts/engineFeedSearch',
//   adaptMiddleware(makeFeatureFlagsMiddleware('read:post:list')),
//   adaptRoute(makeTimelineSearchEngineController())
// );

// Social.post(
//   '/timeline/posts/comments/create',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 10 * 60 * 1000,
//       max: 5,
//     })
//   ),
//   adaptMiddleware(makeFeatureFlagsMiddleware('create:comment')),
//   adaptRoute(makeCreateComment())
// );

// Social.delete(
//   '/timeline/posts/delete',
//   adaptMiddleware(
//     makeRateLimitMiddleware({
//       windowMs: 5 * 60 * 1000,
//       max: 3,
//     })
//   ),
//   adaptMiddleware(makeFeatureFlagsMiddleware('delete:post')),
//   adaptRoute(makeDeletePostController())
// );

export { Social };
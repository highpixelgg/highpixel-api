import { Middleware } from "core/infra/Middleware";
import { EnsureRateLimitMiddleware, Options } from "./EnsureRateLimitMiddleware";

export function makeRateLimitMiddleware(options: Options): Middleware {
  const middleware = new EnsureRateLimitMiddleware(options);
  return middleware;
}
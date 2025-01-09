import { Middleware } from "core/infra/Middleware";
import { EnsureAuthenticatedMiddleware } from "./EnsureAuthenticatedMiddleware";

export function makeAuthenticationMiddleware(): Middleware {
  const middleware = new EnsureAuthenticatedMiddleware();
  return middleware;
}
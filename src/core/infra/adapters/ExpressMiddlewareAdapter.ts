import { Request, Response, NextFunction } from 'express';
import { Middleware } from '../Middleware';

export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const requestData = {
      accessToken: request.headers?.['x_access_token'],
      user: request.user,
      ...(request.headers || {}),
    };

    const httpResponse = await middleware.handle(
      requestData,
      request.body,
      request,
      response,
      next
    );

    /*
     *
     * Not an error, but stop request process
     */

    if (httpResponse === false) {
      response.status(200).send();
      return;
    }

    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body);
      next();
    } else {
      response.status(httpResponse.statusCode).json({
        status: httpResponse.statusCode,
        error: httpResponse.body.error,
      });
    }
  };};

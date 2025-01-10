import { Controller } from '@core/infra/Controller';
import { NextFunction, Request, Response } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      ...request.headers,
      file: request.file || request.body.file,
      user: request.user,
    };

    const httpResponse = await controller.handle(requestData);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      response.status(httpResponse.statusCode).json(httpResponse);
    } else {
      response.status(httpResponse.statusCode).json(httpResponse.body.error);
    }
  };
};

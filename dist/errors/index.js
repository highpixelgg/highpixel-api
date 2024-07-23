var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/errors/index.ts
var errors_exports = {};
__export(errors_exports, {
  AnyHttpError: () => AnyHttpError,
  BadRequestError: () => BadRequestError,
  BaseError: () => BaseError,
  ForbiddenError: () => ForbiddenError,
  NotFoundError: () => NotFoundError,
  Unauthorized: () => Unauthorized
});
module.exports = __toCommonJS(errors_exports);

// src/errors/base-error.ts
var BaseError = class _BaseError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, _BaseError.prototype);
  }
};

// src/errors/any-http-error.ts
var AnyHttpError = class _AnyHttpError extends BaseError {
  constructor(status, message) {
    super();
    this.reason = message;
    this.statusCode = status;
    Object.setPrototypeOf(this, _AnyHttpError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
};

// src/errors/bad-request-error.ts
var BadRequestError = class _BadRequestError extends BaseError {
  constructor(message) {
    super();
    this.statusCode = 400;
    this.reason = message;
    Object.setPrototypeOf(this, _BadRequestError.prototype);
  }
  serializeErrors() {
    return this.reason;
  }
};

// src/errors/forbiden-error.ts
var ForbiddenError = class _ForbiddenError extends BaseError {
  constructor(message) {
    super();
    this.statusCode = 403;
    this.reason = message;
    Object.setPrototypeOf(this, _ForbiddenError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
};

// src/errors/not-found-error.ts
var NotFoundError = class _NotFoundError extends BaseError {
  constructor(message) {
    super();
    this.statusCode = 404;
    this.message = message;
    Object.setPrototypeOf(this, _NotFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
};

// src/errors/unauthorized-error.ts
var Unauthorized = class _Unauthorized extends BaseError {
  constructor(message) {
    super();
    this.statusCode = 401;
    this.reason = message;
    Object.setPrototypeOf(this, _Unauthorized.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnyHttpError,
  BadRequestError,
  BaseError,
  ForbiddenError,
  NotFoundError,
  Unauthorized
});

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

// src/errors/any-http-error.ts
var any_http_error_exports = {};
__export(any_http_error_exports, {
  default: () => AnyHttpError
});
module.exports = __toCommonJS(any_http_error_exports);

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

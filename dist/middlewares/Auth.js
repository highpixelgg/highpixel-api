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

// src/middlewares/Auth.ts
var Auth_exports = {};
__export(Auth_exports, {
  default: () => Auth
});
module.exports = __toCommonJS(Auth_exports);

// src/errors/base-error.ts
var BaseError = class _BaseError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, _BaseError.prototype);
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

// src/middlewares/Auth.ts
var Auth = class {
  constructor(encrypter) {
    this.encrypter = encrypter;
  }
  async handle(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const { success, data } = this.encrypter.decrypt(token);
    if (!success) {
      throw new Unauthorized("Valid jwt token required");
    }
    req.user = {
      id: data.id,
      username: data.username
    };
  }
};

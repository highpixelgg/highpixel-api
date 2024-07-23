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

// src/useCases/auth/login/Login.ts
var Login_exports = {};
__export(Login_exports, {
  default: () => Login
});
module.exports = __toCommonJS(Login_exports);

// src/domain/entities/Session.ts
var import_crypto = require("crypto");
var Session = class {
  constructor(props) {
    this.id = (0, import_crypto.randomUUID)();
    this.username = props.username;
    this.refreshToken = props.refreshToken;
    this.userAgent = props.userAgent;
    this.ip = props.ip;
    this.blocked = false;
    this.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString();
    this.createdAt = (/* @__PURE__ */ new Date()).toISOString();
    this.userId = props.userId;
  }
};

// src/errors/base-error.ts
var BaseError = class _BaseError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, _BaseError.prototype);
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

// src/useCases/auth/login/Login.ts
var REFRESH_TOKEN_EXPIRATION = 30 * 24 * 60 * 60;
var TMP_TOKEN_EXPIRATION = 600;
var Login = class {
  constructor(userRepository, sessionRepository, hasher, encrypter) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
    this.hasher = hasher;
    this.encrypter = encrypter;
  }
  async auth(data) {
    const user = await this.userRepository.findOne({
      username: data.username,
      select: {
        email: true,
        id: true,
        password: true,
        isVerified: true
      }
    });
    if (!user) {
      throw new Unauthorized("Invalid username or password");
    }
    if (!user.isVerified) {
      throw new ForbiddenError("user not verified yet");
    }
    if (!this.hasher.compare(user.password, data.password)) {
      throw new Unauthorized("Invalid username or password");
    }
    const tmpToken = this.encrypter.encrypt(
      { id: user.id },
      TMP_TOKEN_EXPIRATION
    );
    const refreshToken = this.encrypter.encrypt(
      { id: user.id },
      REFRESH_TOKEN_EXPIRATION
    );
    const session = new Session({
      ip: "",
      userAgent: "",
      refreshToken,
      userId: user.id,
      username: data.username
    });
    await this.sessionRepository.save(session);
    return {
      token: tmpToken,
      email: user.email,
      id: user.id,
      refreshToken,
      username: data.username
    };
  }
};

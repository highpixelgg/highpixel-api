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

// src/useCases/auth/recovery/RecoveryPassword.ts
var RecoveryPassword_exports = {};
__export(RecoveryPassword_exports, {
  default: () => RecoveryPassword
});
module.exports = __toCommonJS(RecoveryPassword_exports);

// src/errors/base-error.ts
var BaseError = class _BaseError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, _BaseError.prototype);
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

// src/domain/entities/Recovery.ts
var import_crypto = require("crypto");
var Recovery = class {
  constructor(props) {
    this.id = (0, import_crypto.randomUUID)();
    this.userId = props.userId;
    this.secretCode = props.secretCode;
    this.used = false;
    this.createdAt = (/* @__PURE__ */ new Date()).toISOString();
    this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString();
  }
};

// src/useCases/auth/recovery/RecoveryPassword.ts
var RecoveryPassword = class {
  constructor(userRepository, secretGenerator, transaction, publisher, RecoveryRepository) {
    this.userRepository = userRepository;
    this.secretGenerator = secretGenerator;
    this.transaction = transaction;
    this.publisher = publisher;
    this.RecoveryRepository = RecoveryRepository;
  }
  async execute(data) {
    const secretCode = this.secretGenerator.generate();
    const user = await this.userRepository.findOne({
      email: data.email,
      select: {
        email: true,
        id: true,
        username: true
      }
    });
    if (!user) {
      throw new NotFoundError("Invalid email");
    }
    const recovery = new Recovery({
      email: user.email,
      userId: user.id,
      username: user.username,
      secretCode
    });
    await this.transaction.run(async (tid) => {
      await this.RecoveryRepository.save(recovery, tid);
      await this.publisher.publish({
        type: "RECOVERY_PASSWORD",
        data: {
          email: user.email,
          secretCode,
          username: user.username
        }
      });
    });
  }
};

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

// src/useCases/auth/recovery-validation/RecoveryValidation.ts
var RecoveryValidation_exports = {};
__export(RecoveryValidation_exports, {
  default: () => RecoveryValidation
});
module.exports = __toCommonJS(RecoveryValidation_exports);

// src/errors/base-error.ts
var BaseError = class _BaseError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, _BaseError.prototype);
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

// src/useCases/auth/recovery-validation/RecoveryValidation.ts
var RecoveryValidation = class {
  constructor(RecoveryRepository) {
    this.RecoveryRepository = RecoveryRepository;
  }
  async execute(secretCode) {
    const recovery = await this.RecoveryRepository.findOne({
      select: {
        used: true
      },
      secretCode
    });
    if (!recovery) {
      throw new BadRequestError([
        { message: "Invalid reset code.", field: "secretCode" }
      ]);
    }
    if (recovery.used) {
      throw new BadRequestError([
        { message: "Reset code has already been used.", field: "secretCode" }
      ]);
    }
  }
};

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

// src/useCases/user/findByUsername/findByUsername.ts
var findByUsername_exports = {};
__export(findByUsername_exports, {
  default: () => FindByUsername
});
module.exports = __toCommonJS(findByUsername_exports);

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

// src/useCases/user/findByUsername/findByUsername.ts
var FindByUsername = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(data) {
    if (data.username.length > 15) {
      throw new BadRequestError([
        { message: "Username too long", field: "username" }
      ]);
    }
    const user = await this.userRepository.findOne({
      username: data.username,
      select: {
        id: true,
        fullName: true,
        username: true,
        roles: true,
        createdAt: true
      }
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      createdAt: user.createdAt,
      roles: user.roles
    };
  }
};

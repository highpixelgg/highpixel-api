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

// src/useCases/auth/signup/Signup.ts
var Signup_exports = {};
__export(Signup_exports, {
  default: () => Signup
});
module.exports = __toCommonJS(Signup_exports);

// src/domain/entities/EmailVerification.ts
var import_crypto = require("crypto");
var EmailVerification = class {
  constructor(props) {
    this.id = (0, import_crypto.randomUUID)();
    this.username = props.username;
    this.email = props.email;
    this.createdAt = (/* @__PURE__ */ new Date()).toISOString();
    this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString();
    this.userId = props.userId;
    this.used = false;
    this.secretCode = props.secretCode;
  }
};

// src/domain/entities/User.ts
var import_crypto2 = require("crypto");
var User = class {
  constructor(props) {
    this.id = (0, import_crypto2.randomUUID)();
    this.username = props.username;
    this.roles = ["user"];
    this.password = props.password;
    this.fullName = props.fullName;
    this.email = props.email;
    this.isVerified = false;
    this.createdAt = (/* @__PURE__ */ new Date()).toISOString();
    this.recovery = [];
    this.sessions = [];
    this.emailVerification = [];
  }
};

// src/errors/base-error.ts
var BaseError = class _BaseError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, _BaseError.prototype);
  }
};

// src/errors/conflict-error.ts
var ConflictError = class _ConflictError extends BaseError {
  constructor(message) {
    super();
    this.statusCode = 409;
    this.reason = message;
    Object.setPrototypeOf(this, _ConflictError.prototype);
  }
  serializeErrors() {
    return this.reason;
  }
};

// src/useCases/auth/signup/Signup.ts
var Signup = class {
  constructor(userRepository, emailVerificationRepository, publisher, secretGenerator, hasher, transaction) {
    this.userRepository = userRepository;
    this.emailVerificationRepository = emailVerificationRepository;
    this.publisher = publisher;
    this.secretGenerator = secretGenerator;
    this.hasher = hasher;
    this.transaction = transaction;
  }
  async execute(data) {
    const { email, fullName, password, username } = data;
    const userExist = await this.userRepository.findMany({
      limit: 2,
      offset: 0,
      select: {
        email: true,
        username: true
      },
      conditionalSearch: {
        email,
        username
      }
    });
    if (userExist.length === 2) {
      throw new ConflictError([
        { message: "Already taken", field: "email" },
        { message: "Already taken", field: "username" }
      ]);
    }
    if (userExist.length === 1) {
      if (userExist[0].email === email && userExist[0].username === username) {
        throw new ConflictError([
          { message: "Already taken", field: "email" },
          { message: "Already taken", field: "username" }
        ]);
      }
      if (userExist[0].email === email) {
        throw new ConflictError([{ message: "Already taken", field: "email" }]);
      }
      throw new ConflictError([
        { message: "Already taken", field: "username" }
      ]);
    }
    const user = new User({
      email,
      fullName,
      password: this.hasher.hash(password),
      username
    });
    const secretCode = this.secretGenerator.generate();
    const emailVerification = new EmailVerification({
      email,
      userId: user.id,
      username,
      secretCode
    });
    await this.transaction.run(async (tid) => {
      await this.userRepository.save(user, tid);
      await this.emailVerificationRepository.save(emailVerification, tid);
      await this.publisher.publish({
        type: "ACCOUNT_CREATED",
        data: {
          email,
          username,
          secretCode,
          fullName
        }
      });
    });
  }
};

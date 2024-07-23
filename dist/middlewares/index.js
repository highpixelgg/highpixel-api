var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middlewares/index.ts
var middlewares_exports = {};
__export(middlewares_exports, {
  makeAuthMiddleware: () => makeAuthMiddleware,
  validationMiddleware: () => validationMiddleware
});
module.exports = __toCommonJS(middlewares_exports);

// src/infra/Encrypter.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var Encrypter = class {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }
  encrypt(obj) {
    const token = import_jsonwebtoken.default.sign(obj, this.secretKey);
    return token;
  }
  decrypt(token) {
    try {
      const decoded = import_jsonwebtoken.default.verify(token, this.secretKey);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, data: {} };
    }
  }
};

// src/infra/Hasher.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// src/infra/SecretGenerator.ts
var import_generate_password = require("generate-password");

// src/middlewares/Validation.ts
var import_class_validator = require("class-validator");

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

// src/middlewares/Validation.ts
var ValidationMiddleware = class {
  async validator(data) {
    const validationErrors = await (0, import_class_validator.validate)(data);
    if (!validationErrors || validationErrors.length < 1) {
      return [];
    }
    const errors = validationErrors.map((i) => {
      const messages = [];
      for (const prop in i.constraints) {
        messages.push(i.constraints[prop]);
      }
      return {
        field: i.property,
        message: messages
      };
    });
    return errors;
  }
  handle(dto) {
    return async (req, _, next) => {
      const instancedDTO = new dto();
      for (const field in req.body) {
        instancedDTO[field] = req.body[field];
      }
      const errors = await this.validator(instancedDTO);
      if (errors.length > 0) {
        throw new BadRequestError(errors);
      }
      next();
    };
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

// src/middlewares/index.ts
var makeAuthMiddleware = () => {
  const encrypter = new Encrypter(process.env.JWT_SECRET);
  const authMiddleware = new Auth(encrypter);
  return authMiddleware.handle.bind(authMiddleware);
};
var validationMiddleware = new ValidationMiddleware();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeAuthMiddleware,
  validationMiddleware
});

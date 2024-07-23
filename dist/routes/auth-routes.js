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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/routes/auth-routes.ts
var auth_routes_exports = {};
__export(auth_routes_exports, {
  default: () => auth_routes_default
});
module.exports = __toCommonJS(auth_routes_exports);

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
var Hasher = class {
  constructor(saltRounds = 10) {
    this.saltRounds = saltRounds;
  }
  hash(text) {
    return import_bcryptjs.default.hashSync(text, this.saltRounds);
  }
  compare(hash, text) {
    return import_bcryptjs.default.compareSync(text, hash);
  }
};

// src/infra/Producer.ts
var Producer = class {
  constructor(exchange, amqp2) {
    this.exchange = exchange;
    this.amqp = amqp2;
  }
  async start() {
    if (!this.amqp.connection) {
      await this.amqp.start();
    }
    this.channel = await this.amqp.connection.createConfirmChannel();
    await this.channel.assertExchange(this.exchange, "fanout", {
      durable: true
    });
    return this;
  }
  async publish(data) {
    if (!this.channel) {
      await this.start();
    }
    const message = Buffer.from(JSON.stringify(data));
    this.channel.publish(this.exchange, "", message, { persistent: true });
    await this.channel.waitForConfirms();
  }
};

// src/infra/SecretGenerator.ts
var import_generate_password = require("generate-password");
var SecretGenerator = class {
  constructor(options) {
    this.options = options;
  }
  generate() {
    const { length, numbers, symbols, uppercase } = this.options;
    return (0, import_generate_password.generate)({
      length,
      numbers,
      symbols,
      uppercase
    });
  }
};

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

// src/useCases/auth/login/index.ts
var import_dotenv2 = require("dotenv");

// src/infra/database/ParameterConverter.ts
var import_sequelize = require("sequelize");
var ParameterConverter = class {
  convert(param) {
    var _a, _b;
    const obj = {
      where: {},
      select: {}
    };
    obj.select = param.select;
    if (param.limit) {
      obj["take"] = param.limit;
    }
    if (param.offset) {
      obj["skip"] = param.offset;
    }
    delete param.limit;
    delete param.select;
    delete param.offset;
    if (param.conditionalSearch) {
      obj.where[import_sequelize.Op.or] = [];
      const list = obj.where[import_sequelize.Op.or];
      for (const key in param.conditionalSearch) {
        if (typeof param[key] !== "object") {
          list.push({ [key]: param.conditionalSearch[key] });
          continue;
        }
        if ((_a = param[key]) == null ? void 0 : _a.similar) {
          const insensitive = param.conditionalSearch[key].insensitive;
          if (insensitive) {
            list.push({
              [key]: { [import_sequelize.Op.iLike]: `${param.conditionalSearch[key].value}%` }
            });
          } else {
            list.push({
              [key]: { [import_sequelize.Op.like]: `${param.conditionalSearch[key].value}%` }
            });
          }
          return;
        }
        list.push({ [key]: { [import_sequelize.Op.like]: param.conditionalSearch[key] } });
      }
      return obj;
    }
    for (const key in param) {
      if (typeof param[key] !== "object") {
        obj.where[key] = param[key];
        continue;
      }
      if ((_b = param[key]) == null ? void 0 : _b.similar) {
        const insensitive = param[key].insensitive;
        if (insensitive) {
          obj.where[key] = { [import_sequelize.Op.iLike]: `${param[key].value}%` };
        } else {
          obj.where[key] = { [import_sequelize.Op.like]: `${param[key].value}%` };
        }
        continue;
      }
      obj.where[key] = { [import_sequelize.Op.like]: `${param[key].value}%` };
    }
    return obj;
  }
};

// src/infra/database/Transaction.ts
var import_crypto = require("crypto");

// src/infra/database/database.ts
var import_sequelize_typescript5 = require("sequelize-typescript");

// src/infra/database/models/UserModel.ts
var import_sequelize_typescript4 = require("sequelize-typescript");

// src/infra/database/models/EmailVerificationModel.ts
var import_sequelize_typescript = require("sequelize-typescript");
var import_sequelize2 = require("sequelize");
var EmailVerificationModel = class extends import_sequelize_typescript.Model {
};
__decorateClass([
  (0, import_sequelize_typescript.Column)({
    type: import_sequelize_typescript.DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
], EmailVerificationModel.prototype, "id", 2);
__decorateClass([
  (0, import_sequelize_typescript.Column)({
    type: import_sequelize2.DataTypes.STRING,
    allowNull: false
  })
], EmailVerificationModel.prototype, "username", 2);
__decorateClass([
  (0, import_sequelize_typescript.Column)({
    type: import_sequelize2.DataTypes.STRING,
    allowNull: false
  })
], EmailVerificationModel.prototype, "email", 2);
__decorateClass([
  (0, import_sequelize_typescript.Column)({
    type: import_sequelize2.DataTypes.STRING,
    allowNull: false
  })
], EmailVerificationModel.prototype, "secretCode", 2);
__decorateClass([
  (0, import_sequelize_typescript.Column)({
    type: import_sequelize2.DataTypes.BOOLEAN,
    defaultValue: false
  })
], EmailVerificationModel.prototype, "used", 2);
__decorateClass([
  import_sequelize_typescript.CreatedAt
], EmailVerificationModel.prototype, "createdAt", 2);
__decorateClass([
  (0, import_sequelize_typescript.Column)({
    type: import_sequelize2.DataTypes.DATE,
    allowNull: false
  })
], EmailVerificationModel.prototype, "expiresAt", 2);
__decorateClass([
  (0, import_sequelize_typescript.ForeignKey)(() => UserModel),
  (0, import_sequelize_typescript.Column)({
    type: import_sequelize_typescript.DataType.STRING,
    allowNull: false
  })
], EmailVerificationModel.prototype, "userId", 2);
__decorateClass([
  (0, import_sequelize_typescript.BelongsTo)(() => UserModel)
], EmailVerificationModel.prototype, "user", 2);
EmailVerificationModel = __decorateClass([
  import_sequelize_typescript.Table
], EmailVerificationModel);

// src/infra/database/models/SessionModel.ts
var import_sequelize_typescript2 = require("sequelize-typescript");
var import_sequelize3 = require("sequelize");
var SessionModel = class extends import_sequelize_typescript2.Model {
};
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize_typescript2.DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
], SessionModel.prototype, "id", 2);
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize3.DataTypes.STRING,
    allowNull: false
  })
], SessionModel.prototype, "username", 2);
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize3.DataTypes.STRING,
    allowNull: false
  })
], SessionModel.prototype, "refreshToken", 2);
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize3.DataTypes.STRING,
    allowNull: false
  })
], SessionModel.prototype, "userAgent", 2);
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize3.DataTypes.STRING,
    allowNull: false
  })
], SessionModel.prototype, "ip", 2);
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize3.DataTypes.BOOLEAN,
    defaultValue: false
  })
], SessionModel.prototype, "blocked", 2);
__decorateClass([
  import_sequelize_typescript2.CreatedAt
], SessionModel.prototype, "createdAt", 2);
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize3.DataTypes.DATE,
    allowNull: false
  })
], SessionModel.prototype, "expiresAt", 2);
__decorateClass([
  (0, import_sequelize_typescript2.ForeignKey)(() => UserModel),
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize_typescript2.DataType.STRING,
    allowNull: false
  })
], SessionModel.prototype, "userId", 2);
__decorateClass([
  (0, import_sequelize_typescript2.BelongsTo)(() => UserModel)
], SessionModel.prototype, "user", 2);
SessionModel = __decorateClass([
  import_sequelize_typescript2.Table
], SessionModel);

// src/infra/database/models/RecoveryModel.ts
var import_sequelize_typescript3 = require("sequelize-typescript");
var import_sequelize4 = require("sequelize");
var RecoveryModel = class extends import_sequelize_typescript3.Model {
};
__decorateClass([
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize_typescript3.DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
], RecoveryModel.prototype, "id", 2);
__decorateClass([
  (0, import_sequelize_typescript3.ForeignKey)(() => UserModel),
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize_typescript3.DataType.STRING,
    allowNull: false
  })
], RecoveryModel.prototype, "userId", 2);
__decorateClass([
  (0, import_sequelize_typescript3.BelongsTo)(() => UserModel)
], RecoveryModel.prototype, "user", 2);
__decorateClass([
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize4.DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [150, 150]
    }
  })
], RecoveryModel.prototype, "secretCode", 2);
__decorateClass([
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize4.DataTypes.BOOLEAN,
    allowNull: false
  })
], RecoveryModel.prototype, "used", 2);
__decorateClass([
  import_sequelize_typescript3.CreatedAt
], RecoveryModel.prototype, "createdAt", 2);
__decorateClass([
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize4.DataTypes.DATE,
    allowNull: false
  })
], RecoveryModel.prototype, "expiresAt", 2);
RecoveryModel = __decorateClass([
  (0, import_sequelize_typescript3.Table)({ tableName: "Recovery" })
], RecoveryModel);

// src/infra/database/models/UserModel.ts
var UserModel = class extends import_sequelize_typescript4.Model {
};
__decorateClass([
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize_typescript4.DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
], UserModel.prototype, "id", 2);
__decorateClass([
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize_typescript4.DataType.STRING,
    unique: true,
    allowNull: false
  })
], UserModel.prototype, "username", 2);
__decorateClass([
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize_typescript4.DataType.ARRAY(import_sequelize_typescript4.DataType.STRING),
    allowNull: false
  })
], UserModel.prototype, "roles", 2);
__decorateClass([
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize_typescript4.DataType.STRING,
    allowNull: false
  })
], UserModel.prototype, "password", 2);
__decorateClass([
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize_typescript4.DataType.STRING,
    allowNull: false
  })
], UserModel.prototype, "fullName", 2);
__decorateClass([
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize_typescript4.DataType.STRING,
    unique: true,
    allowNull: false
  })
], UserModel.prototype, "email", 2);
__decorateClass([
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize_typescript4.DataType.BOOLEAN,
    defaultValue: false
  })
], UserModel.prototype, "isVerified", 2);
__decorateClass([
  import_sequelize_typescript4.CreatedAt
], UserModel.prototype, "createdAt", 2);
__decorateClass([
  import_sequelize_typescript4.UpdatedAt
], UserModel.prototype, "updatedAt", 2);
__decorateClass([
  import_sequelize_typescript4.DeletedAt
], UserModel.prototype, "deletedAt", 2);
__decorateClass([
  (0, import_sequelize_typescript4.HasMany)(() => EmailVerificationModel)
], UserModel.prototype, "emailVerification", 2);
__decorateClass([
  (0, import_sequelize_typescript4.HasMany)(() => SessionModel)
], UserModel.prototype, "sessions", 2);
__decorateClass([
  (0, import_sequelize_typescript4.HasMany)(() => RecoveryModel)
], UserModel.prototype, "recovery", 2);
UserModel = __decorateClass([
  import_sequelize_typescript4.Table
], UserModel);

// src/infra/database/database.ts
var sequelize = new import_sequelize_typescript5.Sequelize({
  username: "wgtuogyq",
  password: "TGRx5Pit-pnA2dOA9SmDzYcdBIeabR1u",
  database: "wgtuogyq",
  host: "bubble.db.elephantsql.com",
  dialect: "postgres",
  logging: false
});
sequelize.addModels([
  UserModel,
  EmailVerificationModel,
  RecoveryModel,
  SessionModel
]);

// src/infra/database/Transaction.ts
var Transaction = class {
  constructor() {
    this.transactions = {};
  }
  async run(cb) {
    const t = await sequelize.transaction();
    const tid = (0, import_crypto.randomUUID)();
    this.transactions[tid] = t;
    try {
      await cb(tid);
      await t.commit();
      delete this.transactions[tid];
    } catch (e) {
      delete this.transactions[tid];
      await t.rollback();
      throw e;
    }
  }
  getOne(tid) {
    return this.transactions[tid];
  }
};

// src/infra/database/repositories/EmailVerificationRepository.ts
var EmailVerificationRepository = class {
  constructor(parameterConverter2, transaction2) {
    this.transaction = transaction2;
    this.repository = EmailVerificationModel;
    this.parameterConverter = parameterConverter2;
  }
  async updateOne(params, data, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.update(
      {
        ...data
      },
      {
        ...this.parameterConverter.convert(params),
        transaction: transaction2,
        limit: 1
      }
    );
  }
  async save(emailVerification, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.create({ ...emailVerification }, { transaction: transaction2 });
  }
  async findOne(params, tid) {
    return await this.repository.findOne({
      ...this.parameterConverter.convert(params)
    });
  }
  async deleteOne(params, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.destroy({
      ...this.parameterConverter.convert(params),
      transaction: transaction2
    });
  }
  async deleteMany(params, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.destroy({
      ...this.parameterConverter.convert(params),
      transaction: transaction2
    });
  }
};

// src/infra/database/repositories/RecoveryRepository.ts
var RecoveryRepository = class {
  constructor(parameterConverter2, transaction2) {
    this.parameterConverter = parameterConverter2;
    this.transaction = transaction2;
    this.repository = RecoveryModel;
  }
  async updateOne(params, data, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.update(
      {
        ...data
      },
      {
        ...this.parameterConverter.convert(params),
        transaction: transaction2,
        limit: 1
      }
    );
  }
  async save(recovery, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.create(
      {
        ...recovery
      },
      { transaction: transaction2 }
    );
  }
  async findOne(params, tid) {
    return await this.repository.findOne({
      ...this.parameterConverter.convert(params)
    });
  }
  async deleteOne(params, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.destroy({
      ...this.parameterConverter.convert(params),
      transaction: transaction2
    });
  }
  async deleteMany(params, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.destroy({
      ...this.parameterConverter.convert(params),
      transaction: transaction2
    });
  }
};

// src/infra/database/repositories/SessionRepository.ts
var SessionRepository = class {
  constructor(parameterConverter2, transaction2) {
    this.parameterConverter = parameterConverter2;
    this.transaction = transaction2;
    this.repository = SessionModel;
  }
  async updateOne(params, data, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.update(
      {
        ...data
      },
      {
        ...this.parameterConverter.convert(params),
        transaction: transaction2,
        limit: 1
      }
    );
  }
  async save(session, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.create(
      {
        ...session
      },
      { transaction: transaction2 }
    );
  }
  async findOne(params, tid) {
    return await this.repository.findOne({
      ...this.parameterConverter.convert(params)
    });
  }
  async deleteOne(params, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.destroy({
      ...this.parameterConverter.convert(params),
      transaction: transaction2
    });
  }
  async deleteMany(params, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.destroy({
      ...this.parameterConverter.convert(params),
      transaction: transaction2
    });
  }
};

// src/infra/database/repositories/UserRepository.ts
var UserRepository = class {
  constructor(parameterConverter2, transaction2) {
    this.parameterConverter = parameterConverter2;
    this.transaction = transaction2;
    this.repository = UserModel;
  }
  async updateOne(params, data, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.update(
      {
        ...data
      },
      {
        ...this.parameterConverter.convert(params),
        transaction: transaction2,
        limit: 1
      }
    );
  }
  async findMany(params) {
    return await this.repository.findAll({
      ...this.parameterConverter.convert(params)
    });
  }
  async save(session, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.create(
      {
        ...session
      },
      { transaction: transaction2 }
    );
  }
  async findOne(params, tid) {
    return await this.repository.findOne({
      ...this.parameterConverter.convert(params)
    });
  }
  async deleteOne(params, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.destroy({
      ...this.parameterConverter.convert(params),
      transaction: transaction2
    });
  }
  async deleteMany(params, tid) {
    const transaction2 = this.transaction.getOne(tid);
    await this.repository.destroy({
      ...this.parameterConverter.convert(params),
      transaction: transaction2
    });
  }
};

// src/infra/database/repositories/index.ts
var parameterConverter = new ParameterConverter();
var transaction = new Transaction();
var makeEmailVerificationRepository = () => new EmailVerificationRepository(parameterConverter, transaction);
var makeUserRepository = () => new UserRepository(parameterConverter, transaction);
var makeSessionRepository = () => new SessionRepository(parameterConverter, transaction);
var makeRecoveryRepository = () => new RecoveryRepository(parameterConverter, transaction);

// src/domain/entities/Session.ts
var import_crypto2 = require("crypto");
var Session = class {
  constructor(props) {
    this.id = (0, import_crypto2.randomUUID)();
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

// src/useCases/auth/login/LoginController.ts
var LoginController = class {
  constructor(login) {
    this.login = login;
  }
  async handle(req, res) {
    const { username, password } = req.body;
    const userData = await this.login.auth({
      username,
      password
    });
    res.send(userData);
  }
};

// src/useCases/auth/login/LoginDTO.ts
var import_class_validator2 = require("class-validator");
var LoginDTO = class {
};
__decorateClass([
  (0, import_class_validator2.IsString)(),
  (0, import_class_validator2.Length)(3, 15)
], LoginDTO.prototype, "username", 2);
__decorateClass([
  (0, import_class_validator2.IsString)(),
  (0, import_class_validator2.Length)(8, 20)
], LoginDTO.prototype, "password", 2);

// src/useCases/auth/login/index.ts
(0, import_dotenv2.config)();
var makeLoginController = () => {
  const login = new Login(
    makeUserRepository(),
    makeSessionRepository(),
    new Hasher(),
    new Encrypter(process.env.JWT_SECRET)
  );
  const loginControllerClass = new LoginController(login);
  return loginControllerClass.handle.bind(loginControllerClass);
};

// src/amqp.ts
var import_amqplib = require("amqplib");
var Amqp = class {
  async start() {
    this.connection = await (0, import_amqplib.connect)("amqp://localhost:5672");
  }
};
var amqp = new Amqp();

// src/domain/entities/EmailVerification.ts
var import_crypto3 = require("crypto");
var EmailVerification = class {
  constructor(props) {
    this.id = (0, import_crypto3.randomUUID)();
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
var import_crypto4 = require("crypto");
var User = class {
  constructor(props) {
    this.id = (0, import_crypto4.randomUUID)();
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
  constructor(userRepository, emailVerificationRepository, publisher, secretGenerator, hasher, transaction2) {
    this.userRepository = userRepository;
    this.emailVerificationRepository = emailVerificationRepository;
    this.publisher = publisher;
    this.secretGenerator = secretGenerator;
    this.hasher = hasher;
    this.transaction = transaction2;
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

// src/useCases/auth/signup/SignupController.ts
var SignupController = class {
  constructor(signup) {
    this.signup = signup;
    this.handle = async (req, res) => {
      const { email, fullName, password, username } = req.body;
      await this.signup.execute({ email, fullName, password, username });
      res.status(201).json({ message: "Account created successfully" });
    };
  }
};

// src/useCases/auth/signup/SignupDTO.ts
var import_class_validator3 = require("class-validator");
var SignupDTO = class {
};
__decorateClass([
  (0, import_class_validator3.IsString)(),
  (0, import_class_validator3.Length)(5, 20)
], SignupDTO.prototype, "fullName", 2);
__decorateClass([
  (0, import_class_validator3.IsString)(),
  (0, import_class_validator3.Length)(5, 15)
], SignupDTO.prototype, "username", 2);
__decorateClass([
  (0, import_class_validator3.IsString)(),
  (0, import_class_validator3.IsEmail)()
], SignupDTO.prototype, "email", 2);
__decorateClass([
  (0, import_class_validator3.IsString)(),
  (0, import_class_validator3.Length)(8, 20)
], SignupDTO.prototype, "password", 2);

// src/useCases/auth/signup/index.ts
var makeSignUpController = () => {
  const MailProducer = new Producer("ACCOUNT_CREATED", amqp);
  const secretGenerator = new SecretGenerator({
    length: 150,
    numbers: true,
    uppercase: true,
    symbols: false
  });
  const hasher = new Hasher();
  const singup = new Signup(
    makeUserRepository(),
    makeEmailVerificationRepository(),
    MailProducer,
    secretGenerator,
    hasher,
    transaction
  );
  const signupControllerClass = new SignupController(singup);
  return signupControllerClass.handle.bind(signupControllerClass);
};

// src/useCases/auth/logout/Logout.ts
var Logout = class {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
    this.sessionRepository = sessionRepository;
  }
  async execute(refreshToken) {
    await this.sessionRepository.deleteOne({ select: {}, refreshToken });
  }
};

// src/useCases/auth/logout/LogoutController.ts
var LogoutController = class {
  constructor(logout) {
    this.logout = logout;
    this.logout = logout;
  }
  async handle(req, res) {
    await this.logout.execute(req.body.refreshToken);
    res.status(200).json({ message: "successfully logged-out" });
  }
};

// src/useCases/auth/logout/LogoutDTO.ts
var import_class_validator4 = require("class-validator");
var LogoutDTO = class {
};
__decorateClass([
  (0, import_class_validator4.IsJWT)()
], LogoutDTO.prototype, "refreshToken", 2);

// src/useCases/auth/logout/index.ts
var makeLogoutController = () => {
  const logout = new Logout(makeSessionRepository());
  const logoutControllerClass = new LogoutController(logout);
  return logoutControllerClass.handle.bind(logoutControllerClass);
};

// src/domain/entities/Recovery.ts
var import_crypto5 = require("crypto");
var Recovery = class {
  constructor(props) {
    this.id = (0, import_crypto5.randomUUID)();
    this.userId = props.userId;
    this.secretCode = props.secretCode;
    this.used = false;
    this.createdAt = (/* @__PURE__ */ new Date()).toISOString();
    this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString();
  }
};

// src/useCases/auth/recovery/RecoveryPassword.ts
var RecoveryPassword = class {
  constructor(userRepository, secretGenerator, transaction2, publisher, RecoveryRepository2) {
    this.userRepository = userRepository;
    this.secretGenerator = secretGenerator;
    this.transaction = transaction2;
    this.publisher = publisher;
    this.RecoveryRepository = RecoveryRepository2;
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

// src/useCases/auth/recovery/RecoveryPasswordController.ts
var RecoveryPasswordController = class {
  constructor(RecoveryPassword2) {
    this.RecoveryPassword = RecoveryPassword2;
  }
  async handle(req, res) {
    const { email } = req.body;
    await this.RecoveryPassword.execute({ email });
    res.status(200).json({ message: "Password change request sent successfully" });
  }
};

// src/useCases/auth/recovery/RecoveryPasswordDTO.ts
var import_class_validator5 = require("class-validator");
var RecoveryPasswordDTO = class {
};
__decorateClass([
  (0, import_class_validator5.IsString)()
], RecoveryPasswordDTO.prototype, "email", 2);

// src/useCases/auth/recovery/index.ts
var makeRecoveryPasswordController = () => {
  const MailProducer = new Producer("RECOVERY_PASSWORD", amqp);
  const secretGenerator = new SecretGenerator({
    length: 150,
    numbers: true,
    uppercase: true,
    symbols: false
  });
  const recoverypassword = new RecoveryPassword(
    makeUserRepository(),
    secretGenerator,
    transaction,
    MailProducer,
    makeRecoveryRepository()
  );
  const RecoveryPasswordControllerClass = new RecoveryPasswordController(recoverypassword);
  return RecoveryPasswordControllerClass.handle.bind(RecoveryPasswordControllerClass);
};

// src/useCases/auth/recovery-validation/RecoveryValidation.ts
var RecoveryValidation = class {
  constructor(RecoveryRepository2) {
    this.RecoveryRepository = RecoveryRepository2;
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

// src/useCases/auth/recovery-validation/RecoveryValidationController.ts
var RecoveryValidationController = class {
  constructor(RecoveryValidation2) {
    this.RecoveryValidation = RecoveryValidation2;
  }
  async handle(req, res) {
    const { secretCode } = req.params;
    await this.RecoveryValidation.execute(secretCode);
    res.status(200).json({ message: "Reset code is valid." });
  }
};

// src/useCases/auth/recovery-validation/index.ts
var makeRecoveryValidationController = () => {
  const recoveryValidation = new RecoveryValidation(makeRecoveryRepository());
  const recoveryValidationControllerClass = new RecoveryValidationController(recoveryValidation);
  return recoveryValidationControllerClass.handle.bind(recoveryValidationControllerClass);
};

// src/useCases/auth/recovery-reset/RecoveryReset.ts
var RecoveryReset = class {
  constructor(userRepository, RecoveryRepository2, hasher, transaction2) {
    this.userRepository = userRepository;
    this.RecoveryRepository = RecoveryRepository2;
    this.hasher = hasher;
    this.transaction = transaction2;
  }
  async execute(secretCode, password) {
    const recovery = await this.RecoveryRepository.findOne({
      secretCode,
      select: {
        used: true,
        userId: true
      }
    });
    if (!recovery || recovery.used) {
      throw new Error("Invalid or expired secret code");
    }
    await this.transaction.run(async (tid) => {
      const userId = recovery.userId;
      await this.RecoveryRepository.updateOne(
        {
          select: {},
          userId
        },
        {
          used: false
        },
        tid
      );
      await this.userRepository.updateOne(
        {
          select: {},
          id: userId
        },
        {
          password: this.hasher.hash(password)
        },
        tid
      );
    });
  }
};

// src/useCases/auth/recovery-reset/RecoveryResetController.ts
var RecoveryResetController = class {
  constructor(RecoveryReset2) {
    this.RecoveryReset = RecoveryReset2;
  }
  async handle(req, res) {
    const { secretCode } = req.params;
    const { password } = req.body;
    await this.RecoveryReset.execute(secretCode, password);
    res.status(200).json({ message: "Password reset successfully" });
  }
};

// src/useCases/auth/recovery-reset/RecoveryResetDTO.ts
var import_class_validator6 = require("class-validator");
var RecoveryResetDTO = class {
};
__decorateClass([
  (0, import_class_validator6.IsString)(),
  (0, import_class_validator6.Length)(8, 20)
], RecoveryResetDTO.prototype, "password", 2);

// src/useCases/auth/recovery-reset/index.ts
var makeRecoveryResetController = () => {
  const hasher = new Hasher();
  const recoveryreset = new RecoveryReset(
    makeUserRepository(),
    makeRecoveryRepository(),
    hasher,
    transaction
  );
  const RecoveryResetControllerClass = new RecoveryResetController(recoveryreset);
  return RecoveryResetControllerClass.handle.bind(RecoveryResetControllerClass);
};

// src/routes/auth-routes.ts
var auth_routes_default = (router) => {
  router.post(
    "/auth/login",
    validationMiddleware.handle(LoginDTO),
    makeLoginController()
  );
  router.post(
    "/auth/register",
    validationMiddleware.handle(SignupDTO),
    makeSignUpController()
  );
  router.delete(
    "/auth/logout",
    makeAuthMiddleware(),
    validationMiddleware.handle(LogoutDTO),
    makeLogoutController()
  );
  router.post(
    "/auth/recovery",
    validationMiddleware.handle(RecoveryPasswordDTO),
    makeRecoveryPasswordController()
  );
  router.get(
    "/auth/recovery/:secretCode",
    makeRecoveryValidationController()
  );
  router.post(
    "/auth/recovery/:secretCode",
    makeRecoveryResetController()
  );
};

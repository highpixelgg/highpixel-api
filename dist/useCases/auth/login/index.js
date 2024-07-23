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

// src/useCases/auth/login/index.ts
var login_exports = {};
__export(login_exports, {
  LoginDTO: () => LoginDTO,
  makeLoginController: () => makeLoginController
});
module.exports = __toCommonJS(login_exports);
var import_dotenv2 = require("dotenv");

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

// src/infra/SecretGenerator.ts
var import_generate_password = require("generate-password");

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
var makeUserRepository = () => new UserRepository(parameterConverter, transaction);
var makeSessionRepository = () => new SessionRepository(parameterConverter, transaction);

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
var import_class_validator = require("class-validator");
var LoginDTO = class {
};
__decorateClass([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.Length)(3, 15)
], LoginDTO.prototype, "username", 2);
__decorateClass([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.Length)(8, 20)
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginDTO,
  makeLoginController
});

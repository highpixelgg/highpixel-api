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

// src/routes/user-routes.ts
var user_routes_exports = {};
__export(user_routes_exports, {
  default: () => user_routes_default
});
module.exports = __toCommonJS(user_routes_exports);

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

// src/useCases/user/findByUsername/findByUsernameController.ts
var FindByUsernameController = class {
  constructor(findByUsername) {
    this.findByUsername = findByUsername;
  }
  async handle(req, res) {
    const { username } = req.params;
    const userData = await this.findByUsername.execute({ username });
    res.status(200).json(userData);
  }
};

// src/useCases/user/findByUsername/index.ts
var makeFindByUsernameController = () => {
  const findByUsername = new FindByUsername(makeUserRepository());
  const findByUsernameControllerClass = new FindByUsernameController(findByUsername);
  return findByUsernameControllerClass.handle.bind(findByUsernameControllerClass);
};

// src/useCases/user/findUsers/FindUsers.ts
var FindUsers = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async find(data, page) {
    const limit = 20;
    const offset = limit * page - limit;
    return this.userRepository.findMany({
      fullName: { value: data.name, insensitive: true, similar: true },
      limit: 20,
      offset,
      select: {
        fullName: true,
        id: true,
        username: true
      }
    });
  }
};

// src/useCases/user/findUsers/FindUsersController.ts
var FindUsersController = class {
  constructor(findUsers) {
    this.findUsers = findUsers;
  }
  async handle(req, res) {
    const { name } = req.body;
    const { page } = req.params;
    const users = await this.findUsers.find(
      { name },
      page
    );
    res.json(users);
  }
};

// src/useCases/user/findUsers/FindUsersDTO.ts
var import_class_validator = require("class-validator");
var FindUsersDTO = class {
};
__decorateClass([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.Length)(5, 20)
], FindUsersDTO.prototype, "name", 2);

// src/useCases/user/findUsers/index.ts
var makeFindUsersController = () => {
  const findUsers = new FindUsers(makeUserRepository());
  const findUsersControllerClas = new FindUsersController(findUsers);
  return findUsersControllerClas.handle.bind(findUsersControllerClas);
};

// src/infra/Encrypter.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();

// src/infra/Hasher.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// src/infra/SecretGenerator.ts
var import_generate_password = require("generate-password");

// src/middlewares/Validation.ts
var import_class_validator2 = require("class-validator");
var ValidationMiddleware = class {
  async validator(data) {
    const validationErrors = await (0, import_class_validator2.validate)(data);
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

// src/middlewares/index.ts
var validationMiddleware = new ValidationMiddleware();

// src/routes/user-routes.ts
var user_routes_default = (router) => {
  router.get("/user/:username", makeFindByUsernameController());
  router.get(
    "/users/:page",
    validationMiddleware.handle(FindUsersDTO),
    makeFindUsersController()
  );
};

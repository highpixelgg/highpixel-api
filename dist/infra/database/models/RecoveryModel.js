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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/infra/database/models/RecoveryModel.ts
var RecoveryModel_exports = {};
__export(RecoveryModel_exports, {
  RecoveryModel: () => RecoveryModel
});
module.exports = __toCommonJS(RecoveryModel_exports);
var import_sequelize_typescript4 = require("sequelize-typescript");

// src/infra/database/models/UserModel.ts
var import_sequelize_typescript3 = require("sequelize-typescript");

// src/infra/database/models/EmailVerificationModel.ts
var import_sequelize_typescript = require("sequelize-typescript");
var import_sequelize = require("sequelize");
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
    type: import_sequelize.DataTypes.STRING,
    allowNull: false
  })
], EmailVerificationModel.prototype, "username", 2);
__decorateClass([
  (0, import_sequelize_typescript.Column)({
    type: import_sequelize.DataTypes.STRING,
    allowNull: false
  })
], EmailVerificationModel.prototype, "email", 2);
__decorateClass([
  (0, import_sequelize_typescript.Column)({
    type: import_sequelize.DataTypes.STRING,
    allowNull: false
  })
], EmailVerificationModel.prototype, "secretCode", 2);
__decorateClass([
  (0, import_sequelize_typescript.Column)({
    type: import_sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  })
], EmailVerificationModel.prototype, "used", 2);
__decorateClass([
  import_sequelize_typescript.CreatedAt
], EmailVerificationModel.prototype, "createdAt", 2);
__decorateClass([
  (0, import_sequelize_typescript.Column)({
    type: import_sequelize.DataTypes.DATE,
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
var import_sequelize2 = require("sequelize");
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
    type: import_sequelize2.DataTypes.STRING,
    allowNull: false
  })
], SessionModel.prototype, "username", 2);
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize2.DataTypes.STRING,
    allowNull: false
  })
], SessionModel.prototype, "refreshToken", 2);
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize2.DataTypes.STRING,
    allowNull: false
  })
], SessionModel.prototype, "userAgent", 2);
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize2.DataTypes.STRING,
    allowNull: false
  })
], SessionModel.prototype, "ip", 2);
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize2.DataTypes.BOOLEAN,
    defaultValue: false
  })
], SessionModel.prototype, "blocked", 2);
__decorateClass([
  import_sequelize_typescript2.CreatedAt
], SessionModel.prototype, "createdAt", 2);
__decorateClass([
  (0, import_sequelize_typescript2.Column)({
    type: import_sequelize2.DataTypes.DATE,
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

// src/infra/database/models/UserModel.ts
var UserModel = class extends import_sequelize_typescript3.Model {
};
__decorateClass([
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize_typescript3.DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
], UserModel.prototype, "id", 2);
__decorateClass([
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize_typescript3.DataType.STRING,
    unique: true,
    allowNull: false
  })
], UserModel.prototype, "username", 2);
__decorateClass([
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize_typescript3.DataType.ARRAY(import_sequelize_typescript3.DataType.STRING),
    allowNull: false
  })
], UserModel.prototype, "roles", 2);
__decorateClass([
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize_typescript3.DataType.STRING,
    allowNull: false
  })
], UserModel.prototype, "password", 2);
__decorateClass([
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize_typescript3.DataType.STRING,
    allowNull: false
  })
], UserModel.prototype, "fullName", 2);
__decorateClass([
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize_typescript3.DataType.STRING,
    unique: true,
    allowNull: false
  })
], UserModel.prototype, "email", 2);
__decorateClass([
  (0, import_sequelize_typescript3.Column)({
    type: import_sequelize_typescript3.DataType.BOOLEAN,
    defaultValue: false
  })
], UserModel.prototype, "isVerified", 2);
__decorateClass([
  import_sequelize_typescript3.CreatedAt
], UserModel.prototype, "createdAt", 2);
__decorateClass([
  import_sequelize_typescript3.UpdatedAt
], UserModel.prototype, "updatedAt", 2);
__decorateClass([
  import_sequelize_typescript3.DeletedAt
], UserModel.prototype, "deletedAt", 2);
__decorateClass([
  (0, import_sequelize_typescript3.HasMany)(() => EmailVerificationModel)
], UserModel.prototype, "emailVerification", 2);
__decorateClass([
  (0, import_sequelize_typescript3.HasMany)(() => SessionModel)
], UserModel.prototype, "sessions", 2);
__decorateClass([
  (0, import_sequelize_typescript3.HasMany)(() => RecoveryModel)
], UserModel.prototype, "recovery", 2);
UserModel = __decorateClass([
  import_sequelize_typescript3.Table
], UserModel);

// src/infra/database/models/RecoveryModel.ts
var import_sequelize3 = require("sequelize");
var RecoveryModel = class extends import_sequelize_typescript4.Model {
};
__decorateClass([
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize_typescript4.DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
], RecoveryModel.prototype, "id", 2);
__decorateClass([
  (0, import_sequelize_typescript4.ForeignKey)(() => UserModel),
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize_typescript4.DataType.STRING,
    allowNull: false
  })
], RecoveryModel.prototype, "userId", 2);
__decorateClass([
  (0, import_sequelize_typescript4.BelongsTo)(() => UserModel)
], RecoveryModel.prototype, "user", 2);
__decorateClass([
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize3.DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [150, 150]
    }
  })
], RecoveryModel.prototype, "secretCode", 2);
__decorateClass([
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize3.DataTypes.BOOLEAN,
    allowNull: false
  })
], RecoveryModel.prototype, "used", 2);
__decorateClass([
  import_sequelize_typescript4.CreatedAt
], RecoveryModel.prototype, "createdAt", 2);
__decorateClass([
  (0, import_sequelize_typescript4.Column)({
    type: import_sequelize3.DataTypes.DATE,
    allowNull: false
  })
], RecoveryModel.prototype, "expiresAt", 2);
RecoveryModel = __decorateClass([
  (0, import_sequelize_typescript4.Table)({ tableName: "Recovery" })
], RecoveryModel);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RecoveryModel
});

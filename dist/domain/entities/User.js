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

// src/domain/entities/User.ts
var User_exports = {};
__export(User_exports, {
  User: () => User
});
module.exports = __toCommonJS(User_exports);
var import_crypto = require("crypto");
var User = class {
  constructor(props) {
    this.id = (0, import_crypto.randomUUID)();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  User
});

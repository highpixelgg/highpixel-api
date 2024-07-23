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

// src/domain/entities/EmailVerification.ts
var EmailVerification_exports = {};
__export(EmailVerification_exports, {
  EmailVerification: () => EmailVerification
});
module.exports = __toCommonJS(EmailVerification_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmailVerification
});

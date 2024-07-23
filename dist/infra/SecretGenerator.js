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

// src/infra/SecretGenerator.ts
var SecretGenerator_exports = {};
__export(SecretGenerator_exports, {
  default: () => SecretGenerator
});
module.exports = __toCommonJS(SecretGenerator_exports);
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

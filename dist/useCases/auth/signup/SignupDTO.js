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

// src/useCases/auth/signup/SignupDTO.ts
var SignupDTO_exports = {};
__export(SignupDTO_exports, {
  default: () => SignupDTO
});
module.exports = __toCommonJS(SignupDTO_exports);
var import_class_validator = require("class-validator");
var SignupDTO = class {
};
__decorateClass([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.Length)(5, 20)
], SignupDTO.prototype, "fullName", 2);
__decorateClass([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.Length)(5, 15)
], SignupDTO.prototype, "username", 2);
__decorateClass([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.IsEmail)()
], SignupDTO.prototype, "email", 2);
__decorateClass([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.Length)(8, 20)
], SignupDTO.prototype, "password", 2);

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

// src/useCases/auth/recovery-validation/RecoveryValidationController.ts
var RecoveryValidationController_exports = {};
__export(RecoveryValidationController_exports, {
  default: () => RecoveryValidationController
});
module.exports = __toCommonJS(RecoveryValidationController_exports);
var RecoveryValidationController = class {
  constructor(RecoveryValidation) {
    this.RecoveryValidation = RecoveryValidation;
  }
  async handle(req, res) {
    const { secretCode } = req.params;
    await this.RecoveryValidation.execute(secretCode);
    res.status(200).json({ message: "Reset code is valid." });
  }
};

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

// src/useCases/auth/recovery-reset/RecoveryResetController.ts
var RecoveryResetController_exports = {};
__export(RecoveryResetController_exports, {
  default: () => RecoveryResetController
});
module.exports = __toCommonJS(RecoveryResetController_exports);
var RecoveryResetController = class {
  constructor(RecoveryReset) {
    this.RecoveryReset = RecoveryReset;
  }
  async handle(req, res) {
    const { secretCode } = req.params;
    const { password } = req.body;
    await this.RecoveryReset.execute(secretCode, password);
    res.status(200).json({ message: "Password reset successfully" });
  }
};

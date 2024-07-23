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

// src/useCases/auth/recovery/RecoveryPasswordController.ts
var RecoveryPasswordController_exports = {};
__export(RecoveryPasswordController_exports, {
  default: () => RecoveryPasswordController
});
module.exports = __toCommonJS(RecoveryPasswordController_exports);
var RecoveryPasswordController = class {
  constructor(RecoveryPassword) {
    this.RecoveryPassword = RecoveryPassword;
  }
  async handle(req, res) {
    const { email } = req.body;
    await this.RecoveryPassword.execute({ email });
    res.status(200).json({ message: "Password change request sent successfully" });
  }
};

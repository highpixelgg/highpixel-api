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

// src/useCases/auth/signup/SignupController.ts
var SignupController_exports = {};
__export(SignupController_exports, {
  default: () => SignupController
});
module.exports = __toCommonJS(SignupController_exports);
var SignupController = class {
  constructor(signup) {
    this.signup = signup;
    this.handle = async (req, res) => {
      const { email, fullName, password, username } = req.body;
      await this.signup.execute({ email, fullName, password, username });
      res.status(201).json({ message: "Account created successfully" });
    };
  }
};

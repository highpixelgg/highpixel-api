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

// src/useCases/auth/login/LoginController.ts
var LoginController_exports = {};
__export(LoginController_exports, {
  default: () => LoginController
});
module.exports = __toCommonJS(LoginController_exports);
var LoginController = class {
  constructor(login) {
    this.login = login;
  }
  async handle(req, res) {
    const { username, password } = req.body;
    const userData = await this.login.auth({
      username,
      password
    });
    res.send(userData);
  }
};

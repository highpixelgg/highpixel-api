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

// src/useCases/user/findByUsername/findByUsernameController.ts
var findByUsernameController_exports = {};
__export(findByUsernameController_exports, {
  default: () => FindByUsernameController
});
module.exports = __toCommonJS(findByUsernameController_exports);
var FindByUsernameController = class {
  constructor(findByUsername) {
    this.findByUsername = findByUsername;
  }
  async handle(req, res) {
    const { username } = req.params;
    const userData = await this.findByUsername.execute({ username });
    res.status(200).json(userData);
  }
};

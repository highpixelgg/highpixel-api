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

// src/useCases/user/findUsers/FindUsersController.ts
var FindUsersController_exports = {};
__export(FindUsersController_exports, {
  FindUsersController: () => FindUsersController
});
module.exports = __toCommonJS(FindUsersController_exports);
var FindUsersController = class {
  constructor(findUsers) {
    this.findUsers = findUsers;
  }
  async handle(req, res) {
    const { name } = req.body;
    const { page } = req.params;
    const users = await this.findUsers.find(
      { name },
      page
    );
    res.json(users);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FindUsersController
});

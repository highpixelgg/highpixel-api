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

// src/useCases/user/findUsers/FindUsers.ts
var FindUsers_exports = {};
__export(FindUsers_exports, {
  FindUsers: () => FindUsers
});
module.exports = __toCommonJS(FindUsers_exports);
var FindUsers = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async find(data, page) {
    const limit = 20;
    const offset = limit * page - limit;
    return this.userRepository.findMany({
      fullName: { value: data.name, insensitive: true, similar: true },
      limit: 20,
      offset,
      select: {
        fullName: true,
        id: true,
        username: true
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FindUsers
});

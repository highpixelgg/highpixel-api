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

// src/useCases/auth/recovery-reset/RecoveryReset.ts
var RecoveryReset_exports = {};
__export(RecoveryReset_exports, {
  default: () => RecoveryReset
});
module.exports = __toCommonJS(RecoveryReset_exports);
var RecoveryReset = class {
  constructor(userRepository, RecoveryRepository, hasher, transaction) {
    this.userRepository = userRepository;
    this.RecoveryRepository = RecoveryRepository;
    this.hasher = hasher;
    this.transaction = transaction;
  }
  async execute(secretCode, password) {
    const recovery = await this.RecoveryRepository.findOne({
      secretCode,
      select: {
        used: true,
        userId: true
      }
    });
    if (!recovery || recovery.used) {
      throw new Error("Invalid or expired secret code");
    }
    await this.transaction.run(async (tid) => {
      const userId = recovery.userId;
      await this.RecoveryRepository.updateOne(
        {
          select: {},
          userId
        },
        {
          used: false
        },
        tid
      );
      await this.userRepository.updateOne(
        {
          select: {},
          id: userId
        },
        {
          password: this.hasher.hash(password)
        },
        tid
      );
    });
  }
};

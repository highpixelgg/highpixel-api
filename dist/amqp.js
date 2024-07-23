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

// src/amqp.ts
var amqp_exports = {};
__export(amqp_exports, {
  Amqp: () => Amqp,
  amqp: () => amqp
});
module.exports = __toCommonJS(amqp_exports);
var import_amqplib = require("amqplib");
var Amqp = class {
  async start() {
    this.connection = await (0, import_amqplib.connect)("amqp://localhost:5672");
  }
};
var amqp = new Amqp();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Amqp,
  amqp
});

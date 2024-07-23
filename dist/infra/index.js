var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infra/index.ts
var infra_exports = {};
__export(infra_exports, {
  Encrypter: () => Encrypter,
  Hasher: () => Hasher,
  Producer: () => Producer,
  SecretGenerator: () => SecretGenerator
});
module.exports = __toCommonJS(infra_exports);

// src/infra/Encrypter.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var Encrypter = class {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }
  encrypt(obj) {
    const token = import_jsonwebtoken.default.sign(obj, this.secretKey);
    return token;
  }
  decrypt(token) {
    try {
      const decoded = import_jsonwebtoken.default.verify(token, this.secretKey);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, data: {} };
    }
  }
};

// src/infra/Hasher.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var Hasher = class {
  constructor(saltRounds = 10) {
    this.saltRounds = saltRounds;
  }
  hash(text) {
    return import_bcryptjs.default.hashSync(text, this.saltRounds);
  }
  compare(hash, text) {
    return import_bcryptjs.default.compareSync(text, hash);
  }
};

// src/infra/Producer.ts
var Producer = class {
  constructor(exchange, amqp) {
    this.exchange = exchange;
    this.amqp = amqp;
  }
  async start() {
    if (!this.amqp.connection) {
      await this.amqp.start();
    }
    this.channel = await this.amqp.connection.createConfirmChannel();
    await this.channel.assertExchange(this.exchange, "fanout", {
      durable: true
    });
    return this;
  }
  async publish(data) {
    if (!this.channel) {
      await this.start();
    }
    const message = Buffer.from(JSON.stringify(data));
    this.channel.publish(this.exchange, "", message, { persistent: true });
    await this.channel.waitForConfirms();
  }
};

// src/infra/SecretGenerator.ts
var import_generate_password = require("generate-password");
var SecretGenerator = class {
  constructor(options) {
    this.options = options;
  }
  generate() {
    const { length, numbers, symbols, uppercase } = this.options;
    return (0, import_generate_password.generate)({
      length,
      numbers,
      symbols,
      uppercase
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Encrypter,
  Hasher,
  Producer,
  SecretGenerator
});

"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resizeRoute_1 = __importDefault(require("./resizeRoute"));
const metaDataRoute_1 = __importDefault(require("./metaDataRoute"));
const route = express_1.default.Router();
// resize middleware
route.use("/resize", resizeRoute_1.default);
route.use("/metaData", metaDataRoute_1.default);
exports.default = route;

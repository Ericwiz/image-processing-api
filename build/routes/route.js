"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("./resize"));
const metaData_1 = __importDefault(require("./metaData"));
const route = express_1.default.Router();
// resize middleware
route.use('/resize', resize_1.default);
route.use('/metaData', metaData_1.default);
exports.default = route;

"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable linebreak-style */
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
// import sharp from 'sharp';
const app = (0, express_1.default)();
const port = 5000;
app.use("/image", route_1.default);
app.listen(port, () => console.log(`Server Listening on Port ${port}`));
exports.default = app;

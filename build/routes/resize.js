"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Import the 'sharp' package
const sharp_1 = __importDefault(require("sharp"));
const resize = express_1.default.Router();
resize.get("/", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Get the width, height and name from the query string
    const name = String(req.query.name);
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    try {
      // Use the 'sharp' package to resize the input image
      const resizedImage = yield (0, sharp_1.default)(`./images/${name}`)
        .resize(width, height)
        .toFile(`./images/resized-${name}`);
      console.log(req.url, "\n", req.baseUrl);
      // Send the image to the client/Frontend if resized successfully
      res.contentType("image/jpg").send(resizedImage);
      if (req.baseUrl === "/image/resize") {
        res.send("<h1>Enter an Image to be resized</h1>");
      }
    } catch (error) {
      // return error message to the client if processing failed
      res.json({
        name: "Image-processor-api",
        error: error,
        solution: "Provide an image to be resized",
        example: "/image/resize?name=fjord.jpg&width=1000&height=500",
      });
    }
  })
);
exports.default = resize;

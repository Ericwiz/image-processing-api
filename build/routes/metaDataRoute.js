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
// Import the sharp module
const sharp_1 = __importDefault(require("sharp"));
// Import express
const express_1 = __importDefault(require("express"));
const metaData = express_1.default.Router();
metaData.get("/", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const name = String(req.query.name);
    // Use the sharp module to get image meta data
    try {
      const getMetaData = yield (0, sharp_1.default)(
        `./images/${name}`
      ).metadata();
      res.json({
        imageInfo: {
          format: getMetaData.format,
          channels: getMetaData.channels,
          height: getMetaData.height,
          depth: getMetaData.depth,
          hasProfile: getMetaData.hasProfile,
          hasAlpha: getMetaData.hasAlpha,
        },
      });
    } catch (error) {
      res.json({
        name: "Image-processor-api",
        error: error,
        solution: "Provide an image",
        example: "/image/resize?name=fjord.jpg",
      });
    }
  })
);
exports.default = metaData;

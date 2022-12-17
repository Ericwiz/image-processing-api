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
/* eslint-disable @typescript-eslint/no-inferrable-types */
const sharp_1 = __importDefault(require("sharp"));
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default();
const path_1 = __importDefault(require("path"));
const resizeImage = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Get the width, height and name from the query string
    const name = String(req.query.name);
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    try {
      // use sharp to resize the image
      const image = yield (0, sharp_1.default)(`./images/${name}`)
        .resize(width, height)
        .toFile(`./images/resized-${name}`);
      const returnedImage = `./images/resized-${name}`;
      // get the resized image from the cache
      const resizedImage = `./images/resized-${name}`;
      const cachedImage = cache.get(resizedImage);
      // check if the image is in the cache
      if (cachedImage) {
        // send back the image to the client/frontend
        return res
          .contentType("image/jpg")
          .status(200)
          .sendFile(path_1.default.resolve(resizedImage));
      } else {
        // add the image to the cache
        cache.set(resizedImage, image);
        // Send the image to the client/Frontend if resized successfully
        return res
          .contentType("image/jpg")
          .status(200)
          .sendFile(path_1.default.resolve(returnedImage));
      }
    } catch (error) {
      // check for possible errors
      if (isNaN(width) || isNaN(height)) {
        res.json({
          status: 400,
          message: "Bad request, width and height must be a type of number",
        });
      } else if (name != `./images/${name}`) {
        res.json({
          status: 400,
          message: "Bad request, ensure the image path is correct",
        });
      } else {
        res.json({
          status: 400,
          message:
            "Bad request, ensure the image path is correct and width and height is a type of number",
        });
      }
    }
  });
exports.default = resizeImage;

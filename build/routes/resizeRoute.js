"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-inferrable-types */
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const node_cache_1 = __importDefault(require("node-cache"));
const resize_1 = __importDefault(require("../utilities/resize"));
const sharp_1 = __importDefault(require("sharp"));
const resize = express_1.default.Router();
const cache = new node_cache_1.default();
resize.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the image URL and processing options from the request query
    const name = String(req.query.name);
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const imagePath = `./images/resized-${width}-${height}-${name}`;
    try {
        const processedImage = `./images/resized-${width}-${height}-${name}`;
        const cachedImage = cache.get(processedImage);
        if (cachedImage) {
            // send back the image to the client/frontend
            return res.contentType('image/jpg').sendFile(path_1.default.resolve(processedImage), () => console.log('Image retrieved from the cache'));
        }
        else {
            // Process the image using the imported image processing functions
            const resizeAnImage = yield (0, resize_1.default)(`./images/${name}`, width, height);
            const newlyResizedImage = yield (0, sharp_1.default)(resizeAnImage).toFile(`./images/resized-${width}-${height}-${name}`);
            // add the image to the cache
            cache.set(processedImage, newlyResizedImage);
            // Send the processed image back to the client
            return res.contentType('image/jpg').sendFile(path_1.default.resolve(imagePath), () => console.log('Image processed and saved to the cache'));
        }
    }
    catch (error) {
        // check for possible errors
        if (isNaN(width) || isNaN(height)) {
            res.json({
                status: 400,
                message: 'Bad request, width and height must be a type of number',
            });
        }
        else if (name != `./images/${name}`) {
            res.json({
                status: 400,
                message: 'Bad request, ensure the image path is correct',
            });
        }
        else {
            res.json({
                status: 400,
                message: 'Bad request, ensure the image path is correct and width and height is a type of number',
            });
        }
    }
}));
exports.default = resize;

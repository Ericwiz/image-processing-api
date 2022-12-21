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
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const resize_1 = __importDefault(require("../../utilities/resize"));
const sharp_1 = __importDefault(require("sharp"));
const request = (0, supertest_1.default)(server_1.default);
describe('Should check if all functionalities are working', () => {
    it('Expects /image/resize endPoint to return a statusCode of 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image/resize');
        expect(response.status).toBe(200);
    }));
    it('should resize the image to the specified dimensions', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageUrl = './images/fjord.jpg';
        const width = 200;
        const height = 200;
        const processedImage = yield (0, resize_1.default)(imageUrl, width, height);
        // Use the Sharp library to check the actual dimensions of the processed image
        const imageMetadata = yield (0, sharp_1.default)(processedImage).metadata();
        expect(imageMetadata.width).toEqual(width);
        expect(imageMetadata.height).toEqual(height);
    }));
});

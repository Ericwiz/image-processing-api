import express from 'express';
import resizeImage from '../utilities/resize';

const resize = express.Router();

resize.get('/', resizeImage);

export default resize;

import express from 'express';
import resize from './resize';
import metaData from './metaData';
const route = express.Router();

// resize middleware
route.use('/resize', resize);
route.use('/metaData', metaData);

export default route;
import express from 'express';
import resize from './resizeRoute';
import metaData from './metaDataRoute';
const route = express.Router();

// resize middleware
route.use('/resize', resize);
route.use('/metaData', metaData);

export default route;

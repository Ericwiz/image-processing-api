import express from 'express';
import resize from './resizeRoute';
const route = express.Router();

route.use('/resize', resize);


export default route;

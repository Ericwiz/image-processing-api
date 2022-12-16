/* eslint-disable linebreak-style */
import express from 'express';
import route from './routes/route';
// import sharp from 'sharp';
const app = express();
const port = 5000;

app.use('/image', route);

app.listen(port, () => console.log(`Server Listening on Port ${port}`));

export default app;

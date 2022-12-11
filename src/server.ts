/* eslint-disable linebreak-style */
import express from 'express';
import route from './routes/route';
// import sharp from 'sharp';
const app = express();
const port = 3000;

app.use('/image', route);


app.listen(3000, () => console.log(`Server Listening on Port ${port}`));

export default app;

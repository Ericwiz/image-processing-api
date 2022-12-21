/* eslint-disable @typescript-eslint/no-inferrable-types */
import express from 'express';
import path from 'path';
import nodeCache from 'node-cache';
import resizeImage from '../utilities/resize';
import sharp from 'sharp';

const resize = express.Router();
const cache = new nodeCache();

resize.get('/', async (req, res) => {
  	// Get the image URL and processing options from the request query
	const name:string = String(req.query.name);
	const width:number = Number(req.query.width);
	const height: number = Number(req.query.height);
	const imagePath: string = `./images/resized-${width}-${height}-${name}`;
	try {
		const processedImage:string = `./images/resized-${width}-${height}-${name}`;
		const cachedImage = cache.get(processedImage);
      
		if (cachedImage) {
        			// send back the image to the client/frontend
			return res.contentType('image/jpg').sendFile(path.resolve(processedImage), () => console.log('Image retrieved from the cache'));
		}else {
			// Process the image using the imported image processing functions
			const resizeAnImage = await resizeImage(`./images/${name}`, width, height);
			const newlyResizedImage = await sharp(resizeAnImage as Buffer).toFile(`./images/resized-${width}-${height}-${name}`);
			 // add the image to the cache
			cache.set(processedImage, newlyResizedImage);
			// Send the processed image back to the client
			 return res.contentType('image/jpg').sendFile(path.resolve(imagePath), () => console.log('Image processed and saved to the cache'));
		} 
	} catch (error) {
		// check for possible errors
		if (isNaN(width) || isNaN(height)) {
			res.json({
				status: 400,
				message: 'Bad request, width and height must be a type of number',
			});
		} else if (name != `./images/${name}`) {
			res.json({
				status: 400,
				message: 'Bad request, ensure the image path is correct',
			});
		} else {
			res.json({
				status: 400,
				message:
          'Bad request, ensure the image path is correct and width and height is a type of number',
			});
		}
	}
});
  

export default resize;
  
/* eslint-disable @typescript-eslint/no-inferrable-types */
import sharp from 'sharp';
import nodeCache from 'node-cache';
import  express  from 'express';
const cache = new nodeCache();
import path from 'path';


const resizeImage = (async (req:express.Request, res:express.Response) => {
    
	// Get the width, height and name from the query string
	const name:string =  String(req.query.name);
	const width:number = Number(req.query.width);
	const height:number = Number(req.query.height);

	try {
		// use sharp to resize the image
		const image = await sharp(`./images/${name}`)
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
				.contentType('image/jpg')
				.status(200)
				.sendFile(path.resolve(resizedImage));
		} else {
			// add the image to the cache
			cache.set(resizedImage, image);
			// Send the image to the client/Frontend if resized successfully
			res
				.contentType('image/jpg')
				.status(200)
				.sendFile(path.resolve(returnedImage));
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

export default resizeImage;



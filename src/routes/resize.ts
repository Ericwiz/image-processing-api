import express from 'express';
// Import the 'sharp' package
import sharp from 'sharp';

const resize = express.Router();

resize.get('/', async (req, res) => {
	// Get the width, height and name from the query string 
	const name = String(req.query.name);
	const width = Number(req.query.width);
	const height = Number(req.query.height);
	try {
		// Use the 'sharp' package to resize the input image
		const resizedImage = await sharp(`./images/${name}`)
			.resize(width, height)
			.toFile(`./images/resized-${name}`);
		console.log(req.url, '\n', req.baseUrl);
		// Send the image to the client/Frontend if resized successfully
		res.contentType('image/jpg').send(resizedImage);
		
		if (req.baseUrl === '/image/resize') {
			res.send('<h1>Enter an Image to be resized</h1>');
		}
		
		
	} catch (error) {
		// return error message to the client if processing failed
		res.json({
			name: 'Image-processor-api',
			error: error,
			solution: 'Provide an image to be resized',
			example: '/image/resize?name=fjord.jpg&width=1000&height=500'
		});
	}
});

export default resize ;
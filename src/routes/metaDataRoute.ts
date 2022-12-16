// Import the sharp module
import sharp from 'sharp';

// Import express
import express from 'express';

const metaData = express.Router();

metaData.get('/', async (req, res) => {
	const name = String(req.query.name);
	// Use the sharp module to get image meta data
	try {
		const getMetaData = await sharp(`./images/${name}`).metadata();
		res.json({
			imageInfo: {
				format: getMetaData.format,
				channels: getMetaData.channels,
				height: getMetaData.height,
				depth: getMetaData.depth,
				hasProfile: getMetaData.hasProfile,
				hasAlpha: getMetaData.hasAlpha,
			},
		});
	} catch (error) {
		res.json({
			name: 'Image-processor-api',
			error: error,
			solution: 'Provide an image',
			example: '/image/resize?name=fjord.jpg',
		});
	}
});

export default metaData;

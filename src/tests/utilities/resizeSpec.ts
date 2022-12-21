/* eslint-disable @typescript-eslint/no-inferrable-types */
import app from '../../server';
import supertest from 'supertest';
import resizeImage from '../../utilities/resize';
import sharp from 'sharp';
const request = supertest(app);

describe('Should check if all functionalities are working', () => {
	it('Expects /image/resize endPoint to return a statusCode of 200', async () => {
		const response = await request.get('/image/resize');
		expect(response.status).toBe(200);
	});

	it('should resize the image to the specified dimensions', async () => {
		const imageUrl = './images/fjord.jpg';
		const width = 200;
		const height = 200;
		const processedImage = await resizeImage(imageUrl, width, height);
		// Use the Sharp library to check the actual dimensions of the processed image
		const imageMetadata = await sharp(processedImage as Buffer).metadata();
		expect(imageMetadata.width).toEqual(width);
		expect(imageMetadata.height).toEqual(height);
	  });
});

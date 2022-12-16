/* eslint-disable @typescript-eslint/no-inferrable-types */
import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Should check if endPoint is correct', () => {
	it('Expect /image/resize to return a statusCode of 200', async () => {
		const response = await request.get('/image/resize');
		expect(response.status).toBe(200);
	});
});

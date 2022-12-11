import supertest from 'supertest';
import app from '../../server';


const request = supertest(app);

describe('Should check if endPoint is correct', () => {
	it('Expect /image/metaData to return a statusCode of 200', async() => {
		const response = await request.get('/image/metaData');
		expect(response.status).toBe(200);
	});
});


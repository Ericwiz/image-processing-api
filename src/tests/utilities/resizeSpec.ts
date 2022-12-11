// import resize from '../../../routes/resize';
import app from '../../server';


import supertest from 'supertest';

const request = supertest(app);



describe('Should test the endPoint.', () => {
	it('Expects the API endpoint to be: /image/resize', async () => {
		const response = await request.get('/image/resize');
		expect(response.status).toBe(200);
	});
});


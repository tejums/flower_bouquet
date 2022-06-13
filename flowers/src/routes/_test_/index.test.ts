import request from 'supertest';
import { app } from '../../app';

const createFlower = (name: string) => {
    const color = 'red';
    const qty = 1;
    const price = 10;

   return request(app)
      .post('/api/flowers')
      .set('Cookie', global.signin())
      .send({
        name, color, qty, price
      });
}


it('can fetch a list of flowers', async() => {
    await createFlower('Rose');
    await createFlower('Lilly');
    await createFlower('Jasmine');
    await createFlower('Orchid');

    const response = await request(app)
        .get('/api/flowers')
        .send()
        .expect(200);
    
    expect(response.body.length).toEqual(4);
});
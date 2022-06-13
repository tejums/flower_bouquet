import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 if flower is not found', async() => {
  const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/flowers/${id}`)
        .send({})
        .expect(404);
});

it('returns the flower if the flower is found', async () => {
    const name = 'rose';
    const color = 'red';
    const qty = 1;
    const price = 10;

    const response = await request(app)
      .post('/api/flowers')
      .set('Cookie', global.signin())
      .send({
        name, color, qty, price
      })
      .expect(201);
     

    const flowerResponse = await request(app)
      .get(`/api/flowers/${response.body.id}`)
      .send()
      .expect(200);
  
    expect(flowerResponse.body.name).toEqual(name);
    expect(flowerResponse.body.color).toEqual(color);
  });
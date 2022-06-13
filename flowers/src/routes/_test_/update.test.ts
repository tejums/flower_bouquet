import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

let name = 'rose';
let color = 'red';
let qty = 1;
let price = 10;

it('returns 404 if the id does not exists', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/flowers/${id}`)
        .set("Cookie", global.signin())
        .send({
            name, color, qty, price
          })
        .expect(404);

});

it('returns 401 if the user is not authenticated', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/flowers/${id}`)
        .send({
            name, color, qty, price
          })
        .expect(401);
});

it('returns 401 if the user does not own the flower', async() => {
    const response = await request(app)
    .post('/api/flowers')
    .set('Cookie', global.signin())
    .send({
      name, color, qty, price
    })
    .expect(201);

    
    await request(app)
        .put(`/api/flowers/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            name, color, qty, price
          })
        .expect(401);

});

it('returns 400 if the user provides invalid name, color, qty or price', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    name = "";
    await request(app)
        .put(`/api/flowers/${id}`)
        .set("Cookie", global.signin())
        .send({
            name, color, qty, price
          })
        .expect(400);
    name = "Rose";
    color = "";
    await request(app)
        .put(`/api/flowers/${id}`)
        .set("Cookie", global.signin())
        .send({
            name, color, qty, price
            })
        .expect(400);

    color = "Red";
    qty = -1
    await request(app)
        .put(`/api/flowers/${id}`)
        .set("Cookie", global.signin())
        .send({
            name, color, qty, price
            })
        .expect(400);

    qty = 1
    price = -1
    await request(app)
        .put(`/api/flowers/${id}`)
        .set("Cookie", global.signin())
        .send({
            name, color, qty, price
            })
        .expect(400);
});

it('returns 200 on successfull update', async() => {
    const cookie = global.signin();
    price = 10
    const response = await request(app)
    .post('/api/flowers')
    .set('Cookie', cookie)
    .send({
      name, color, qty, price
    })
    .expect(201);

    name = 'New Rose';
    const updatedResponse = await request(app)
        .put(`/api/flowers/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            name, color, qty, price
          })
        .expect(200);
    
    expect(updatedResponse.body.name).toEqual(name);
});
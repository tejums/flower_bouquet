import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it('returns 404 if the id does not exists', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .delete(`/api/flowers/${id}`)
        .set("Cookie", global.signin())
        .send()
        .expect(404);

});

it('returns 401 if the user is not authenticated', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .delete(`/api/flowers/${id}`)
        .send()
        .expect(401);
});

it('returns 401 if the user does not own the flower', async() => {
    const response = await request(app)
    .post('/api/flowers')
    .set('Cookie', global.signin())
    .send({
        name: 'Rose', color: 'Red', qty: 1, price: 10
    })
    .expect(201);

    
    await request(app)
        .delete(`/api/flowers/${response.body.id}`)
        .set('Cookie', global.signin())
        .send()
        .expect(401);

});

it('returns 200 on successfull deletion', async() => {
    const cookie = global.signin();
    const response = await request(app)
    .post('/api/flowers')
    .set('Cookie', cookie)
    .send({
        name: 'Rose', color: 'Red', qty: 1, price: 10
    })
    .expect(201);

    const deleteResponse = await request(app)
        .delete(`/api/flowers/${response.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);
    
    expect(deleteResponse.body.deleted).toEqual(1);
});
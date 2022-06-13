import request from 'supertest';
import { app } from '../../app'


const routeUrl = '/api/users/signup';
 
it('returns a 400 with an invalid username', async() => {
    await request(app).post(routeUrl)
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async() => {
    await request(app).post(routeUrl)
    .send({
        email: 'test@test.com',
        password: 'p'
    })
    .expect(400);
});

it('returns a 400 with missing username and password', async() => {
    await request(app).post(routeUrl)
    .send({
        email: 'test@test.com',
    })
    .expect(400);

    await request(app).post(routeUrl)
    .send({
        password: 'password',
    })
    .expect(400);
});

it('returns a 400 for duplicate email', async() => {

});

it('returns 201 with successful signup', async() => {
    // await request(app).post(routeUrl)
    // .send({
    //     email: 'test@test.com',
    //     password: 'password'
    // })
    // .expect(201);
    console.log(process.env.JWT_KEY!);
 });

it('sets a cookie after successful signup', async() => {

});

it('create a user in db after successful signup', async() => {

});



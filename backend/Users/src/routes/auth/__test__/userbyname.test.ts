import request from 'supertest';
import { app } from '../../../../../app';


it('successful response valid username', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      username : "test",
      email: 'test@test.com',
      password: 'password',
      age : 14
    })
    .expect(201);

  await request(app)
    .get('/api/users/username')
    .send({
      username: 'test'
    })
    .expect(200);
});
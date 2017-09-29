const assert = require('assert');
const app = require('../../app');
const request = require('supertest');
const User = require('../../src/User');

describe('POST /user', () => {
    it('Create user by post method', async () => {
        const res = await request(app)
            .post('/user').send({ name: 'Pho' });
        assert(res.body.message === 'OK');
        const user = await User.findOne({});
        console.log(user);
        assert.equal(user.name, 'Pho');
    });
});


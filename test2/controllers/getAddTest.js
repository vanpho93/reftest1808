const assert = require('assert');
const app = require('../../app');
const request = require('supertest');

describe('GET /cong', () => {
    it('Can add 5 + 4', async () => {
        const res = await request(app).get('/cong/4/5');
        assert.equal(res.status, 200);
        assert.equal(res.text, '9');
    });

    it('Cannot add a + 4', async () => {
        const res = await request(app).get('/cong/a/4');
        assert.equal(res.status, 404);
        assert.equal(res.text, 'Tham so khong hop le');
    });
});

describe('POST /cong', () => {
    it('Can add 5 + 4', async () => {
        const res = await request(app).post('/cong')
        .type('form').send({ a: 4, b: 5 });
        assert.equal(res.status, 200);
        assert.equal(res.text, '9');
    });
});

const assert = require('assert');
const User = require('../../src/User');

describe('Create User test', () => {
    it('Can create user with full info', async () => {
        const user = new User({
            email: 'pho@gmail.com',
            name: 'Pho',
            password: '123'
        });
        await user.save();
        const user2 = await User.findOne({});
        assert.equal(user2.name, 'Pho');
    });

    it('Cannot create user without email', async () => {
        const user = new User({
            name: 'Pho',
            password: '123'
        });
        user.save()
        .then(() => Promise.reject(new Error('sai')))
        .catch(error => assert.equal('user validation failed', error._message));
    });

    it('Cannot create user empty email', async () => {
        const user = new User({
            email: '',
            name: 'Pho',
            password: '123'
        });
        try {
            await user.save();
            throw new Error('aaa');
        } catch (error) {
            assert(error.message.includes('email'));
        }
    });

    it('Cannot create 2 users with same email', async () => {
        const user1 = new User({
            email: 'aaaa',
            name: 'Pho',
            password: '123'
        });
        const user2 = new User({
            email: 'aaaa',
            name: 'Pho 2',
            password: '123'
        });
        await user1.save();
        await user2.save();
        console.log(await User.find({}));
    });
});

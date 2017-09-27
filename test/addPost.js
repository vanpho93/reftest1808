const assert = require('assert');
const User = require('../src/User');
const Post = require('../src/Post');

describe('Create new post', () => {
    let userId;

    beforeEach('Create new user', async () => {
        const user = new User({ name: 'Teo' });
        userId = user._id;
        await user.save();
    });

    it('Create new post for user', async () => {
        const post = new Post({ title: 'JS', content: 'async await' });
        const user = await User.findById(userId);
        user.posts.push(post);
        await post.save();
        await user.save();
        const user2 = await User.findById(userId).populate('posts');
        console.log(user2);
    });
});

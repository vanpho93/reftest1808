const assert = require('assert');
const User = require('../../src/User');
const Post = require('../../src/Post');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

describe('Create new post', () => {
    let userId;

    beforeEach('Create new user', async () => {
        const user = new User({ name: 'Teo' });
        userId = user._id;
        await user.save();
    });

    it('Create new post for user', async () => {
        const post = new Post({ title: 'JS', content: 'async await' });
        await post.save();
        await User.findByIdAndUpdate(userId, { $push: { posts: post } })
        const user2 = await User.findById(userId).populate('posts');
    });

    it('Create post with addPostById', async () => {
        await User.addPostById(userId, 'JS', 'async await');
        const user2 = await User.findById(userId).populate('posts');
        assert(user2.posts[0].title === 'JS');
    });

    it('Create post with instance method', async () => {
        // const user = User.findById(userId);
        const user = new User({ _id: userId });
        await user.addPost('JS', 'async await');
        const user2 = await User.findById(userId).populate('posts');
        assert(user2.posts[0].title === 'JS');
    });
});

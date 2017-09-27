const assert = require('assert');
const User = require('../src/User');
const Post = require('../src/Post');

describe('Create new post', () => {
    let userId;
    let postId;
    beforeEach('Create new user', async () => {
        const user = new User({ name: 'Teo' });
        userId = user._id;
        const post1 = new Post({ title: 'JS1', content: 'async' });
        const post2 = new Post({ title: 'JS2', content: 'async2' });
        postId = post1._id;
        user.posts.push(post1, post2);
        await post1.save();
        await post2.save();
        await user.save();
    });

    it('beforeEach run correcty', async () => {
        const user = await User.findById(userId).populate('posts');
        assert(user.posts[1].title === 'JS2');
    });

    it('Remove post by id', async () => {
        await Post.findByIdAndRemove(postId);
        const user = await User.findById(userId).populate('posts');
        assert(user.posts.length === 1);
        assert(user.posts[0].title === 'JS2');
    });
});

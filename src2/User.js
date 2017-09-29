const mongoose = require('mongoose');
const Post = require('./Post');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
});

const UserModel = mongoose.model('user', UserSchema);

//static addPostById
UserModel.addPostById = async (userId, title, content) => {
    const post = new Post({ title, content });
    await post.save();
    await User.findByIdAndUpdate(userId, { $push: { posts: post } })
}

// User.prototype.addPost = async function(title, content) {
//     const post = new Post({ title, content });
//     await post.save();
//     await this.update({ $push: { posts: post } })
// }

class User extends UserModel {
    async addPost(title, content) {
        const post = new Post({ title, content });
        await post.save();
        await this.update({ $push: { posts: post } })
    }
}

module.exports = User;

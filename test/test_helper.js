const mongoose = require('mongoose');
const User = require('../src/User');

before('Start database', (done) => {
    mongoose.connect('mongodb://localhost/shop', { useMongoClient: true });
    mongoose.connection.once('open', () => done());
});

beforeEach('Clear database', async () => {
    await mongoose.connection.db.dropDatabase();
    // await User.remove({});
    await User.ensureIndexes({});
});

// User -> Post -> Comment
/*
[{
    name: 'Teo',
    posts: [
        { 
            title: 'abc', 
            content: 'yyy',
            comments: [
                { content: '', userId }
            ]
        }
    ]
}]

[{
    name: 'Teo',
    posts: [id1, id2, ...]
}]

[{
    content: '',
    title: '',
    comments: [id1, id2, ...]
}]

[{
    content: '',
    user: idUser
}]
*/

// 1, 5, 2, 3, 6
// 1, 2, 3, 5, 6
